import {getDate} from '../date';
import {createElement} from "../utils";

const getHashtags = (array) => array.map((tag) => `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        ${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`).join(``);

const getColor = (colors, cardColor) => colors.map((color) => `
    <input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="${color}"
      value="${color}"
      ${color === cardColor ? `checked` : ``}
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}"
      >${color}</label
    >`).join(``);

const generateRepeatingDays = function (days) {
  const arr = [];
  for (let day in days) {
    arr.push(`<input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="${`repeat-` + day + `-4`}"
                    name="repeat"
                    value="${day}"
                    ${days[day] === true ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="${`repeat-` + day + `-4`}"
                    >${day}</label
                  >`);
  }
  return arr.join(``);
};

const isRepeating = (repeatingDays) => Object.keys(repeatingDays).some((day) => repeatingDays[day]);

export default class CardEdit {
  constructor(data) {
    this._self = data;
    this._color = data.color;
    this._colors = data.colors;
    this._repeatingDays = data.repeatingDays;
    this._isArchive = data.isArchive;
    this._isFavorite = data.isFavorite;
    this._description = data.description;
    this._tags = data.tags;
    this._isFavorite = data.isFavorite;
    this._element = null;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((day) => day === true);
  }

  get element() {
    return this._element;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _onEscUp(evt) {
    evt.preventDefault();
    if (typeof this._onEscape === `function`) {
      this._onEscape();
    }
  }

  onSubmit(fn) {
    this._onSubmit = fn;
  }

  onEscape(fn) {
    this._onEscape = fn;
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${this._isRepeating() ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive  ${this._isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button
            type="button"
            class="card__btn ${this._isFavorite ? `card__btn--favorites` : ``} card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${this._description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">yes</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${getDate(this._self).date} ${getDate(this._self).time}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeating(this._repeatingDays) ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${generateRepeatingDays(this._repeatingDays)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${getHashtags(this._tags)}
              </div>

              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${getColor(this._colors, this._color)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
  }

  render() {
    this._element = createElement(this.getTemplate());
    this.bind();

    this._element.querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keyup`, this._onEscUp);
      });

    this._element.querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keyup`, this._onEscUp);
      });

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick.bind(this));

    document.addEventListener(`keyup`, this._onEscUp.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    document.addEventListener(`keyup`, this._onEscUp.bind(this));
  }
}
