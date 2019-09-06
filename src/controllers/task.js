import Task from "../components/card";
import TaskEdit from "../components/card-edit";

export default class TaskController {
  constructor(container, task, onDataChange, onChangeView) {
    this._container = container;
    this._task = task;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskComponent = new Task(this._task);
    this._editTaskComponent = new TaskEdit(this._task, this._container);
    this.rendCard();
  }
  rendCard() {
    const parent = this._container.getElement();
    const taskComponent = this._taskComponent;
    const editTaskComponent = this._editTaskComponent;

    taskComponent.onEdit(() => {
      this._onChangeView();
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
      const formData = new FormData(editTaskComponent.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        colors: editTaskComponent._colors,
        tags: formData.getAll(`hashtag`),
        isDate: !!formData.get(`date`),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        })
      };

      this._onDataChange(entry, this._task);
      editTaskComponent.unbind();
    });

    parent.appendChild(taskComponent.render());
  }

  init() {

  }
}
