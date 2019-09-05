import BtnLoadMore from "../components/button";
import Sort from "../components/sort";
import TaskList from "../components/task-list";
import TaskController from "./task";

const LIMIT_NUM_OF_CARDS = 8;
const START_NUM_OF_CARDS = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._board = container;
    this._tasksContainer = new TaskList();
    this._tasks = tasks;
    this._sort = new Sort();
    this._button = new BtnLoadMore();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._tasksContainer.getElement().innerHTML = ``;
    this._renderTasks(this._tasks);
  }

  _renderTask(task) {
    return new TaskController(this._tasksContainer, task, this._onDataChange, this._onChangeView);
  }

  _renderTasks(arrTasks) {
    let iter = START_NUM_OF_CARDS;
    const getLastCards = (arr) => {
      const cards = arr;
      if (arr.length < LIMIT_NUM_OF_CARDS) {
        this._board.removeChild(this._button.getElement());
        this._button.unrender();
      }
      iter += LIMIT_NUM_OF_CARDS;
      return cards;
    };

    if (arrTasks.length <= START_NUM_OF_CARDS) {
      arrTasks.forEach((task) => this._renderTask(task));
    } else {
      let arr = arrTasks.slice(0, START_NUM_OF_CARDS);
      arr.forEach((task) => this._renderTask(task));

      this._board.appendChild(this._button.getElement());
      this._button.onBtnClick(() => {
        this._button.render();
        let arrAdd = getLastCards(arrTasks.slice(iter, iter + LIMIT_NUM_OF_CARDS));
        arrAdd.forEach((task) => this._renderTask(task));
      });
    }
  }

  init() {
    this._board.appendChild(this._sort.getElement());
    this._board.appendChild(this._tasksContainer.getElement());
    this._renderTasks(this._tasks);
    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.className !== `board__filter`) {
      return;
    }

    this._tasksContainer.getElement().innerHTML = ``;
    if (!this._button.hidden) {
      this._board.removeChild(this._button.getElement());
      this._button.unrender();
    }

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((task) => this._renderTask(task));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((task) => this._renderTask(task));
        break;
      case `default`:
        this._tasks.forEach((task) => this._renderTask(task));
        break;
    }
  }
}
