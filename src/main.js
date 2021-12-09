import ButtonView from './view/button-show-more-view.js';
import CardListView from './view/film-card-view.js';
import CommentsListView from './view/comments-popup-view';
import EmptyListView from './view/empty-list-view.js';
import FilmsListView from './view/films-list-view.js';
import { generateDataCards, generateDataUserProfile } from './mock/card-films.js';
import { getRandomInteger, closePopup } from './utils.js';
import PopupView from './view/popup-view';
import { renderPosition, renderElement } from './render.js';
import SiteMenuView from './view/site-menu-view';
import UserTitleView from './view/user-title-view.js';

const NUMBER_OF_CARD_DISPLAYS = 0;
const NUMBER_OF_DISPLAYS = 5;
const NUMBER_OF_USERS = 1;

const dataCards = Array.from({length: NUMBER_OF_CARD_DISPLAYS}, generateDataCards);
const dataUserProfile = Array.from({length: NUMBER_OF_USERS}, generateDataUserProfile);

const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');


renderElement(headerProfileElement, (new UserTitleView(dataUserProfile[0])).element, renderPosition.BEFOREEND);
renderElement(siteMainElement, (new SiteMenuView(dataUserProfile[0])).element, renderPosition.BEFOREEND);

const footerStatisticsElement = document.querySelector('.footer__statistics');

if(dataCards.length === 0){
  renderElement(siteMainElement, (new EmptyListView()).element,renderPosition.BEFOREEND);
}

renderElement(siteMainElement, (new FilmsListView()).element,renderPosition.BEFOREEND);
renderElement(footerStatisticsElement, dataCards.length, renderPosition.BEFOREEND);

const filmsListElement = document.querySelector('.films-list__container');


const renderCardSlice = (from, to) => {
  dataCards.slice(from, to)
    .forEach((item) => {
      const cardView = new CardListView(item);
      const cardElement = cardView.element.querySelector('.film-card__link');

      cardElement.addEventListener('click', () => {

        const cardPopupView = new PopupView(item);
        if(cardPopupView === true){
          cardPopupView.element.remove();
        }

        document.body.classList.add('hide-overflow');

        renderElement(siteMainElement, cardPopupView.element, renderPosition.BEFOREEND);

        const randomNumberComments = getRandomInteger(1, 5);

        for(let i = 0; i < randomNumberComments; i++){
          const commentsList = new CommentsListView(item);
          const popupElement = cardPopupView.element.querySelector('.film-details__comments-list');

          renderElement(popupElement, commentsList.element, renderPosition.BEFOREEND);
        }

        closePopup(cardPopupView);

      });
      renderElement(filmsListElement, cardView.element,renderPosition.BEFOREEND);

    });
};
renderCardSlice(0,5);

let showMoreButton = siteMainElement.querySelector('.films-list__show-more');


if(dataCards.length > NUMBER_OF_DISPLAYS){
  const renderdataCardsCount = NUMBER_OF_DISPLAYS;

  renderElement(siteMainElement, new ButtonView().element, renderPosition.BEFOREEND);

  showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderCardSlice(renderdataCardsCount, renderdataCardsCount + NUMBER_OF_DISPLAYS);

    if(renderdataCardsCount >= dataCards.length){
      showMoreButton.remove();
    }
  });
}

