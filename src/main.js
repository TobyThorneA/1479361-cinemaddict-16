import ButtonView from './view/button-show-more-view.js';
import CardListView from './view/film-card-view.js';
import CommentsListView from './view/comments-popup-view';
import FilmsListView from './view/films-list-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { generateData } from './mock/card-films.js';
import { getRandomInteger } from './utils.js';
import PopupView from './view/popup-view';
import { renderPosition, renderElement } from './render.js';
import SiteMenuView from './view/site-menu-view';
import UserTitleView from './view/user-title-view.js';

const NUMBER_OF_CARD_DISPLAYS = 22;
const NUMBER_OF_DISPLAYS = 5;

const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const data = Array.from({length: NUMBER_OF_CARD_DISPLAYS}, generateData);


renderElement(headerProfileElement, (new UserTitleView(data[0])).element, renderPosition.BEFOREEND);
renderElement(siteMainElement, (new SiteMenuView(data[0]).element), renderPosition.BEFOREEND);
renderElement(siteMainElement, (new FilmsListView()).element,renderPosition.BEFOREEND);

const filmsListElement = document.querySelector('.films-list__container');

renderElement(footerStatisticsElement, (new FooterStatisticsView(data[0])).element, renderPosition.BEFOREEND);

const renderCardSlice = (from, to) => {
  data.slice(from, to)
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


        const onPopupClose = () => {
          cardPopupView.element.remove();
          document.body.classList.remove('hide-overflow');

        };
        cardPopupView.element.querySelector('.film-details__close-btn').addEventListener('click', onPopupClose);

        // module3-task2
        //   const onPopupCloseKeydown = (evt) => {
        //     if (evt.key === 'Escape' || evt.key === 'Esc' ) {
        //       onPopupClose();
        //       window.removeEventListener('keydown', onPopupCloseKeydown);
        //     }
        //   };

        //   window.addEventListener('keydown', onPopupCloseKeydown);

      });
      renderElement(filmsListElement, cardView.element,renderPosition.BEFOREEND);

    });
};
renderCardSlice(0,5);

let showMoreButton = siteMainElement.querySelector('.films-list__show-more');


if(data.length > NUMBER_OF_DISPLAYS){
  const renderDataCount = NUMBER_OF_DISPLAYS;

  renderElement(siteMainElement, new ButtonView().element, renderPosition.BEFOREEND);

  showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderCardSlice(renderDataCount, renderDataCount + NUMBER_OF_DISPLAYS);

    if(renderDataCount >= data.length){
      showMoreButton.remove();
    }
  });
}

