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


export const closePopup = (popupView) => {
  const onPopupClose = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' ) {
      popupView.element.remove();
      document.body.classList.remove('hide-overflow');
    }
    window.removeEventListener('keydown', onPopupClose);
  };
  const onPopupCloseButton = () => {
    popupView.element.remove();
    document.body.classList.remove('hide-overflow');
    window.removeEventListener('keydown', onPopupClose);
  };
  popupView.element.querySelector('.film-details__close-btn').addEventListener('click', onPopupCloseButton);

  window.addEventListener('keydown', onPopupClose);
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
