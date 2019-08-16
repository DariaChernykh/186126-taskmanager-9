import getCard from './card';

export const generateCardsArray = (tasks) => tasks.map((task) => getCard(task));
