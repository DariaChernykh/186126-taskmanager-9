import TaskList from '../components/task-list';
import Task from "../components/card";
import TaskEdit from "../components/card-edit";
import {getBtnMore} from "../components/button";
import {renderComponents} from '../utils';

export default class BoardController {
  constructor(container, tasks) {
    this._board = container;
    this._tasksContainer = new TaskList();
    this._tasks = tasks;
  }

  rendCard(arr) {
    const parent = document.querySelector(`.board__tasks`);
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

  init() {
    renderComponents(this._tasksContainer.getTemplate(), this._board);

    const LIMIT_NUM_OF_CARDS = 8;
    const START_NUM_OF_CARDS = 8;

    const renderTasks = (arrTasks) => {
      let iter = START_NUM_OF_CARDS;

      const getLastCards = (arr) => {
        const cards = arr;
        if (arr.length < LIMIT_NUM_OF_CARDS) {
          document.querySelector(`.load-more`).style.display = `none`;
        }
        iter += LIMIT_NUM_OF_CARDS;
        return cards;
      };

      if (arrTasks.length <= START_NUM_OF_CARDS) {
        this.rendCard(arrTasks);
      } else {
        let arr = arrTasks.slice(0, START_NUM_OF_CARDS);
        this.rendCard(arr);
        renderComponents(getBtnMore(), this._board);

        const MORE_BUTTON = document.querySelector(`.load-more`);
        MORE_BUTTON.addEventListener(`click`, () => {
          let arrAdd = getLastCards(arrTasks.slice(iter, iter + LIMIT_NUM_OF_CARDS));
          this.rendCard(arrAdd);
        });
      }
    };

    renderTasks(this._tasks);
  }
}
