import {getDate} from "../date";

const getHashtags = (array) => array.map((tag) => `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${tag}
      </span>
    </span>`).join(``);
const isRepeating = (repeatingDays) => Object.keys(repeatingDays).some((day) => repeatingDays[day]);

export default (data) => {
  return `<article class="card card--${data.color} ${isRepeating(data.repeatingDays) ? `card--repeat` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive  ${data.isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button type="button" class="card__btn ${data.isFavorite ? `card__btn--favorites` : ``} card__btn--disabled">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${data.description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${getDate(data).date}</span>
                  <span class="card__time">${getDate(data).time}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${getHashtags(data.tags)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};
