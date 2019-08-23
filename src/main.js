import {createContainer} from './components/container';
import {getBoardFilter} from './components/board-filters';
import {getBtnMore} from './components/button';
import {getCardsBoard} from './components/cards-board';
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
const ARR_FILTERS = generateFiltersArray(ARR_TASKS);

import Task from './components/card';
import TaskEdit from './components/card-edit';

const renderComponents = (elem, parent) => parent.insertAdjacentHTML(`beforeend`, elem);

const renderTasks = (parent, container, arrTasks) => {
  let iter = START_NUM_OF_CARDS;

  const getLastCards = (arr) => {
    const cards = arr;
    if (arr.length < LIMIT_NUM_OF_CARDS) {
      document.querySelector(`.load-more`).style.display = `none`;
    }
    iter += LIMIT_NUM_OF_CARDS;
    return cards;
  };

  const rendCard = (arr) => {
    arr.forEach((val) => {
      const taskComponent = new Task(val);
      const editTaskComponent = new TaskEdit(val);

      taskComponent.onEdit(() => {
        editTaskComponent.render();
        parent.replaceChild(editTaskComponent.element, taskComponent.element);
        taskComponent.unrender();
      });

      editTaskComponent.onSubmit(() => {
        taskComponent.render();
        parent.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();
      });

      parent.appendChild(taskComponent.render());
    });
  };

  if (arrTasks.length <= START_NUM_OF_CARDS) {
    rendCard(arrTasks);
  } else {
    let arr = arrTasks.slice(0, START_NUM_OF_CARDS);
    rendCard(arr);
    renderComponents(getBtnMore(), container);

    const MORE_BUTTON = document.querySelector(`.load-more`);
    MORE_BUTTON.addEventListener(`click`, () => {
      let arrAdd = getLastCards(arrTasks.slice(iter, iter + LIMIT_NUM_OF_CARDS));
      rendCard(arrAdd);
    });
  }
};

const renderContent = () => {
  renderComponents(getMenu(), MENU_CONTAINER);
  renderComponents(getSearch(), MAIN_CONTAINER);
  renderComponents(createFiltersContainer(), MAIN_CONTAINER);

  const FILTERS_CONTAINER = document.querySelector(`.main__filter`);
  renderComponents(ARR_FILTERS, FILTERS_CONTAINER);

  generateFiltersArray(ARR_TASKS);
  renderComponents(createContainer(), MAIN_CONTAINER);

  const BOARD_CONTAINER = document.querySelector(`.board`);
  renderComponents(getBoardFilter(), BOARD_CONTAINER);
  renderComponents(getCardsBoard(), BOARD_CONTAINER);

  const BOARD = document.querySelector(`.board__tasks`);
  renderTasks(BOARD, BOARD_CONTAINER, ARR_TASKS);
};

renderContent();
