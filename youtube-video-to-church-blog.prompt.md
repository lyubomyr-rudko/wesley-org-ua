You are working in my Astro blog repository.

I will provide a new YouTube video URL.

Your task is to create a new Markdown blog post from the video subtitles.

Follow these steps carefully:

1. Update or run the existing Makefile subtitle command for the provided YouTube URL.

Use the existing make target:

make subtitles VIDEO_URL="<YOUTUBE_VIDEO_URL>"

This should download Ukrainian auto-generated subtitles and create a predictable subtitle file named with today’s date, for example:

subtitles-2026-04-26.srt

2. Read the generated subtitles file.

Based on the subtitles, create a Ukrainian Markdown article with these sections:

- YAML frontmatter
- short introduction
- summary of the meeting
- main ideas discussed
- most discussed questions
- more complete text based on the subtitle content
- keywords

The article must be written in Ukrainian.

The summary section should describe:

- the main points of the meeting
- the key ideas shared
- what participants discussed most
- what questions were raised
- the general spiritual or practical emphasis of the meeting

The «more complete text» section should not be a raw subtitle dump. Clean it up into readable Ukrainian prose, while preserving the meaning of the subtitles. Remove subtitle timestamps, numbering, repeated filler words, and obvious transcription noise.

Generate a plan for a sermon based on the subtitle content. The plan should include the main points and subpoints that could be used for a sermon on the topic of the video. Include Bible passages references where appropriate to support the sermon points. The plan should be structured in a clear and logical way, suitable for preaching. Insert it as mindmap data in the Markdown file, under a section titled "План проповіді". The mindmap data should be in a format below

# Про совість

## Головна думка

Совість є внутрішнім свідком, який вказує людині на добро і зло.

## Частина 1

Що таке совість

### Внутрішнє свідчення

### Божий дар людині

## Частина 2

Як совість може бути спотворена

### Невігластво

### Звичка до гріха

### Самовиправдання

## Частина 3

Як очищати совість

### Через Слово Боже

### Через молитву

### Через послух Богові

3. Generate a list of keywords.

The keywords should be relevant for the website and the meeting content. Include topics, biblical themes, names, sermon themes, and church life themes where appropriate.

4. If this is worship service with singing part - generate a list of songs NUMBERS based on the video subtitles and slides list. Create a section in the Markdown file with the title "Слайди пісень" and include an iframe that embeds the slides page with the corresponding song numbers. Also, include a link to open the slides separately.

5. Create a new Markdown file in this folder:

src/content/blog/church-in-lviv/

5. Name the file using the current date in this format:

26-april-2026-worship-service.md

Use the real current date when running the task.

The filename format must be:

DD-month-YYYY-worship-service.md

Examples:

- 26-april-2026-worship-service.md
- 07-may-2026-worship-service.md
- 15-june-2026-worship-service.md

Use lowercase English month names.

6. Use this frontmatter structure:

---

layout: ../../../layouts/BlogPostLayout.astro
title: "..."
description: "..."
pubDate: "YYYY-MM-DD"
tags: [...]
author: "Lyubomyr"

---

Generate a clear Ukrainian title and description based on the video content.

Use the publication date matching the filename date.

7. The Markdown body should be professionally formatted.

Use headings like this:

# Назва зустрічі

## Короткий вступ

## Підсумок зустрічі

## Основні думки

## Питання для обговорення

## Розширений зміст

## План проповіді

## Ключові слова

8. Remove titles of the sections ## Короткий вступ and ## Підсумок зустрічі, replace them with a horizontal rule <hr />. Keep the section content, just remove the section titles.

9. After successfully creating the Markdown file, delete the original subtitles file.

Delete files like:

subtitles-YYYY-MM-DD.srt

Do not delete the generated Markdown blog post.

10. Before finishing, verify that:

- the Markdown file exists in src/content/blog/church-in-lviv/
- the filename uses the correct current date format
- the frontmatter is valid
- the article is written in Ukrainian
- the subtitles file was deleted
- no unrelated files were changed

Return a short summary of what you created, including the path to the new Markdown file.
