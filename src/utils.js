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
  const onPopupClose = () => {
    popupView.element.remove();
    document.body.classList.remove('hide-overflow');
  };

  popupView.element.querySelector('.film-details__close-btn').addEventListener('click', onPopupClose);

  const onPopupCloseKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' ) {
      onPopupClose();
      window.removeEventListener('keydown', onPopupCloseKeydown);
    }
  };

  window.addEventListener('keydown', onPopupCloseKeydown);
};
