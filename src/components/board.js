import AbstractComponent from "./absctract-component";

export default class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
