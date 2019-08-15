export const getFilter = (title, count) => `
    <input
      type="radio"
      id="filter__${title.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${title.toLowerCase()}" class="filter__label">
      ${title} <span class="filter__all-count">${count}</span></label
    >`;
