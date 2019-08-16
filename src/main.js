import {createContainer} from './components/container';
import {getBoardFilter} from './components/board-filters';
import {getBtnMore} from './components/button';
import {getCardEdit} from './components/card-edit';
import {getCardsBoard} from './components/cards-board';
import {generateCardsArray} from './components/cards';
import {generateFiltersArray} from './components/filters';
import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getRandomInt} from './data';
import {generateTasksArray} from './components/tasks';
import {createFiltersContainer} from './components/filters-container';

const MAIN_CONTAINER = document.querySelector(`.main`);
const MENU_CONTAINER = document.querySelector(`.main__control`);

const LIMIT_NUM_OF_CARDS = 8;
const START_NUM_OF_CARDS = 8;

const NUM_CARDS = getRandomInt(10, 25);
const ARR_TASKS = generateTasksArray(NUM_CARDS);
const ARR_CARDS = generateCardsArray(ARR_TASKS.slice(1, ARR_TASKS.length));
const ARR_FILTERS = generateFiltersArray(ARR_TASKS);

const renderComponents = (elem, parent) => parent.insertAdjacentHTML(`beforeend`, elem);
const renderCards = (parent, container) => {
  let iter = START_NUM_OF_CARDS;

  const getLastCards = function (arr) {
    const cards = arr.join(``);
    if (arr.length < LIMIT_NUM_OF_CARDS) {
      document.querySelector(`.load-more`).style.display = `none`;
    }
    iter += LIMIT_NUM_OF_CARDS;
    return cards;
  };

  if (ARR_CARDS.length <= START_NUM_OF_CARDS) {
    renderComponents(ARR_CARDS.join(``), parent);
  } else {
    renderComponents(ARR_CARDS.slice(0, START_NUM_OF_CARDS).join(``), parent);
    renderComponents(getBtnMore(), container);
    const MORE_BUTTON = document.querySelector(`.load-more`);
    MORE_BUTTON.addEventListener(`click`, () => renderComponents(getLastCards(ARR_CARDS.slice(iter, iter + LIMIT_NUM_OF_CARDS)), parent));
  }
};

const renderContent = () => {
  renderComponents(getMenu(), MENU_CONTAINER);
  renderComponents(getSearch(), MAIN_CONTAINER);
  renderComponents(createFiltersContainer(), MAIN_CONTAINER);

  const FILTERS_CONTAINER = document.querySelector(`.main__filter`);

  ARR_FILTERS.forEach(function (filter) {
    renderComponents(filter, FILTERS_CONTAINER);
  });

  generateFiltersArray(ARR_TASKS);
  renderComponents(createContainer(), MAIN_CONTAINER);

  const BOARD_CONTAINER = document.querySelector(`.board`);
  renderComponents(getBoardFilter(), BOARD_CONTAINER);
  renderComponents(getCardsBoard(), BOARD_CONTAINER);

  const BOARD = document.querySelector(`.board__tasks`);
  renderComponents(getCardEdit(ARR_TASKS[0]), BOARD);
  renderCards(BOARD, BOARD_CONTAINER);
};

renderContent();
