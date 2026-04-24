#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sermonsDir = path.join(projectRoot, "src/content/blog/sermons");

const supportedExtensions = new Set([
  ".doc",
  ".docx",
  ".htm",
  ".html",
  ".md",
  ".odt",
  ".rtf",
  ".txt",
]);

const args = parseArgs(process.argv.slice(2));

if (!args.inputDir) {
  printUsage();
  process.exit(1);
}

const inputDir = path.resolve(projectRoot, args.inputDir);

if (!existsSync(inputDir) || !statSync(inputDir).isDirectory()) {
  console.error(`Input directory does not exist: ${inputDir}`);
  process.exit(1);
}

const sermonFiles = loadSermonIndex(sermonsDir);
const sourceFiles = collectSourceFiles(inputDir);

if (sourceFiles.length === 0) {
  console.error(`No supported files found in ${inputDir}`);
  process.exit(1);
}

let updatedCount = 0;
let skippedCount = 0;
let createdCount = 0;
const skipped = [];

for (const sourceFile of sourceFiles) {
  try {
    const target = resolveTargetFile(sourceFile, sermonFiles);
    if (!target) {
      skippedCount += 1;
      skipped.push({
        file: path.relative(projectRoot, sourceFile),
        reason: "Could not match by sermon number or slug",
      });
      continue;
    }

    const importedBody = normalizeImportedBody(readImportedBody(sourceFile));
    if (!importedBody) {
      skippedCount += 1;
      skipped.push({
        file: path.relative(projectRoot, sourceFile),
        reason: "Imported body is empty after normalization",
      });
      continue;
    }

    if (!existsSync(target.path)) {
      if (!args.createMissing) {
        skippedCount += 1;
        skipped.push({
          file: path.relative(projectRoot, sourceFile),
          reason: `Target file missing: ${path.relative(projectRoot, target.path)}`,
        });
        continue;
      }

      const createdContent = buildMissingSermonFile(target, importedBody);
      if (!args.dryRun) {
        mkdirSync(path.dirname(target.path), { recursive: true });
        writeFileSync(target.path, createdContent);
      }
      createdCount += 1;
      continue;
    }

    const currentContent = readFileSync(target.path, "utf8");
    const updatedContent = replaceSermonBody(currentContent, importedBody);

    if (updatedContent === currentContent) {
      skippedCount += 1;
      skipped.push({
        file: path.relative(projectRoot, sourceFile),
        reason: `No changes detected for ${path.relative(projectRoot, target.path)}`,
      });
      continue;
    }

    if (!args.dryRun) {
      writeFileSync(target.path, updatedContent);
    }
    updatedCount += 1;
  } catch (error) {
    skippedCount += 1;
    skipped.push({
      file: path.relative(projectRoot, sourceFile),
      reason: error instanceof Error ? error.message : String(error),
    });
  }
}

console.log(
  [
    `Processed: ${sourceFiles.length}`,
    `Updated: ${updatedCount}`,
    `Created: ${createdCount}`,
    `Skipped: ${skippedCount}`,
    args.dryRun ? "Mode: dry-run" : "Mode: write",
  ].join(" | "),
);

if (skipped.length > 0) {
  console.log("\nSkipped files:");
  for (const item of skipped) {
    console.log(`- ${item.file}: ${item.reason}`);
  }
}

function parseArgs(argv) {
  const parsed = {
    createMissing: false,
    dryRun: false,
    inputDir: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--input-dir") {
      parsed.inputDir = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (arg === "--create-missing") {
      parsed.createMissing = true;
      continue;
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }
  }

  return parsed;
}

function printUsage() {
  console.log(`Usage:
  npm run import:sermons -- --input-dir <dir> [--dry-run] [--create-missing]

Supported source formats:
  .doc, .docx, .odt, .rtf, .html, .htm, .txt, .md

Matching strategy:
  1. Leading sermon number in filename, e.g. "001 Salvation By Faith.docx"
  2. Slug match against files in src/content/blog/sermons
`);
}

function loadSermonIndex(contentDir) {
  const files = readdirSync(contentDir)
    .filter((entry) => entry.endsWith(".md"))
    .sort();

  return files.map((filename) => {
    const fullPath = path.join(contentDir, filename);
    const slug = filename.replace(/\.md$/, "");
    const numberMatch = slug.match(/^(\d{3})-/);
    return {
      filename,
      number: numberMatch?.[1] ?? "",
      path: fullPath,
      slug,
      slugWithoutNumber: slug.replace(/^\d{3}-/, ""),
    };
  });
}

function collectSourceFiles(dir) {
  return readdirSync(dir)
    .map((entry) => path.join(dir, entry))
    .filter((fullPath) => statSync(fullPath).isFile())
    .filter((fullPath) => supportedExtensions.has(path.extname(fullPath).toLowerCase()))
    .sort();
}

function resolveTargetFile(sourceFile, sermonIndex) {
  const baseName = path.basename(sourceFile, path.extname(sourceFile));
  const numberMatch = baseName.match(/^(\d{1,3})(?:[\s._-]|$)/);

  if (numberMatch) {
    const padded = numberMatch[1].padStart(3, "0");
    const numberMatchTarget = sermonIndex.find((entry) => entry.number === padded);
    if (numberMatchTarget) return numberMatchTarget;
  }

  const normalizedSlug = slugify(baseName.replace(/^\d{1,3}(?:[\s._-]|$)/, ""));
  return (
    sermonIndex.find((entry) => entry.slugWithoutNumber === normalizedSlug) ?? null
  );
}

function readImportedBody(sourceFile) {
  const extension = path.extname(sourceFile).toLowerCase();

  if (extension === ".md") {
    return stripFrontmatter(readFileSync(sourceFile, "utf8"));
  }

  if (extension === ".txt") {
    return readFileSync(sourceFile, "utf8");
  }

  if (extension === ".html" || extension === ".htm") {
    return convertHtmlToMarkdown(readFileSync(sourceFile, "utf8"));
  }

  const html = execFileSync(
    "textutil",
    ["-convert", "html", "-stdout", sourceFile],
    { encoding: "utf8" },
  );
  return convertHtmlToMarkdown(html);
}

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n*/, "");
}

function convertHtmlToMarkdown(html) {
  let content = html
    .replace(/\r\n/g, "\n")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "");

  content = content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n\n")
    .replace(/<\/blockquote>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<blockquote[^>]*>/gi, "> ")
    .replace(/<h1[^>]*>/gi, "# ")
    .replace(/<h2[^>]*>/gi, "## ")
    .replace(/<h3[^>]*>/gi, "### ")
    .replace(/<h4[^>]*>/gi, "#### ")
    .replace(/<h5[^>]*>/gi, "##### ")
    .replace(/<h6[^>]*>/gi, "###### ")
    .replace(/<hr[^>]*>/gi, "\n---\n")
    .replace(/<(?:p|div|section|article|main|body|html|ul|ol)[^>]*>/gi, "")
    .replace(/<strong[^>]*>/gi, "**")
    .replace(/<\/strong>/gi, "**")
    .replace(/<b[^>]*>/gi, "**")
    .replace(/<\/b>/gi, "**")
    .replace(/<em[^>]*>/gi, "_")
    .replace(/<\/em>/gi, "_")
    .replace(/<i[^>]*>/gi, "_")
    .replace(/<\/i>/gi, "_");

  content = content.replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
    const cleanLabel = stripRemainingTags(label).trim();
    return cleanLabel ? `[${cleanLabel}](${href})` : href;
  });

  content = stripRemainingTags(content);
  content = decodeHtmlEntities(content);
  content = content
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  return content;
}

function stripRemainingTags(content) {
  return content.replace(/<[^>]+>/g, "");
}

function decodeHtmlEntities(content) {
  return content
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&hellip;/gi, "…");
}

function normalizeImportedBody(content) {
  if (!content) return "";

  const normalized = content
    .replace(/\r\n/g, "\n")
    .replace(/^\uFEFF/, "")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return stripDuplicateTitle(normalized);
}

function stripDuplicateTitle(content) {
  const lines = content.split("\n");
  if (lines[0]?.startsWith("# ")) {
    return lines.slice(1).join("\n").trim();
  }
  return content;
}

function replaceSermonBody(currentContent, importedBody) {
  const marker = /^- Source slug: .+$/m;
  const match = currentContent.match(marker);

  if (match?.index == null) {
    throw new Error("Could not find '- Source slug:' marker in sermon file");
  }

  const markerEnd = match.index + match[0].length;
  const prefix = currentContent.slice(0, markerEnd).trimEnd();
  return `${prefix}\n\n${importedBody}\n`;
}

function buildMissingSermonFile(target, importedBody) {
  const title = target.slugWithoutNumber
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return `---
title: "Проповідь ${Number(target.number)} - ${title}"
description: 'Переклад проповіді "${title}".'
pubDate: ""
author: "Джон Веслі"
tags:
  - "sermon"
  - "john wesley"
---

# Sermon ${Number(target.number)} - ${title}

${importedBody}
`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
