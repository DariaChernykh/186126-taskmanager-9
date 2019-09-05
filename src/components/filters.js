import {getFilter} from './filter';

const now = new Date().getDate();
const getAll = (arr) => arr.length;
const getOverdue = (arr) => {
  return arr.filter((value)=>value.dueDate).reduce((acc, value) => {
    if (value.dueDate.getDate() < now) {
      acc++;
    }
    return acc;
  }, 0);
};

const getToday = (arr) => {
  return arr.filter((value)=>value.dueDate).reduce((acc, value) => {
    if (value.dueDate.getDate() === now) {
      acc++;
    }
    return acc;
  }, 0);
};

const getFavorites = (arr) => {
  return arr.reduce((acc, value) => {
    if (value.isFavorite) {
      acc++;
    }
    return acc;
  }, 0);
};

const getRepeating = (arr) => {
  return arr.reduce((acc, value) => {
    let task = value.repeatingDays;
    for (let day in task) {
      if (task[day]) {
        acc++;
        return acc;
      }
    }
    return acc;
  }, 0);
};

const getTags = (arr) => {
  return arr.reduce((acc, value) => {
    if ([...value.tags].length) {
      acc++;
    }
    return acc;
  }, 0);
};

const getArchive = (arr) => {
  return arr.reduce((acc, value) => {
    if (value.isArchive) {
      acc++;
    }
    return acc;
  }, 0);
};

const createFilters = (arr) => {
  return {
    'All': getAll(arr),
    'Overdue': getOverdue(arr),
    'Today': getToday(arr),
    'Favorites': getFavorites(arr),
    'Repeating': getRepeating(arr),
    'Tags': getTags(arr),
    'Archive': getArchive(arr),
  };
};

let arrFilters = [];

const createFiltersComponent = (filters) => {
  for (let filter in filters) {
    arrFilters.push(getFilter(filter, filters[filter]));
  }
};

export const generateFiltersArray = (arr) => {
  createFiltersComponent(createFilters(arr));
  return arrFilters.join(``);
};
