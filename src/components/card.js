import {getDate} from "../date";
import AbstractComponent from "./abstract-component";

const getHashtags = function (array) {
  if (!array.length) {
    return ``;
  }
  return array.map((tag) => `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${tag}
      </span>
    </span>`).join(``);
};

export default class Card extends AbstractComponent {
  constructor(data) {
    super();
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isArchive = data.isArchive;
    this._isFavorite = data.isFavorite;
    this._description = data.description;
    this._date = getDate(data);
    this._isDate = data.isDate;
    this._tags = data.tags;
    this._isFavorite = data.isFavorite;
    this._onEdit = null;
    this._onEditClick = this._onEditButtonClick.bind(this);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((day) => day === true);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  onEdit(fn) {
    this._onEdit = fn;
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${this._isRepeating() ? `card--repeat` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive  ${this._isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button type="button" class="card__btn ${this._isFavorite ? `card__btn--favorites` : ``} card__btn--disabled">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${this._description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            ${this._isDate ? `<div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${this._date.date}</span>
                  <span class="card__time">${this._date.time}</span>
                </p>
              </div>
            </div>` : ``}

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${getHashtags(this._tags)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
  }

  render() {
    this._element = this.getElement();
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditClick);
  }
}
