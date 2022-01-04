import CommentsListView from '../view/comments-popup-view';
import { getComments } from '../mock/comments.js';
import { getRandomInteger, remove} from '../utils.js';
import { renderPosition, renderElement } from '../render.js';


const NUMBER_OF_COMMENTS = 500;


export default class FilmPresenter {
#filmContainer = null;
#popup = null;


#numberOfComments = NUMBER_OF_COMMENTS;

#cardComponent = null;
constructor (filmContainer) {
  this.#filmContainer = filmContainer;
}

  init = (cardView, popup) => {
    this.#renderPopupFilm(cardView, popup);
  }


  #renderPopupFilm = (cardView, popup) => {
    cardView.onClickCard( () => {

      document.body.classList.add('hide-overflow');
      renderElement(this.#filmContainer, popup, renderPosition.BEFOREEND);


      const randomNumberComments = getRandomInteger(1, 5);
      const dataComments = Array.from({length: this.#numberOfComments}, getComments);

      dataComments.slice(0, randomNumberComments)
        .forEach((it) => {
          const commentsList = new CommentsListView(it).element;
          const popupElement = popup.element.querySelector('.film-details__comments-list');
          renderElement(popupElement, commentsList, renderPosition.BEFOREEND);
        });

      popup.onCloseButton();

    });

  }
}
