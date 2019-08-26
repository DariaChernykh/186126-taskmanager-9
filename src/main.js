import {getBoardFilter} from './components/board-filters';
import Board from './components/board';
import {generateFiltersArray} from './components/filters';
import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getRandomInt} from './data';
import {generateTasksArray} from './components/tasks';
import {createFiltersContainer} from './components/filters-container';
import BoardController from "./controllers/board";
import {renderComponents} from './utils';

const MAIN_CONTAINER = document.querySelector(`.main`);
const MENU_CONTAINER = document.querySelector(`.main__control`);
const NUM_CARDS = getRandomInt(10, 25);
const ARR_TASKS = generateTasksArray(NUM_CARDS);
const ARR_FILTERS = generateFiltersArray(ARR_TASKS);

const renderContent = () => {
  renderComponents(getMenu(), MENU_CONTAINER);
  renderComponents(getSearch(), MAIN_CONTAINER);
  renderComponents(createFiltersContainer(), MAIN_CONTAINER);

  const FILTERS_CONTAINER = document.querySelector(`.main__filter`);
  renderComponents(ARR_FILTERS, FILTERS_CONTAINER);
  generateFiltersArray(ARR_TASKS);

  const boardComponent = new Board();
  renderComponents(boardComponent.getTemplate(), MAIN_CONTAINER);
  const BOARD = document.querySelector(`.board`);
  renderComponents(getBoardFilter(), BOARD);

  const boardController = new BoardController(BOARD, ARR_TASKS);
  boardController.init();
};

renderContent();
