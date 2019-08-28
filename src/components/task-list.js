import AbstractComponent from "./absctract-component";

export default class TaskList extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
