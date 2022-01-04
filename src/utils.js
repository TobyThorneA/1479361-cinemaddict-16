import AbstractParentClass from './view/abstract-parent-class-view';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomValue = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const generateRandomStrings = (stringsArray) => {
  const maxSentences = getRandomInteger(1,5);
  const randomSentences = [];
  for(let i = 0; i < maxSentences; i++){
    randomSentences.push(generateRandomValue(stringsArray));
  }
  return randomSentences.join('');
};

export const getFiltersData = (array) => {
  const filtersData = array.reduce((acc, film) => {
    acc.history += film.isHistory? 1 : 0;
    acc.watchList += film.isWatchList? 1 : 0;
    acc.favorites += film.isFavorite? 1 : 0;
    return acc;
  }, {history: 0, watchList: 0, favorites: 0},
  );
  return filtersData;
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractParentClass ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractParentClass ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractParentClass)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
