const bookInfo = [
  ["gen", "Буття"],
  ["exod", "Вихід"],
  ["lev", "Левит"],
  ["num", "Числа"],
  ["deut", "Повторення Закону"],
  ["josh", "Ісус Навин"],
  ["judg", "Судді"],
  ["ruth", "Рут"],
  ["1sam", "1 Самуїлова"],
  ["2sam", "2 Самуїлова"],
  ["1kgs", "1 Царів"],
  ["2kgs", "2 Царів"],
  ["1chr", "1 Хронік"],
  ["2chr", "2 Хронік"],
  ["ezra", "Ездра"],
  ["neh", "Неемія"],
  ["esth", "Естер"],
  ["job", "Йов"],
  ["ps", "Псалми"],
  ["prov", "Приповісті"],
  ["eccl", "Екклезіяст"],
  ["song", "Пісня над піснями"],
  ["isa", "Ісая"],
  ["jer", "Єремія"],
  ["lam", "Плач Єремії"],
  ["ezek", "Єзекіїль"],
  ["dan", "Даниїл"],
  ["hos", "Осія"],
  ["joel", "Йоіл"],
  ["amos", "Амос"],
  ["obad", "Овдій"],
  ["jonah", "Йона"],
  ["mic", "Михей"],
  ["nah", "Наум"],
  ["hab", "Авакум"],
  ["zeph", "Софонія"],
  ["hag", "Огій"],
  ["zech", "Захарій"],
  ["mal", "Малахія"],
  ["matt", "Матвій"],
  ["mark", "Євангеліє від Марка"],
  ["luke", "Євангеліє від Луки"],
  ["john", "Євангеліє від Івана"],
  ["acts", "Дії Апостолів"],
  ["rom", "До Римлян"],
  ["1cor", "1 до Коринтян"],
  ["2cor", "2 до Коринтян"],
  ["gal", "До Галатів"],
  ["eph", "До Ефесян"],
  ["phil", "До Филип'ян"],
  ["col", "До Колосян"],
  ["1thess", "1 до Солунян"],
  ["2thess", "2 до Солунян"],
  ["1tim", "1 до Тимофія"],
  ["2tim", "2 до Тимофія"],
  ["titus", "До Тита"],
  ["phlm", "До Филимона"],
  ["heb", "До Євреїв"],
  ["jas", "Якова"],
  ["1pet", "1 Петра"],
  ["2pet", "2 Петра"],
  ["1john", "1 Івана"],
  ["2john", "2 Івана"],
  ["3john", "3 Івана"],
  ["jude", "Юди"],
  ["rev", "Об'явлення"],
];

const citationTitleBySlug = {
  matt: "Від Матвія",
  mark: "Від Марка",
  luke: "Від Луки",
  john: "Від Івана",
  acts: "Дії Апостолів",
  rom: "До Римлян",
  "1cor": "1 до Коринтян",
  "2cor": "2 до Коринтян",
  gal: "До Галатів",
  eph: "До Ефесян",
  phil: "До Филип'ян",
  col: "До Колосян",
  "1thess": "1 до Солунян",
  "2thess": "2 до Солунян",
  "1tim": "1 до Тимофія",
  "2tim": "2 до Тимофія",
  titus: "До Тита",
  phlm: "До Филимона",
  heb: "До Євреїв",
  jas: "Якова",
  "1pet": "1 Петра",
  "2pet": "2 Петра",
  "1john": "1 Івана",
  "2john": "2 Івана",
  "3john": "3 Івана",
  jude: "Юди",
};

const chapters = import.meta.glob("./ubio/*.txt", {
  query: "?raw",
  import: "default",
  eager: true,
});

const booksByNumber = new Map(
  bookInfo.map(([slug, title], index) => [
    index + 1,
    {
      number: index + 1,
      slug,
      title,
    },
  ]),
);

const versePattern = /^(\d+)\s+(.*)$/;

const parseChapter = ([path, rawText]) => {
  const match = path.match(/ubio\.(\d+)\.(\d+)\.txt$/);

  if (!match) {
    return null;
  }

  const bookNumber = Number(match[1]);
  const chapter = Number(match[2]);
  const book = booksByNumber.get(bookNumber);

  if (!book) {
    return null;
  }

  return {
    ...book,
    citationTitle: citationTitleBySlug[book.slug] ?? book.title,
    chapter,
    path: `/bible/${book.slug}/${chapter}/`,
    verses: String(rawText)
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const verseMatch = line.match(versePattern);

        return verseMatch
          ? { number: Number(verseMatch[1]), text: verseMatch[2] }
          : { number: null, text: line };
      }),
  };
};

const allChapters = Object.entries(chapters)
  .map(parseChapter)
  .filter(Boolean)
  .sort((a, b) => a.number - b.number || a.chapter - b.chapter);

export const bibleBooks = bookInfo
  .map(([, title], index) => {
    const number = index + 1;
    const chaptersForBook = allChapters.filter(
      (chapter) => chapter.number === number,
    );

    return {
      ...booksByNumber.get(number),
      title,
      chapters: chaptersForBook.map((chapter) => chapter.chapter),
      chapterCount: chaptersForBook.length,
    };
  })
  .filter((book) => book.chapterCount > 0);

export const bibleChapters = allChapters;

export const getAdjacentBibleChapters = (currentChapter) => {
  const currentIndex = allChapters.findIndex(
    (chapter) =>
      chapter.slug === currentChapter.slug &&
      chapter.chapter === currentChapter.chapter,
  );

  return {
    previousChapter: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
    nextChapter:
      currentIndex >= 0 && currentIndex < allChapters.length - 1
        ? allChapters[currentIndex + 1]
        : null,
  };
};
