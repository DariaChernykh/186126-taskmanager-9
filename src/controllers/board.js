import Task from "../components/card";
import TaskEdit from "../components/card-edit";
import BtnLoadMore from "../components/button";

const LIMIT_NUM_OF_CARDS = 8;
const START_NUM_OF_CARDS = 8;

export default class BoardController {
  constructor(container, tasks, taskContainer) {
    this._board = container;
    this._tasksContainer = taskContainer;
    this._tasks = tasks;
  }

  _rendCard(arr) {
    arr.forEach((val) => {
      const taskComponent = new Task(val);
      const editTaskComponent = new TaskEdit(val);

      taskComponent.onEdit(() => {
        editTaskComponent.render();
        this._tasksContainer.replaceChild(editTaskComponent.getElement(), taskComponent.getElement());
        taskComponent.unrender();
      });

      editTaskComponent.onEscape(() => {
        taskComponent.render();
        this._tasksContainer.replaceChild(taskComponent.getElement(), editTaskComponent.getElement());
        editTaskComponent.unrender();
      });

      editTaskComponent.onSubmit(() => {
        taskComponent.render();
        this._tasksContainer.replaceChild(taskComponent.getElement(), editTaskComponent.getElement());
        editTaskComponent.unrender();
      });
      this._tasksContainer.appendChild(taskComponent.render());
    });
  }

  _renderTasks(arrTasks) {
    let iter = START_NUM_OF_CARDS;
    const button = new BtnLoadMore();
    const getLastCards = (arr) => {
      const cards = arr;
      if (arr.length < LIMIT_NUM_OF_CARDS) {
        this._board.removeChild(button.getElement());
        button.unrender();
      }
      iter += LIMIT_NUM_OF_CARDS;
      return cards;
    };

    if (arrTasks.length <= START_NUM_OF_CARDS) {
      this._rendCard(arrTasks);
    } else {
      let arr = arrTasks.slice(0, START_NUM_OF_CARDS);
      this._rendCard(arr);

      this._board.appendChild(button.getElement());
      button.onBtnClick(() => {
        let arrAdd = getLastCards(arrTasks.slice(iter, iter + LIMIT_NUM_OF_CARDS));
        this._rendCard(arrAdd);
      });
    }
  }

  init() {
    this._renderTasks(this._tasks);
  }
}
