export const getCardEdit = (data) => {
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

  const getColor = (colors) => colors.map((color) => `
    <input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="${color}"
      value="${color}"
      ${color === data.color ? `checked` : ``}
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}"
      >${color}</label
    >`).join(``);

  const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`,
    `September`, `October`, `November`, `December`];
  const date = `${data.dueDate.getDate()} ${MONTHS[data.dueDate.getMonth()]}`;
  const getHours = (hours) => hours > 12 ? hours - 12 : hours;
  const time = `${getHours(data.dueDate.getHours().toLocaleString())}:${data.dueDate.getMinutes().toLocaleString()}`;
  const isRepeating = Object.keys(data.repeatingDays).some((day) => data.repeatingDays[day]);

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

  return `<article class="card card--edit card--${data.color} ${isRepeating ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive  ${data.isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button
            type="button"
            class="card__btn ${data.isFavorite ? `card__btn--favorites` : ``} card__btn--disabled"
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
            >${data.description}</textarea>
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
                    value="${date} ${time}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${generateRepeatingDays(data.repeatingDays)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${getHashtags(data.tags)}
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
              ${getColor(data.colors)}
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
};
