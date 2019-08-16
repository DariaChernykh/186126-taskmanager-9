const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
export const getRandomBoolean = () => Boolean(Math.round(Math.random()));
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const getHashtags = (hashtags) => {
  const num = [...hashtags].length < 3 ? [...hashtags].length : 3;
  return [...hashtags].slice().sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * num));
};

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: new Date(getRandomInt(Date.now() - MS_IN_WEEK, Date.now() + MS_IN_WEEK)),
  repeatingDays: {
    'mo': getRandomBoolean(),
    'tu': getRandomBoolean(),
    'we': getRandomBoolean(),
    'th': getRandomBoolean(),
    'fr': getRandomBoolean(),
    'sa': getRandomBoolean(),
    'su': getRandomBoolean(),
  },
  tags: getHashtags(new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ])),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  colors: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ],
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});
