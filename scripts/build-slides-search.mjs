import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slidesDir = path.join(rootDir, "slides");
const manifestPath = path.join(slidesDir, "manifest.json");
const outputPath = path.join(slidesDir, "search.json");

const normalizeText = (value) =>
  value
    .normalize("NFKC")
    .toLocaleLowerCase("uk-UA")
    .replace(/[#*_`>()[\]{}.,!?;:"'’‘“”«»—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const uniqueSorted = (values) =>
  [...new Set(values)].sort((left, right) =>
    left.localeCompare(right, "uk-UA", { numeric: true }),
  );

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const songs = {};
const terms = {};

for (const song of manifest) {
  const key = song.filename.replace(/\.md$/, "");
  const markdown = await readFile(path.join(slidesDir, song.filename), "utf8");
  const lines = markdown.trim().split(/\r?\n/);
  const body = lines.slice(1).join("\n").trim();
  const slides = body
    .split(/\n\s*---\s*\n/g)
    .map((slide) => slide.trim())
    .filter(Boolean);
  const searchableText = normalizeText(
    [
      song.id,
      song.title,
      song.displayTitle,
      slides.join("\n"),
    ].join("\n"),
  );

  songs[key] = {
    key,
    id: song.id,
    filename: song.filename,
    title: song.title,
    displayTitle: song.displayTitle,
    text: searchableText,
    slides: slides.map((slide) => ({
      text: slide,
      searchText: normalizeText(slide),
    })),
  };

  for (const term of uniqueSorted(searchableText.split(" "))) {
    if (!term || term.length < 2) continue;
    terms[term] ??= [];
    terms[term].push(song.id);
  }
}

for (const [term, ids] of Object.entries(terms)) {
  terms[term] = uniqueSorted(ids);
}

const searchIndex = {
  songs,
  terms: Object.fromEntries(
    Object.entries(terms).sort(([left], [right]) => left.localeCompare(right, "uk-UA")),
  ),
};

await writeFile(outputPath, `${JSON.stringify(searchIndex, null, 2)}\n`);

console.log(`Built ${path.relative(rootDir, outputPath)} for ${manifest.length} songs.`);
