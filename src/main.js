import {createContainer} from './components/container';
import {getBoardFilter} from './components/board-filters';
import {getBtnMore} from './components/button';
import {getCardEdit} from './components/card-edit';
import {getCardsBoard} from './components/cards-board';
import {getCard} from './components/card';
import {getFilters} from './components/filters';
import {getMenu} from './components/menu';
import {getSearch} from './components/search';

const MAIN_CONTAINER = document.querySelector(`.main`);
const MENU_CONTAINER = document.querySelector(`.main__control`);

const renderComponents = (elem, parent) => parent.insertAdjacentHTML(`beforeend`, elem);

const renderContent = () => {
  renderComponents(getMenu(), MENU_CONTAINER);
  renderComponents(getSearch(), MAIN_CONTAINER);
  renderComponents(getFilters(), MAIN_CONTAINER);
  renderComponents(createContainer(), MAIN_CONTAINER);

  const BOARD_CONTAINER = document.querySelector(`.board`);
  renderComponents(getBoardFilter(), BOARD_CONTAINER);
  renderComponents(getCardsBoard(), BOARD_CONTAINER);
  renderComponents(getBtnMore(), BOARD_CONTAINER);

  const BOARD = document.querySelector(`.board__tasks`);
  renderComponents(getCardEdit(), BOARD);

  const NUM_CARDS = 3;
  for (let i = 0; i < NUM_CARDS; i++) {
    renderComponents(getCard(), BOARD);
  }
};

renderContent();
