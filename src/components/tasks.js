import {getTask} from '../data';

export const generateTasksArray = (numTasks) => {
  const arr = [];
  for (let i = 0; i < numTasks; i++) {
    arr.push(getTask());
  }
  return arr;
};
