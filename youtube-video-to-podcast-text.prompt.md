You are working in my Astro blog repository.

I will provide a new YouTube video URL of our Bible study meeting.

Your task is to create Ukrainian podcast content based on the video subtitles.

The final result should be a Markdown file containing a ready-to-use podcast script.

Follow these steps carefully:

1. Update or run the existing Makefile subtitle command for the provided YouTube URL.

Use the existing make target:

make subtitles VIDEO_URL="<YOUTUBE_VIDEO_URL>"

This should download Ukrainian auto-generated subtitles and create a predictable subtitle file named with date from the video, for example:

subtitles-2026-04-26.srt

2. Read the generated subtitles file.

Use the subtitles as the main source for creating the podcast content.

Do not simply rewrite or dump the subtitles.

Clean and understand the discussion first:

- remove subtitle timestamps
- remove subtitle numbering
- remove repeated filler words
- remove obvious transcription noise
- preserve the real meaning of the meeting
- identify the main Bible passage or passages discussed
- identify the most important spiritual ideas from the discussion
- identify practical applications mentioned or implied in the meeting

3. Create Ukrainian podcast content based on the subtitles.

The podcast should be approximately 5–10 minutes long.

The podcast must be engaging, clear, and interesting to listen to.

Write it in the form of a natural podcast script, using:

- an interesting greeting
- short introduction to the topic
- Bible passage reading
- questions and answers
- light dialogue between a host and a guest or co-host
- clear transitions
- thoughtful spiritual reflection
- practical application for daily life
- short conclusion

The tone should be warm, thoughtful, conversational, and suitable for a Christian podcast.

Do not make the podcast sound like a formal article or sermon manuscript. It should sound natural when read aloud.

4. The podcast must contain these required parts:

1. Bible passage reading

Include one main Bible passage that was discussed in the meeting.

If the subtitles mention several Bible passages, choose the most central one.

If the exact passage text is not fully available in the subtitles, include the Bible reference and write a short introduction before the reading.

Use this section title:

## Читання біблійного уривку

2. Two or three specific Bible passage ideas

Based on the subtitles, identify 2–3 main ideas from the Bible passage and the meeting discussion.

Each idea should:

- be connected to the Bible passage
- summarize one important thought from the meeting
- include a short explanation
- include one or two natural questions and answers in podcast style

Use this section title:

## Основні біблійні думки

3. One practical idea for life

Generate one clear practical idea about what we can do in our lives based on the Bible study.

This should not be generic.

It should be connected to the actual discussion in the subtitles.

Use this section title:

## Практичний крок

5. Structure the Markdown body like this:

# Назва подкасту

## Вступ

Write an engaging opening greeting.

Example style:

Вітаємо вас у нашому подкасті. Сьогодні ми повертаємося до розмови, яка прозвучала під час біблійного вивчення, і спробуємо почути, що цей уривок говорить не лише до нашого розуму, але й до нашого щоденного життя.

The introduction should briefly explain:

- what the meeting was about
- what Bible passage or theme was discussed
- why this topic matters today

## Читання біблійного уривку

Include the main Bible passage reference.

If appropriate, include the passage text in Ukrainian.

If the subtitles do not provide the full Bible text, write:

Сьогодні в центрі нашої уваги уривок: [Bible reference].

Then briefly summarize the passage before moving into the discussion.

## Основні біблійні думки

Create 2–3 podcast-style discussion blocks.

Each block should have:

### Думка 1: Назва думки

Host:
Question or transition.

Guest:
Thoughtful answer based on the subtitles.

Host:
Follow-up question.

Guest:
Short explanation and connection to life.

Repeat this format for 2–3 main ideas.

The dialogue should sound natural, but it must not invent personal stories or claims that are not supported by the subtitles.

You may lightly rephrase and organize the content, but do not add unrelated theology or ideas that were not part of the meeting.

## Практичний крок

Give one practical application.

It should answer:

- What can we do this week?
- How can this passage shape our prayer, attitude, obedience, relationships, service, or faith?
- What simple action can a listener take?

Make it concrete and realistic.

## Завершення

Write a short closing reflection.

Include:

- a summary of the main point
- encouragement for the listener
- a short closing line suitable for a podcast

6. Generate a short podcast title and description.

The title and description must be in Ukrainian.

The title should be clear, engaging, and based on the Bible study topic.

The description should briefly explain what the podcast episode is about.

7. Create a new Markdown file in this folder:

src/content/blog/church-in-lviv/

Name the file using the youtube video date in this format:

DD-month-YYYY-podcast.md

Use the real youtube video date when running the task.

The filename format must be:

DD-month-YYYY-podcast.md

Examples:

- 26-april-2026-podcast.md
- 07-may-2026-podcast.md
- 15-june-2026-podcast.md

Use lowercase English month names.

8. Use this frontmatter structure:

---

layout: ../../../layouts/BlogPostLayout.astro
title: "..."
description: "..."
pubDate: "YYYY-MM-DD"
tags: [...]
author: "Lyubomyr"

---

Generate a clear Ukrainian title and description based on the subtitle content.

Use the publication date matching the filename date.

The tags should include:

- "подкаст"
- "біблійне вивчення"
- relevant Bible book names
- biblical themes from the meeting
- church life themes where appropriate

9. The Markdown body should be professionally formatted.

Use headings like this:

# Назва подкасту

## Вступ

## Читання біблійного уривку

## Основні біблійні думки

### Думка 1: ...

### Думка 2: ...

### Думка 3: ...

## Практичний крок

## Завершення

10. Important content rules:

- The podcast must be written in Ukrainian.
- Use only Ukrainian angle quotes «» for quotations.
- Avoid dashes where possible.
- Do not use bold formatting.
- Do not use the phrase «ба більше».
- Use clear, natural Ukrainian.
- Make the podcast sound like spoken audio content, not like a written article.
- Keep the podcast length suitable for 5–10 minutes of reading aloud.
- Do not invent details, names, testimonies, or stories that are not present in the subtitles.
- You may add simple connecting phrases and questions to make the podcast engaging.
- Keep the meaning faithful to the subtitles.

11. After successfully creating the Markdown file, delete the original subtitles file.

Delete files like:

subtitles-YYYY-MM-DD.srt

Do not delete the generated Markdown podcast file.

12. Before finishing, verify that:

- the Markdown file exists in src/content/blog/church-in-lviv/
- the filename uses the correct youtube video date format
- the frontmatter is valid
- the podcast content is written in Ukrainian
- the content is based on the generated subtitles
- the podcast includes a Bible passage reading
- the podcast includes 2–3 Bible passage ideas
- the podcast includes 1 practical life application
- the subtitles file was deleted
- no unrelated files were changed

Return a short summary of what you created, including the path to the new Markdown file.
