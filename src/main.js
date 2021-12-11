import ButtonView from './view/button-show-more-view.js';
import CardListView from './view/film-card-view.js';
import CommentsListView from './view/comments-popup-view';
import EmptyListView from './view/empty-list-view.js';
import FilmsListView from './view/films-list-view.js';
import { getFilms } from './mock/films.js';
import { getComments } from './mock/comments.js';
import { getProfile } from './mock/profile.js';
import { getRandomInteger, closePopup, getFiltersData} from './utils.js';
import PopupView from './view/popup-view';
import { renderPosition, renderElement } from './render.js';
import SiteMenuView from './view/site-menu-view';
import UserTitleView from './view/user-title-view.js';

const NUMBER_OF_CARD_DISPLAYS = 10;
const NUMBER_OF_DISPLAYS = 5;
const NUMBER_OF_USERS = 5;
const NUMBER_OF_COMMENTS = 500;

export const dataCards = Array.from({length: NUMBER_OF_CARD_DISPLAYS}, getFilms);
const dataUserProfile = Array.from({length: NUMBER_OF_USERS}, getProfile);


const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');


renderElement(headerProfileElement, (new UserTitleView(dataUserProfile[0])).element, renderPosition.BEFOREEND);
renderElement(siteMainElement, (new SiteMenuView(getFiltersData(dataCards))).element, renderPosition.BEFOREEND);

const footerStatisticsElement = document.querySelector('.footer__statistics');

if(dataCards.length === 0){
  renderElement(siteMainElement, (new EmptyListView()).element,renderPosition.BEFOREEND);
}

renderElement(siteMainElement, (new FilmsListView()).element,renderPosition.BEFOREEND);
renderElement(footerStatisticsElement, `${dataCards.length} movies inside`, renderPosition.BEFOREEND);

const filmsListElement = document.querySelector('.films-list__container');


const renderCardSlice = (from, to) => {
  dataCards.slice(from, to)
    .forEach((item) => {
      const cardView = new CardListView(item);
      const cardElement = cardView.element.querySelector('.film-card__link');

      cardElement.addEventListener('click', () => {

        const cardPopupView = new PopupView(item);
        document.body.classList.add('hide-overflow');

        renderElement(siteMainElement, cardPopupView.element, renderPosition.BEFOREEND);

        const randomNumberComments = getRandomInteger(1, 5);
        const dataComments = Array.from({length: NUMBER_OF_COMMENTS}, getComments);

        dataComments.slice(0, randomNumberComments)
          .forEach((it) => {
            const commentsList = new CommentsListView(it);
            const popupElement = cardPopupView.element.querySelector('.film-details__comments-list');

            renderElement(popupElement, commentsList.element, renderPosition.BEFOREEND);
          });

        closePopup(cardPopupView);
        // console.log(new PopupView.element());

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

