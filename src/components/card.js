export default (data) => {
  const getHashtags = (hashtags) => {
    const num = [...hashtags].length < 3 ? [...hashtags].length : 3;
    const array = [...hashtags].slice().sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * num));

    return array.map((tag) => `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${tag}
      </span>
    </span>`).join(``);
  };
  const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`,
    `September`, `October`, `November`, `December`];
  const date = `${data.dueDate.getDate()} ${MONTHS[data.dueDate.getMonth()]}`;
  const getHours = (hours) => hours > 12 ? hours - 12 : hours;
  const time = `${getHours(data.dueDate.getHours().toLocaleString())}:${data.dueDate.getMinutes().toLocaleString()}`;
  const isRepeating = Object.keys(data.repeatingDays).some((day) => data.repeatingDays[day]);

  return `<article class="card card--${data.color} ${isRepeating ? `card--repeat` : ``}">
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
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
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
