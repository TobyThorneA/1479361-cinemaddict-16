import AbstractParrentClass from './view/abstract-parent-class-view';

export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',  // вставить html непосредственно перед elem
  AFTERBEGIN: 'afterbegin',  //вставить html в начало elem
  BEFOREEND: 'beforeend', //вставить html в конец elem
  AFTEREND: 'afterend', // вставить html непосредственно после elem
};


export const renderElement = (container, element, place) => {

  const parent = container instanceof AbstractParrentClass ? container.element : container;
  const child = element instanceof AbstractParrentClass ? element.element : element;

  switch (place) {
    case renderPosition.BEFOREBEGIN:
      parent.beforeend(child);
      break;
    case renderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case renderPosition.BEFOREEND:
      parent.append(child);
      break;
    case renderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};
