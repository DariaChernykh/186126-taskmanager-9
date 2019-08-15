import {getTask} from '../data';
import getCard from './card';

export const generateCardsArray = (numCards) => {
  const arr = [];
  for (let i = 0; i < numCards; i++) {
    arr.push(getCard(getTask()));
  }
  return arr;
};
