import {getDate} from '../date';
import AbstractComponent from "./abstract-component";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

const getHashtags = function (array) {
  if (!array.length) {
    return ``;
  }
  return array.map((tag) => `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${tag}"
      class="card__hashtag-hidden-input"
    />
    <p class="card__hashtag-name">
      ${tag}
    </p>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`).join(``);
};

const getColor = function (colors, cardColor) {
  if (!colors.length) {
    return ``;
  }
  return colors.map((color) => `<input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${color === cardColor ? `checked` : ``}
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}"
      >${color}</label
    >`).join(``);
};

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


export default class CardEdit extends AbstractComponent {
  constructor(data, container) {
    super();
    this._container = container;
    this._color = data.color;
    this._colors = data.colors;
    this._repeatingDays = data.repeatingDays;
    this._isArchive = data.isArchive;
    this._isFavorite = data.isFavorite;
    this._description = data.description;
    this._dueDate = data.dueDate;
    this._date = getDate(data);
    this._isDate = data.isDate;
    this._tags = data.tags;
    this._isFavorite = data.isFavorite;
    this._element = null;
    this._onEscKeyUp = this._onEscUp.bind(this);
    this._onSubmitClick = this._onSubmitButtonClick.bind(this);

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onDelTag = this._onDelTag.bind(this);
    this._onPickColor = this._onPickColor.bind(this);
    this._onChangeRepeatedDay = this._onChangeRepeatedDay.bind(this);
    this._onAddTag = this._onAddTag.bind(this);

    this._state.isRepeated = this._isRepeated();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _onEscUp(evt) {
    evt.preventDefault();
    if (typeof this._onEscape === `function` && evt.code === `Escape`) {
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
    return `<article class="card card--edit card--${this._color} ${this._state.isRepeated ? `card--repeat` : ``}">
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
                date: <span class="card__date-status">${this._isDate ? `yes` : `no`}</span>
              </button>
              ${this._isDate ? `<fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${this._date ? `${this._date.date} ${this._date.time}` : ``}"
                    />
                  </label>
                </fieldset>` : ``}              
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${this._state.isRepeated ? `` : `disabled`}>
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
    this._element = this.getElement();
    this.bind();

    this._element.querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keyup`, this._onEscKeyUp);
      });

    this._element.querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keyup`, this._onEscKeyUp);
      });

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitClick);


    this._element.querySelector(`.card__hashtag-list`).addEventListener(`click`, this._onDelTag);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`click`, this._onPickColor);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__hashtag-input`).addEventListener(`keydown`, this._onAddTag);
    document.addEventListener(`keyup`, this._onEscKeyUp);

    if (this._element.querySelector(`.card__date`)) {
      flatpickr(this._element.querySelector(`.card__date`), {
        altInput: true,
        allowInput: true,
        enableTime: true,
        altFormat: `d F H:i`,
        defaultDate: this._dueDate ? this._dueDate : false,
      });
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitClick);

    this._element.querySelector(`.card__hashtag-list`).removeEventListener(`click`, this._onDelTag);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`click`, this._onPickColor);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__hashtag-input`).removeEventListener(`keydown`, this._onAddTag);
    document.removeEventListener(`keyup`, this._onEscKeyUp);

  }

  _onChangeDate() {
    this._isDate = !this._isDate;
    if (!this._isDate) {
      this._element.querySelector(`.card__date`).value = ``;
    }
    this._partialUpdate();
  }

  _onPickColor(el) {
    if (el.target.tagName === `LABEL`) {
      this._color = el.target.textContent;
      this._partialUpdate();
    }
  }
  _onChangeRepeatedDay(el) {
    if (el.path[1].classList.contains(`card__repeat-days-inner`)) {
      this._repeatingDays[el.target.textContent] = !this._repeatingDays[el.target.textContent];
      this._state.isRepeated = this._isRepeated();
      if (!this._isRepeated) {
        this._partialUpdate();
      }
    }
  }

  _onAddTag(evt) {
    if (evt.code === `Enter`) {
      if (evt.target.value.trim() === ``) {
        return;
      }
      this._tags.push(evt.target.value);
      this._partialUpdate();
    }
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._partialUpdate();
  }

  _onDelTag(el) {
    if (el.target.classList.contains(`card__hashtag-delete`)) {
      const tag = el.target.parentElement.querySelector(`.card__hashtag-name`).textContent.trim();
      this._tags.splice(this._tags.indexOf(tag), 1);
      this._partialUpdate();
    }
  }

  _partialUpdate() {
    this.unbind();
    const prevElement = this._element;
    this._element = null;
    this._element = this.getElement();
    this._container.getElement().replaceChild(this._element, prevElement);
    prevElement.remove();
    this.bind();
  }
}
