import ButtonView from '../view/button-show-more-view.js';
import CardListView from '../view/film-card-view.js';
import CommentsListView from '../view/comments-popup-view';
import EmptyListView from '../view/empty-list-view.js';
import FilmsListView from '../view/films-list-view.js';
import { getFiltersData} from '../utils.js';
import { getComments } from '../mock/comments.js';
import PopupView from '../view/popup-view';
import { renderPosition, renderElement } from '../render.js';
import SiteMenuView from '../view/site-menu-view';
import SortView from '../view/sort-view.js';
import { remove, getRandomInteger } from '../utils.js';


const NUMBER_OF_DISPLAYS = 5;
const NUMBER_OF_COMMENTS = 500;


export default class FilmListPresenter {
  #filmsContainer = null;

  #numberOfDisplays = NUMBER_OF_DISPLAYS;
  #showMoreButton = new ButtonView();
  filmsListView = null;
  #siteMenuView = null;
  #cardPopupView = null;
  #filmPresenterView = null;
  #sortMenuView = null;


  startOfTheList = 0;
  from = 0;
  to = 5;


  constructor (filmsContainer) {
    this.#filmsContainer = filmsContainer;

  }

  #filmsList = []

  // module5-task2
  // #filmsListSort = []
  // #defaultFilmsList = [];

  init = (filmsList) => {
    this.#filmsList = [...filmsList];
    this.#renderSiteMenu();
    this.#renderSortMenu();
    this.#renderFilmsList();
    this.#renderShowMoreButton();

    // module5-task2

    // this.#defaultFilmsList = [...filmsList];

    if(this.#filmsList.length === 0){
      this.#emptyList();
    }else{

      this.#renderCardsFilmList(this.startOfTheList, this.to);

    }

  }
  // module5-task2
  // reinit = (filmsListSort) => {
  //   this.#filmsList = [...filmsListSort];
  //   this.#filmsListSort = [...filmsListSort];
  //   this.#renderSiteMenu();
  //   this.#renderSortMenu();
  //   this.#renderFilmsList();
  //   this.#renderShowMoreButton();


  //   if(this.#filmsListSort.length === 0){
  //     this.#emptyList();
  //   }else{

  //     this.#renderCardsFilmList(this.startOfTheList, 5);
  //     // this.#renderShowMoreButton();

  //   }

  // }


  #emptyList = () => {

    renderElement(this.#filmsContainer, new EmptyListView(),renderPosition.BEFOREEND);

  }

  #renderSiteMenu = () => {
    remove(this.#siteMenuView);
    this.#siteMenuView = new SiteMenuView(getFiltersData(this.#filmsList));
    renderElement(this.#filmsContainer, this.#siteMenuView, renderPosition.BEFOREEND);
  }

  #renderSortMenu = () => {
    remove(this.#sortMenuView);
    this.#sortMenuView = new SortView();
    renderElement(this.#filmsContainer, this.#sortMenuView, renderPosition.BEFOREEND);
  }

  #renderFilmsList = () => {
    remove(this.filmsListView);

    this.filmsListView = new FilmsListView();
    renderElement(this.#filmsContainer, this.filmsListView,renderPosition.BEFOREEND);

  }


  #renderCardFilm = (film) => {
    const cardView = new CardListView(film);

    cardView.onClickCard(() => {
      this.renderPopUp(film);
      this.#cardPopupView.onCloseButton();
      this.#renderCommentsList();
    });

    cardView.onClickWatchList(() => {
      this.renderButtons(film, 'isWatchList');
    });

    cardView.onClickWatched(() => {
      this.renderButtons(film, 'isHistory');
    });

    cardView.onClickFavorite(() => {
      this.renderButtons(film, 'isFavorite');
    });

    // module5-task2
    // this.#sortMenuView
    //   .onClickSortRating(() => {
    //     this.sortByRating();
    //   });

    // this.#sortMenuView
    //   .onClickSortDate(() => {
    //     this.sortByDate();
    //   });

    // this.#sortMenuView
    //   .onClickSortDefault(() => {
    //     this.sortByDefault();
    //   });


    renderElement(this.filmsListView, cardView, renderPosition.BEFOREEND);
  }

  reRenderPopup = (filmList) => {
    remove(this.#cardPopupView);
    this.#cardPopupView = new PopupView(filmList);
    this.#filmPresenterView.init(this.#cardPopupView );

  }

  renderPopUp = (film) => {
    if (this.#cardPopupView) {
      remove(this.#cardPopupView);
    }

    this.#cardPopupView = new PopupView(film);
    this.filmInPopUp = film;

    this.#cardPopupView.onClickWatchList(() => {
      this.renderButtons(film, 'isWatchList');
    });

    this.#cardPopupView.onClickWatched(() => {
      this.renderButtons(film, 'isHistory');
    });

    this.#cardPopupView.onClickFavorite(() => {
      this.renderButtons(film, 'isFavorite');
    });

    renderElement(this.#filmsContainer, this.#cardPopupView, renderPosition.AFTEREND);
  }

  reRenderPopUpIfNeeded(film) {
    if (this.#cardPopupView && this.filmInPopUp && this.filmInPopUp.id === film.id) {
      this.renderPopUp(film);
      this.#cardPopupView.onCloseButton();
      this.#renderCommentsList();
    }
  }

  renderButtons = (film, fieldName) => {
    let nextFilm;

    const newFilmsList = this.#filmsList.map((it) => {
      if (film === it){
        nextFilm = { ...it, [fieldName]: !it[fieldName] };

        return nextFilm;
      }

      return it;
    });

    this.init(newFilmsList);
    this.reRenderPopUpIfNeeded(nextFilm);
  }

  #renderCommentsList = () => {

    const randomNumberComments = getRandomInteger(1, 5);
    const dataComments = Array.from({length: NUMBER_OF_COMMENTS}, getComments);

    dataComments.slice(0, randomNumberComments)
      .forEach((it) => {
        const commentsList = new CommentsListView(it).element;
        const popupElement = this.#cardPopupView.element.querySelector('.film-details__comments-list');
        renderElement(popupElement, commentsList, renderPosition.BEFOREEND);
      });

  }

  #renderCardsFilmList = (from, to) => {
    this.#filmsList
      .slice(from, to)
      .forEach((item) => {
        this.#renderCardFilm(item);
      });

    if(this.to > this.#filmsList.length){
      this.#showMoreButton.element.remove();
    }
  };


  #handleShowMoreButtonClick = () => this.#showMoreButton.onClickButton(() => {
    this.from = this.from + this.#numberOfDisplays;
    this.to = this.from + this.#numberOfDisplays;
    this.#renderCardsFilmList(this.from, this.to);

  });


  #renderShowMoreButton = () => {
    if(this.#filmsList.length > this.#numberOfDisplays){

      renderElement(this.#filmsContainer, this.#showMoreButton, renderPosition.BEFOREEND);
      this.#handleShowMoreButtonClick();


    }
  }

  //  module5-task2
  // sortByRating = () => {
  //   const sortByRating = this.#filmsList;
  //   sortByRating.sort((prev, next) => next.rating - prev.rating);
  //   this.reinit(sortByRating);
  // }

  // sortByDate = () => {
  //   // if(this.#filmsListSort === this.#filmsList){console.log('render')}else{console.log('not render')}
  //   const sortByDate = this.#filmsList;
  //   sortByDate.sort((prev, next) => next.year - prev.year);
  //   this.reinit(sortByDate);
  // }

  // sortByDefault = () => {
  //   // console.log(this.#filmsListSort, this.#defaultFilmsList)
  //   this.init(this.#defaultFilmsList);
  // }

}
