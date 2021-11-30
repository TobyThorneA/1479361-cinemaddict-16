import {renderPosition, renderTemplate} from './render.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createUserTitleTemplate} from './view/user-title-view.js';
import { createFilmsListTemplate } from './view/films-list-view.js';
import { createButtonTemplate } from './view/button-show-more-view.js';
import { createPopupTemplate } from './view/popup-view.js';
import { createCardList } from './view/film-card-view.js';

const NUMBER_OF_CARDS = 5;
const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');

renderTemplate(siteMainElement, createSiteMenuTemplate(), renderPosition.BEFOREEND);
renderTemplate(headerProfileElement, createUserTitleTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsListTemplate(),renderPosition.BEFOREEND);
const filmsListElement = document.querySelector('.films-list__container');

for(let i = 0; i < NUMBER_OF_CARDS; i++){
  renderTemplate(filmsListElement, createCardList(),renderPosition.BEFOREEND);
}

renderTemplate(siteMainElement, createButtonTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createPopupTemplate(), renderPosition.BEFOREEND);
