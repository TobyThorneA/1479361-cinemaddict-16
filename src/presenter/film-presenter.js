import CommentsListView from '../view/comments-popup-view';
import { getComments } from '../mock/comments.js';
import { getRandomInteger, remove} from '../utils.js';
import { renderPosition, renderElement } from '../render.js';


const NUMBER_OF_COMMENTS = 500;


export default class FilmPresenter {
#filmContainer = null;
#clickButtons = null;
#popupView = null;
#reRenderPopup = null;
#cardView = null;
#filmList = null;

#numberOfComments = NUMBER_OF_COMMENTS;

#cardComponent = null;
constructor (filmContainer, clickButtons, reRenderPopup, filmList) {
  this.#filmContainer = filmContainer;
  this.#clickButtons = clickButtons;
  this.#reRenderPopup = reRenderPopup;
  this.#filmList = filmList;
}

  init = ( popup, filmList) => {
    this.#renderPopupFilm( popup, filmList);

    // this.#reRendertPopupFilm(popup, filmPresenter, popupView)
  }


  // #reRendertPopupFilm = (popup,filmPresenter,popupView) => {
  //   popup.clickWatchList(() => {
  //     console.log('la' );
  //     this.#clickButtons();
  //     remove(popup);
  //     this.popup = popupView;
  //     filmPresenter.init(popup );
  //     console.log('lala' );


  //   });
  // }

  #renderPopupFilm = (popup, filmList) => {

    // console.log('film', film);
    // console.log('function',this.#clickButtons);


    document.body.classList.add('hide-overflow');
    this.#popupView = popup;
    this.#clickButtonsPopup();

    renderElement(this.#filmContainer, this.#popupView, renderPosition.BEFOREEND);

    const randomNumberComments = getRandomInteger(1, 5);
    const dataComments = Array.from({length: this.#numberOfComments}, getComments);

    dataComments.slice(0, randomNumberComments)
      .forEach((it) => {
        const commentsList = new CommentsListView(it).element;
        const popupElement = popup.element.querySelector('.film-details__comments-list');
        renderElement(popupElement, commentsList, renderPosition.BEFOREEND);
      });

    popup.onCloseButton();

  }

   #clickButtonsPopup = () => {
     //  const isWatchList = ({...filmList, isWatchList : !filmList.isWatchList});
     //  const isHistory = ({...filmList, isHistory : !filmList.isHistory});
     //  const isFavorite = ({...filmList, isFavorite : !filmList.isFavorite});


     this.#popupView.clickWatchList(() => {
       console.log('clickWatchList');
     });

     this.#popupView.clickWatched(() => {
       console.log('clickWatched');
     });

     this.#popupView.clickFavorite(() => {
       console.log('clickFavorite');
     });


   }

}
