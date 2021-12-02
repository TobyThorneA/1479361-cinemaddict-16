import {renderPosition, renderTemplate} from './render.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createUserTitleTemplate} from './view/user-title-view.js';
import { createFilmsListTemplate } from './view/films-list-view.js';
import { createButtonTemplate } from './view/button-show-more-view.js';
import { createPopupTemplate } from './view/popup-view.js';
import { createCardList } from './view/film-card-view.js';
import { generateData } from './mock/card-films.js';
import { footerStatisticsTemplate } from './view/footer-statistics-view.js';

const NUMBER_OF_CARDS = 22;
const OBJECT_ARRAY = 5;

const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const data = Array.from({length: NUMBER_OF_CARDS}, generateData);

renderTemplate(siteMainElement, createSiteMenuTemplate(data[0]), renderPosition.BEFOREEND);
renderTemplate(headerProfileElement, createUserTitleTemplate(data[0]), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsListTemplate(),renderPosition.BEFOREEND);
const filmsListElement = document.querySelector('.films-list__container');
renderTemplate(footerStatisticsElement, footerStatisticsTemplate(data[0]), renderPosition.BEFOREEND);

for(let i = 0; i < Math.min(data.length, OBJECT_ARRAY); i++){
  renderTemplate(filmsListElement, createCardList(data[i]),renderPosition.BEFOREEND);
}

if(data.length > OBJECT_ARRAY){
  let renderDataCount = OBJECT_ARRAY;

  renderTemplate(siteMainElement, createButtonTemplate(), renderPosition.BEFOREEND);

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    data
      .slice(renderDataCount, renderDataCount + OBJECT_ARRAY)
      .forEach(((dat) => renderTemplate(filmsListElement, createCardList(dat), renderPosition.BEFOREEND)));

    renderDataCount += OBJECT_ARRAY;

    if(renderDataCount >= data.length){
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteMainElement, createPopupTemplate(data[0]), renderPosition.BEFOREEND);
