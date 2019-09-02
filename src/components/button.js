import AbstractComponent from "./abstract-component";

export default class BtnLoadMore extends AbstractComponent {
  constructor() {
    super();
    this.hidden = true;
    this._onClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onBtnClick === `function`) {
      this._onBtnClick();
    }
  }

  onBtnClick(fn) {
    this.bind();
    this._onBtnClick = fn;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  render() {
    this._hidden = false;
    this.bind();
  }

  unrender() {
    this.unbind();
    this._element = null;
    this._hidden = true;
  }

  bind() {
    this._element.addEventListener(`click`, this._onClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onClick);
  }
}
