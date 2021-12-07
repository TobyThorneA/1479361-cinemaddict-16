export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',  // вставить html непосредственно перед elem
  AFTERBEGIN: 'afterbegin',  //вставить html в начало elem
  BEFOREEND: 'beforeend', //вставить html в конец elem
  AFTEREND: 'afterend', // вставить html непосредственно после elem
};


export const renderElement = (container, element, place) => {

  switch (place) {
    case renderPosition.BEFOREBEGIN:
      container.beforeend(element);
      break;
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
    case renderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
