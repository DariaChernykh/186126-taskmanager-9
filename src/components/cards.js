import Card from './card';

export const generateCardsArray = (tasks) => tasks.map((task) => {
  const card = new Card(task);
  return card.template;
});
