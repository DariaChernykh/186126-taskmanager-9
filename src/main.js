import {createContainer} from './components/container';
import {getBoardFilter} from './components/board-filters';
import {getBtnMore} from './components/button';
import {getCardEdit} from './components/card-edit';
import {getCardsBoard} from './components/cards-board';
import {generateCardsArray} from './components/cards';
import {getFilter} from './components/filter';
import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getRandomInt, getTask} from './data';
import {createFiltersContainer} from './components/filters-container';

const MAIN_CONTAINER = document.querySelector(`.main`);
const MENU_CONTAINER = document.querySelector(`.main__control`);
const TITLES = new Set([`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`]);
const NUM_CARDS = getRandomInt(25, 30);
const ARR_CARDS = generateCardsArray(NUM_CARDS);
const LIMIT_NUM_OF_CARDS = 8;

const renderComponents = (elem, parent) => parent.insertAdjacentHTML(`beforeend`, elem);
const renderCards = (parent, container) => {
  let iter = 7;

  const getLastCards = function (arr) {
    const cards = arr.join(``);
    if (arr.length < LIMIT_NUM_OF_CARDS) {
      document.querySelector(`.load-more`).style.display = `none`;
    }
    iter = iter + LIMIT_NUM_OF_CARDS;
    return cards;
  };

  if (ARR_CARDS.length <= 7) {
    renderComponents(ARR_CARDS.join(``), parent);
  } else {
    renderComponents(ARR_CARDS.slice(0, 7).join(``), parent);
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
  TITLES.forEach(function (title) {
    renderComponents(getFilter(title, getRandomInt(0, 10)), FILTERS_CONTAINER);
  });

  renderComponents(createContainer(), MAIN_CONTAINER);

  const BOARD_CONTAINER = document.querySelector(`.board`);

  renderComponents(getBoardFilter(), BOARD_CONTAINER);
  renderComponents(getCardsBoard(), BOARD_CONTAINER);

  const BOARD = document.querySelector(`.board__tasks`);
  renderComponents(getCardEdit(getTask()), BOARD);
  renderCards(BOARD, BOARD_CONTAINER);
};

renderContent();
