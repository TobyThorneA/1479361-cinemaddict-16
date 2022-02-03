import abstractParrentView from '../view/abstract-parrent-view.js';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, element, place) => {
  const parent = container instanceof abstractParrentView ? container.element : container;
  const child = element instanceof abstractParrentView ? element.element : element;
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
    default:
      parent.append(child);
  }
};
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof abstractParrentView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }
  const newChild = newElement instanceof abstractParrentView ? newElement.element : newElement;
  const oldChild = oldElement instanceof abstractParrentView ? oldElement.element : oldElement;
  const parent = oldChild.parentElement;
  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }
  parent.replaceChild(newChild, oldChild);
};
export {RenderPosition, render, createElement, remove, replace};
