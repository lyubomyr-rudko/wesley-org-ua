const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const monthMap = {
  "Jan.": "січня",
  "Feb.": "лютого",
  "Mar.": "березня",
  "Apr.": "квітня",
  May: "травня",
  June: "червня",
  July: "липня",
  "Aug.": "серпня",
  "Sept.": "вересня",
  "Oct.": "жовтня",
  "Nov.": "листопада",
  "Dec.": "грудня",
};

const monthRangeMap = {
  "Jan.-Feb.": "січень-лютий",
  "May-June": "травень-червень",
  "Oct.-Nov.": "жовтень-листопад",
  "Nov.-Dec.": "листопад-грудень",
  "July-Aug.": "липень-серпень",
  "Sept.-Oct.": "вересень-жовтень",
};

const translationsTitleMap = {
  "On Mourning For The Dead": "Про Жалобу За Померлими",
  "On Corrupting The Word Of God": "Про Перекручування Слова Божого",
  "The Duty Of Constant Communion": "Обов’язок Постійного Причастя",
  "On Public Diversions": "Про Публічні Розваги",
  "The Circumcision Of The Heart": "Обрізання Серця",
  "On Grieving The Holy Spirit": "Про Засмучення Святого Духа",
  "The Trouble And Rest Of Good Men": "Смуток І Спокій Добрих Людей",
  "On Love": "Про Любов",
  "Salvation By Faith": "Спасіння Вірою",
  "The Spirit Of Bondage And Of Adoption": "Дух Рабства І Усиновлення",
  "Free Grace": "Вільна Благодать",
  "Upon Our Lord's Sermon On The Mount: Discourse One":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Перша",
  "Upon Our Lord's Sermon On The Mount: Discourse Two":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Друга",
  "Upon Our Lord's Sermon On The Mount: Discourse Three":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Третя",
  "The Great Privilege Of Those That Are Born Of God":
    "Великий Привілей Тих, Хто Народжений Від Бога",
  "Justification By Faith": "Виправдання Вірою",
  "Christian Perfection": "Християнська Досконалість",
  "The Means Of Grace": "Засоби Благодаті",
  "Upon Our Lord's Sermon On The Mount: Discourse Four":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Четверта",
  "Upon Our Lord's Sermon On The Mount: Discourse Five":
    "Про Нагірну Проповідь Господа Нашого: Бесіда П’ята",
  "Upon Our Lord's Sermon On The Mount: Discourse Six":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Шоста",
  "The Marks Of The New Birth": "Ознаки Нового Народження",
  "True Christianity": "Справжнє Християнство",
  "The Law Established Through Faith: Discourse One":
    "Закон, Стверджений Вірою: Бесіда Перша",
  "The Almost Christian": "Майже Християнин",
  "The Righteousness Of Faith": "Праведність Віри",
  "Awake, Thou That Sleepest": "Пробудися, Ти, Що Спиш",
  "Upon Our Lord's Sermon On The Mount: Discourse Ten":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Десята",
  "The Way To The Kingdom": "Шлях До Царства",
  "Upon Our Lord's Sermon On The Mount: Discourse Twelve":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Дванадцята",
  "The New Birth": "Нове Народження",
  "The Use Of Money": "Використання Грошей",
  "Scriptural Christianity": "Біблійне Християнство",
  "The First Fruits Of The Spirit": "Перші Плоди Духа",
  "The Witness Of The Spirit: Discourse One": "Свідчення Духа: Бесіда Перша",
  "The Witness Of Our Own Spirit": "Свідчення Нашого Власного Духа",
  "Upon Our Lord's Sermon On The Mount: Discourse Seven":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Сьома",
  "Upon Our Lord's Sermon On The Mount: Discourse Eight":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Восьма",
  "Upon Our Lord's Sermon On The Mount: Discourse Nine":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Дев’ята",
  "Catholic Spirit": "Вселенський Дух",
  "Upon Our Lord's Sermon On The Mount: Discourse Eleven":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Одинадцята",
  "Upon Our Lord's Sermon On The Mount: Discourse Thirteen":
    "Про Нагірну Проповідь Господа Нашого: Бесіда Тринадцята",
  "The Law Established Through Faith: Discourse Two":
    "Закон, Стверджений Вірою: Бесіда Друга",
  "The Original, Nature, Property, And Use Of The Law":
    "Походження, Природа, Властивості Та Застосування Закону",
  "The Nature Of Enthusiasm": "Природа Ентузіазму",
  "A Caution Against Bigotry": "Засторога Проти Фанатизму",
  "Satan's Devices": "Підступи Сатани",
  "The Cause And Cure Of Earthquakes": "Причина Та Засіб Від Землетрусів",
  "The Wilderness State": "Стан Пустелі",
  "The Cure Of Evil-speaking": "Ліки Від Лихослів’я",
  "Heaviness Through Manifold Temptations": "Смуток Через Різноманітні Спокуси",
  "Original Sin": "Первородний Гріх",
  "Self-denial": "Самозречення",
  "The Great Assize": "Великий Суд",
  "The Good Steward": "Добрий Управитель",
  "The Scripture Way Of Salvation": "Біблійний Шлях Спасіння",
  "The Repentance Of Believers": "Покаяння Віруючих",
  "On Zeal": "Про Ревність",
  "The Lord Our Righteousness": "Господь Наша Праведність",
  "The End Of Christ's Coming": "Мета Пришестя Христа",
  "Wandering Thoughts": "Блукаючі Думки",
  "On Perfection": "Про Досконалість",
  "On Patience": "Про Терпіння",
  "On Discoveries Of Faith": "Про Відкриття Віри",
  "On A Single Eye": "Про Просте Око",
  "The Reformation Of Manners": "Реформа Звичаїв",
  "On Sin In Believers": "Про Гріх У Віруючих",
  "On The Death Of The Rev. Mr. George Whitefield":
    "Про Смерть Преподобного Містера Джорджа Вайтфілда",
  "On The Trinity": "Про Трійцю",
  "On Predestination": "Про Передвизначення",
  "The Important Question": "Важливе Питання",
  "National Sins And Miseries": "Національні Гріхи Та Лиха",
  "On Laying The Foundation Of The New Chapel, Near The City-road, London.":
    "Про Закладення Підвалин Нової Каплиці Біля Сіті-Роуд У Лондоні",
  "The Reward Of The Righteous": "Нагорода Праведних",
  "A Call To Backsliders": "Заклик До Відступників",
  "The Late Work Of God In North America":
    "Остання Божа Праця В Північній Америці",
  "On God's Vineyard": "Про Божий Виноградник",
  "The Case Of Reason Impartially Considered":
    "Випадок Неупередженого Розгляду Розуму",
  "The General Deliverance": "Загальне Визволення",
  "On Redeeming The Time": "Про Викуплення Часу",
  "On The Fall Of Man": "Про Падіння Людини",
  "God's Approbation Of His Works": "Схвалення Богом Своїх Діл",
  "God's Love To Fallen Man": "Божа Любов До Падшої Людини",
  "Of Good Angels": "Про Добрих Ангелів",
  "Of Hell": "Про Пекло",
  "Of Evil Angels": "Про Злих Ангелів",
  "The General Spread Of The Gospel": "Загальне Поширення Євангелії",
  "On Family Religion": "Про Сімейну Релігію",
  "The Mystery Of Iniquity": "Таємниця Беззаконня",
  "On The Education Of Children": "Про Виховання Дітей",
  "On Dissipation": "Про Марнотратство",
  "The Imperfection Of Human Knowledge": "Недосконалість Людського Знання",
  "The Wisdom Of God's Counsel's": "Мудрість Божих Намірів",
  "On Obedience To Parents": "Про Послух Батькам",
  "In What Sense We Are To Leave The World":
    "У Якому Розумінні Ми Маємо Залишити Світ",
  "On Charity": "Про Милосердя",
  "On Obedience To Pastors": "Про Послух Пасторам",
  "An Israelite Indeed": "Справжній Ізраїльтянин",
  "On Working Out Our Own Salvation": "Про Звершення Нашого Власного Спасіння",
  "The New Creation": "Нове Створіння",
  "Of The Church": "Про Церкву",
  "On The Death Of Rev. Mr. John Fletcher":
    "Про Смерть Преподобного Містера Джона Флетчера",
  "On Divine Providence": "Про Боже Провидіння",
  "On Schism": "Про Розкол",
  "On Friendship With The World": "Про Дружбу Зі Світом",
  "On Visiting The Sick": "Про Відвідування Хворих",
  "On Eternity": "Про Вічність",
  "On Temptation": "Про Спокусу",
  "On Dress": "Про Одяг",
  "The More Excellent Way": "Досконаліший Шлях",
  "On Pleasing All Men": "Про Догоджання Всім Людям",
  "Of Former Times": "Про Колишні Часи",
  "What Is Man?": "Що Таке Людина?",
  "The Duty Of Reproving Our Neighbour": "Обов’язок Докоряти Ближньому",
  "The Signs Of The Times": "Ознаки Часів",
  "On Attending The Church Service": "Про Відвідування Церковного Служіння",
  "The Rich Man And Lazarus": "Багатий І Лазар",
  "On Conscience": "Про Совість",
  "On Faith": "Про Віру",
  "On Riches": "Про Багатство",
  "On The Omnipresence Of God": "Про Всеприсутність Бога",
  "The Difference Between Walking By Sight, And Walking By Faith":
    "Різниця Між Ходінням За Видимим І Ходінням За Вірою",
  "The Unity Of The Divine Being": "Єдність Божої Істоти",
  "The Ministerial Office": "Служіння Священнослужителя",
  "Causes Of The Inefficacy Of Christianity": "Причини Безсилля Християнства",
  "On Knowing Christ After The Flesh": "Про Знання Христа За Тілом",
  "Human Life A Dream": "Людське Життя Як Сон",
  "On Worldly Folly": "Про Світське Безумство",
  "On The Wedding Garment": "Про Весільну Одежу",
  "The Deceitfulness Of The Human Heart": "Оманливість Людського Серця",
  "The Heavenly Treasure In Earthen Vessels":
    "Небесний Скарб У Глиняних Посудинах",
  "On Living Without God": "Про Життя Без Бога",
  "On The Danger Of Increasing Riches": "Про Небезпеку Зростання Багатства",
};

const translateTitle = (value) => translationsTitleMap[value] ?? value;

const translateDate = (value) => {
  if (!value) return value;

  const trimmed = value.trim();

  if (/^\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  const rangeMatch = trimmed.match(
    /^(Jan\.-Feb\.|July-Aug\.|May-June|Nov\.-Dec\.|Oct\.-Nov\.|Sept\.-Oct\.)\s+(\d{4})$/,
  );
  if (rangeMatch) {
    return `${monthRangeMap[rangeMatch[1]]} ${rangeMatch[2]}`;
  }

  const dayMatch = trimmed.match(
    /^(Jan\.|Feb\.|Mar\.|Apr\.|May|June|July|Aug\.|Sept\.|Oct\.|Nov\.|Dec\.)\s+(\d+(?:-\d+)?),\s+(\d{4})$/,
  );
  if (dayMatch) {
    return `${dayMatch[2]} ${monthMap[dayMatch[1]]} ${dayMatch[3]}`;
  }

  const monthYearMatch = trimmed.match(
    /^(Jan\.|Feb\.|Mar\.|Apr\.|May|June|July|Aug\.|Sept\.|Oct\.|Nov\.|Dec\.)\s+(\d{4})$/,
  );
  if (monthYearMatch) {
    const nominativeMonthMap = {
      "Jan.": "січень",
      "Feb.": "лютий",
      "Mar.": "березень",
      "Apr.": "квітень",
      May: "травень",
      June: "червень",
      July: "липень",
      "Aug.": "серпень",
      "Sept.": "вересень",
      "Oct.": "жовтень",
      "Nov.": "листопад",
      "Dec.": "грудень",
    };
    return `${nominativeMonthMap[monthYearMatch[1]]} ${monthYearMatch[2]}`;
  }

  return trimmed;
};

const parseSermons = (rows) =>
  rows
    .trim()
    .split("\n")
    .map((row) => {
      const [number, title, smithDate, outlerDate = ""] = row.split("|");
      const slug = `${number.padStart(3, "0")}-${slugify(title)}`;
      return {
        number,
        title: translateTitle(title),
        originalTitle: title,
        smithDate: translateDate(smithDate),
        outlerDate: translateDate(outlerDate),
        slug,
        contentPath: `sermons/${slug}`,
      };
    });

export const sermonSections = [
  {
    decade: "1720",
    sermons: parseSermons(`
135|On Mourning For The Dead|Jan. 11, 1727|Oct. 6, 1727
136|On Corrupting The Word Of God|Oct. 6, 1727|
    `),
  },
  {
    decade: "1730",
    sermons: parseSermons(`
101|The Duty Of Constant Communion|Feb. 19, 1732|1787
140|On Public Diversions|Sept. 3, 1732|
17|The Circumcision Of The Heart|Jan. 1, 1733|1733
138|On Grieving The Holy Spirit|1733|
127|The Trouble And Rest Of Good Men|Sept. 21, 1735|
139|On Love|Feb. 20, 1737|
1|Salvation By Faith|June 7, 1738|June 11, 1738
9|The Spirit Of Bondage And Of Adoption|Apr. 25, 1739|1746
128|Free Grace|Apr. 29, 1739|
21|Upon Our Lord's Sermon On The Mount: Discourse One|July 21, 1739|1748
22|Upon Our Lord's Sermon On The Mount: Discourse Two|July 21, 1739|1748
23|Upon Our Lord's Sermon On The Mount: Discourse Three|July 21, 1739|1748
19|The Great Privilege Of Those That Are Born Of God|Sept. 23, 1739|1748
5|Justification By Faith|Oct. 6, 1739|1746
40|Christian Perfection|Nov. 11, 1739|1741
16|The Means Of Grace|Nov. 15, 1739|1746
    `),
  },
  {
    decade: "1740",
    sermons: parseSermons(`
24|Upon Our Lord's Sermon On The Mount: Discourse Four|Oct. 22-26, 1740|1748
25|Upon Our Lord's Sermon On The Mount: Discourse Five|Oct. 22-26, 1740|1748
26|Upon Our Lord's Sermon On The Mount: Discourse Six|Oct. 22-26, 1740|1748
18|The Marks Of The New Birth|Apr. 3, 1741|1748
134|True Christianity|June 24, 1741|
35|The Law Established Through Faith: Discourse One|June 27, 1741|1750
2|The Almost Christian|July 25, 1741|
6|The Righteousness Of Faith|Oct. 18, 1741|1746
3|Awake, Thou That Sleepest|Apr. 4, 1742|
30|Upon Our Lord's Sermon On The Mount: Discourse Ten|June 2, 1742|1750
7|The Way To The Kingdom|June 6, 1742|1746
32|Upon Our Lord's Sermon On The Mount: Discourse Twelve|Jan. 30, 1743|1750
45|The New Birth|May 29, 1743|1760
50|The Use Of Money|Feb. 17, 1744|1760
4|Scriptural Christianity|Aug. 24, 1744|
8|The First Fruits Of The Spirit|June 25, 1745|1746
10|The Witness Of The Spirit: Discourse One|May-June 1746|1746
12|The Witness Of Our Own Spirit|May-June 1746|1746
27|Upon Our Lord's Sermon On The Mount: Discourse Seven|Nov. 1-16, 1747|1748
28|Upon Our Lord's Sermon On The Mount: Discourse Eight|Nov. 1-16, 1747|1748
29|Upon Our Lord's Sermon On The Mount: Discourse Nine|Nov. 1-16, 1747|1748
39|Catholic Spirit|Sept. 8, 1749|1750
31|Upon Our Lord's Sermon On The Mount: Discourse Eleven|Nov. 1-7, 1749|1750
33|Upon Our Lord's Sermon On The Mount: Discourse Thirteen|Nov. 1-7, 1749|1750
36|The Law Established Through Faith: Discourse Two|Nov. 1-7, 1749|1750
34|The Original, Nature, Property, And Use Of The Law|Nov. 1-7, 1749|1750
37|The Nature Of Enthusiasm|Nov. 1-7, 1749|1750
38|A Caution Against Bigotry|Nov. 1-7, 1749|1750
42|Satan's Devices|Nov. 1-7, 1749|1750
    `),
  },
  {
    decade: "1750",
    sermons: parseSermons(`
129|The Cause And Cure Of Earthquakes|Mar. 9, 1750|
46|The Wilderness State|Mar. 1, 1751|1760
49|The Cure Of Evil-speaking|Feb. 5, 1752|1760
47|Heaviness Through Manifold Temptations|May 5, 1754|1760
44|Original Sin|May 15, 1754|1759
48|Self-denial|Feb. 17, 1755|1760
15|The Great Assize|Mar. 10, 1758|
51|The Good Steward|May 14, 1758|May 14, 1768
43|The Scripture Way Of Salvation|May 22, 1758|1765
14|The Repentance Of Believers|May 26, 1758|Apr. 24, 1767
92|On Zeal|Oct. 1, 1758|May 6, 1781
20|The Lord Our Righteousness|Oct. 22, 1758|Nov. 24, 1765
62|The End Of Christ's Coming|Dec. 9, 1758|
    `),
  },
  {
    decade: "1760",
    sermons: parseSermons(`
41|Wandering Thoughts|Nov. 30, 1760|1762
76|On Perfection|Mar. 29, 1761|Dec. 6, 1784
83|On Patience|July 13, 1761|1784
110|On Discoveries Of Faith|Oct. 27, 1761|June 11, 1788
118|On A Single Eye|Nov. 29, 1761|1789
52|The Reformation Of Manners|Jan. 30, 1763|
13|On Sin In Believers|Mar. 28, 1763|
11|The Witness Of The Spirit: Discourse Two|Apr. 4, 1767|
    `),
  },
  {
    decade: "1770",
    sermons: parseSermons(`
53|On The Death Of The Rev. Mr. George Whitefield|Nov. 11, 1770|
55|On The Trinity|June 5, 1773|May 7, 1775
58|On Predestination|May 7, 1775|
84|The Important Question|Sept. 11, 1775|
130|National Sins And Miseries|Nov. 7, 1775|
132|On Laying The Foundation Of The New Chapel, Near The City-road, London.|Apr. 21, 1777|
99|The Reward Of The Righteous|Nov. 21, 1777|Nov. 23, 1777
86|A Call To Backsliders|May 20, 1778|1778
131|The Late Work Of God In North America|1778|
107|On God's Vineyard|Dec. 5, 1779|Oct. 17, 1787
    `),
  },
  {
    decade: "1780",
    sermons: parseSermons(`
70|The Case Of Reason Impartially Considered|July 6, 1781|
60|The General Deliverance|Nov. 30, 1781|
93|On Redeeming The Time|Jan. 20, 1782|
57|On The Fall Of Man|Mar. 13, 1782|
56|God's Approbation Of His Works|1782|
59|God's Love To Fallen Man|July 9, 1782|
71|Of Good Angels|Aug. 29, 1782|Jan.-Feb. 1783
73|Of Hell|Oct. 10, 1782|
72|Of Evil Angels|Jan. 7, 1783|
63|The General Spread Of The Gospel|Apr. 22, 1783|
94|On Family Religion|May 26, 1783|1783
61|The Mystery Of Iniquity|1783|May-June 1783
95|On The Education Of Children|July 12, 1783|1783
79|On Dissipation|1783|
69|The Imperfection Of Human Knowledge|Mar. 5, 1784|
68|The Wisdom Of God's Counsel's|Apr. 28, 1784|1784
96|On Obedience To Parents|1784|Oct.-Nov. 1784
81|In What Sense We Are To Leave The World|July 17, 1784|
91|On Charity|Oct. 15, 1784|
97|On Obedience To Pastors|Mar. 18, 1785|1785
90|An Israelite Indeed|1785|July-Aug. 1785
85|On Working Out Our Own Salvation|1785|Sept.-Oct. 1785
64|The New Creation|1785|Nov.-Dec. 1785
74|Of The Church|Sept. 28, 1785|
133|On The Death Of Rev. Mr. John Fletcher|Oct. 24, 1785|
67|On Divine Providence|Mar. 3, 1786|
75|On Schism|Mar. 30, 1786|
80|On Friendship With The World|May 1, 1786|
98|On Visiting The Sick|May 23, 1786|
54|On Eternity|June 28, 1786|
82|On Temptation|Oct. 7, 1786|
88|On Dress|Dec. 30, 1786|
89|The More Excellent Way|1787|
100|On Pleasing All Men|May 22, 1787|
102|Of Former Times|June 27, 1787|
103|What Is Man?|July 23, 1787|
65|The Duty Of Reproving Our Neighbour|July 28, 1787|
66|The Signs Of The Times|Aug. 27, 1777|
104|On Attending The Church Service|Oct. 7, 1787|
112|The Rich Man And Lazarus|Mar. 25, 1788|
105|On Conscience|Apr. 8, 1788|
106|On Faith|Apr. 9, 1788|
108|On Riches|Apr. 22, 1788|
109|What Is Man?|May 2, 1788|
111|On The Omnipresence Of God|Aug. 12, 1788|
113|The Difference Between Walking By Sight, And Walking By Faith|Dec. 30, 1788|
114|The Unity Of The Divine Being|Apr. 9, 1789|
115|The Ministerial Office|May 4, 1789|
116|Causes Of The Inefficacy Of Christianity|July 2, 1789|
117|On Knowing Christ After The Flesh|Aug. 15, 1789|
    `),
  },
  {
    decade: "1790",
    sermons: parseSermons(`
121|Human Life A Dream|1790|Aug. 1789
119|On Worldly Folly|Feb. 19, 1790|
120|On The Wedding Garment|Mar. 26, 1790|
123|The Deceitfulness Of The Human Heart|Apr. 21, 1790|
124|The Heavenly Treasure In Earthen Vessels|June 17, 1790|
125|On Living Without God|July 6, 1790|
126|On The Danger Of Increasing Riches|Sept. 21, 1790|
122|On Faith|Jan. 17, 1791|
    `),
  },
];

export const allSermons = sermonSections.flatMap((section) =>
  section.sermons.map((sermon) => ({
    ...sermon,
    decade: section.decade,
  })),
);

export const totalSermons = allSermons.length;
