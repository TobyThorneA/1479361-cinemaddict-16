import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createUserTitleTemplate } from './view/user-title-view.js';
import { createFilmsListTemplate } from './view/films-list-view.js';
import { createButtonTemplate } from './view/button-show-more-view.js';
import { createPopupTemplate } from './view/popup-view.js';
import { createCardList } from './view/film-card-view.js';
import { createCommentsList } from './view/comments-popup-view.js';
import { footerStatisticsTemplate } from './view/footer-statistics-view.js';
import { generateData } from './mock/card-films.js';
import { getRandomInteger } from './utils.js';
import { renderPosition, renderTemplate } from './render.js';

const NUMBER_OF_CARD_DISPLAYS = 22;
const NUMBER_OF_DISPLAYS = 5;

const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');


const data = Array.from({length: NUMBER_OF_CARD_DISPLAYS}, generateData);
const partOfTheData = data.slice(0, 5);
const randomNumberComments = getRandomInteger(1, 5);

renderTemplate(siteMainElement, createSiteMenuTemplate(data[0]), renderPosition.BEFOREEND);
renderTemplate(headerProfileElement, createUserTitleTemplate(data[0]), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsListTemplate(),renderPosition.BEFOREEND);
const filmsListElement = document.querySelector('.films-list__container');
renderTemplate(footerStatisticsElement, footerStatisticsTemplate(data[0]), renderPosition.BEFOREEND);

for(let i = 0; i < partOfTheData.length; i++){
  renderTemplate(filmsListElement, createCardList(data[i]),renderPosition.BEFOREEND);
}

if(data.length > NUMBER_OF_DISPLAYS){
  let renderDataCount = NUMBER_OF_DISPLAYS;

  renderTemplate(siteMainElement, createButtonTemplate(), renderPosition.BEFOREEND);

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    data
      .slice(renderDataCount, renderDataCount + NUMBER_OF_DISPLAYS)
      .forEach(((item) => renderTemplate(filmsListElement, createCardList(item), renderPosition.BEFOREEND)));

    renderDataCount += NUMBER_OF_DISPLAYS;

    if(renderDataCount >= data.length){
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteMainElement, createPopupTemplate(data[0]), renderPosition.BEFOREEND);

const CommentsListElement = document.querySelector('.film-details__comments-list');

for(let i = 0; i < randomNumberComments; i++){
  renderTemplate(CommentsListElement, createCommentsList(data[i]), renderPosition.BEFOREEND);
}
