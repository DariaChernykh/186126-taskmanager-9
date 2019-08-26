export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderComponents = (elem, parent) => parent.insertAdjacentHTML(`beforeend`, elem);
