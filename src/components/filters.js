import {getFilter} from './filter';
const TITLES = new Set([`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`]);

export const generateFiltersArray = (arr) => {
  return [...TITLES].map((title) => {
    let num = 0;
    switch (title) {
      case `All`:
        num = arr.length;
        break;
      case `Overdue`:
        arr.forEach((value) => value.dueDate.getDay() < new Date(Date.now()).getDay() ? num++ : 0);
        break;
      case `Today`:
        arr.forEach((value) => value.dueDate.getDay() === new Date(Date.now()).getDay() ? num++ : 0);
        break;
      case `Favorites`:
        arr.forEach((value) => value.isFavorite ? num++ : 0);
        break;
      case `Repeating`:
        arr.map(function (value) {

          let task = value.repeatingDays;
          for (let day in task) {
            if (task[day]) {
              return num++;
            }
          }
          return num;
        });
        break;
      case `Tags`:
        arr.forEach((value) => [...value.tags].length ? num++ : 0);
        break;
      case `Archive`:
        arr.forEach((value) => value.isArchive ? num++ : 0);
        break;
    }
    return getFilter(title, num);
  });
};
