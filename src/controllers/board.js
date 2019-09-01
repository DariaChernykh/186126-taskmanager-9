import Task from "../components/card";
import TaskEdit from "../components/card-edit";
import BtnLoadMore from "../components/button";
import Sort from "../components/sort";
import TaskList from "../components/task-list";

const LIMIT_NUM_OF_CARDS = 8;
const START_NUM_OF_CARDS = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._board = container;
    this._tasksContainer = new TaskList();
    this._tasks = tasks;
    this._sort = new Sort();
    this._button = new BtnLoadMore();
  }

  _rendCard(arr) {
    const parent = this._tasksContainer.getElement();
    arr.forEach((val) => {
      const taskComponent = new Task(val);
      const editTaskComponent = new TaskEdit(val);

      taskComponent.onEdit(() => {
        editTaskComponent.render();
        parent.replaceChild(editTaskComponent.getElement(), taskComponent.getElement());
        taskComponent.unrender();
      });

      editTaskComponent.onEscape(() => {
        taskComponent.render();
        parent.replaceChild(taskComponent.getElement(), editTaskComponent.getElement());
        editTaskComponent.unrender();
      });

      editTaskComponent.onSubmit(() => {
        taskComponent.render();
        parent.replaceChild(taskComponent.getElement(), editTaskComponent.getElement());
        editTaskComponent.unrender();
      });
      parent.appendChild(taskComponent.render());
    });
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
      this._rendCard(arrTasks);
    } else {
      let arr = arrTasks.slice(0, START_NUM_OF_CARDS);
      this._rendCard(arr);

      this._board.appendChild(this._button.getElement());
      this._button.onBtnClick(() => {
        this._button.render();
        let arrAdd = getLastCards(arrTasks.slice(iter, iter + LIMIT_NUM_OF_CARDS));
        this._rendCard(arrAdd);
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

    if (evt.target.tagName !== `A`) {
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
        this._renderTasks(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderTasks(sortedByDateDownTasks);
        break;
      case `default`:
        this._renderTasks(this._tasks);
        break;
    }
  }
}
