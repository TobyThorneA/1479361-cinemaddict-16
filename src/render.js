export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',  // вставить html непосредственно перед elem
  AFTERBEGIN: 'afterbegin',  //вставить html в начало elem
  BEFOREEND: 'beforeend', //вставить html в конец elem
  AFTEREND: 'afterend', // вставить html непосредственно после elem
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

