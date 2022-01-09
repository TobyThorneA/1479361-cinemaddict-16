import ButtonView from '../view/button-show-more-view.js';
import CardListView from '../view/film-card-view.js';
import EmptyListView from '../view/empty-list-view.js';
import FilmsListView from '../view/films-list-view.js';
import { getFiltersData} from '../utils.js';
import PopupView from '../view/popup-view';
import { renderPosition, renderElement } from '../render.js';
import SiteMenuView from '../view/site-menu-view';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import { remove, /*replace,*/ updateItem } from '../utils.js';


const NUMBER_OF_DISPLAYS = 5;


export default class FilmListPresenter {
  #filmsContainer = null;

  #popupPresenter = new Map();

  #numberOfDisplays = NUMBER_OF_DISPLAYS;
  #showMoreButton = new ButtonView();
  filmsListView = null;
  #siteMenuView = null;
  #cardView= null;
  #cardPopupView = null;
  #filmPresenterView = null;
  #sortMenuView = null;
  #defaultFilmsList = [];
  #sortByDefault = null;

  startOfTheList = 0;
  from = 0;
  to = 5;


  constructor (filmsContainer) {
    this.#filmsContainer = filmsContainer;

  }

  #filmsList = []
  #filmsListSort = []

  init = (filmsList) => {
    this.#filmsList = [...filmsList];
    this.#renderSiteMenu();
    this.#renderSortMenu();
    this.#renderFilmsList();
    this.#renderShowMoreButton();

    this.#defaultFilmsList = [...filmsList];

    if(this.#filmsList.length === 0){
      this.#emptyList();
    }else{

      this.#renderCardsFilmList(this.startOfTheList, this.to);

    }

  }

  reinit = (filmsListSort) => {
    this.#filmsList = [...filmsListSort];
    this.#filmsListSort = [...filmsListSort];
    // this.#defaultFilmsList = [...filmsListSort];
    this.#renderSiteMenu();
    this.#renderSortMenu();
    this.#renderFilmsList();
    this.#renderShowMoreButton();
    // console.log('defaultFilmList', this.#defaultFilmsList)
    // console.log('filmsList1', this.#filmsList)


    if(this.#filmsListSort.length === 0){
      this.#emptyList();
    }else{

      this.#renderCardsFilmList(this.startOfTheList, 5);
      // this.#renderShowMoreButton();

    }

  }


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


  #renderCardFilm = (filmList) => {


    this.#cardView = new CardListView(filmList);


    this.#cardView.onClickCard(() => {

      this.#filmPresenterView = new FilmPresenter(this.#filmsContainer, () => this.renderButtons(filmList), () => this.reRenderPopup(filmList), this.#filmsList);

      remove(this.#cardPopupView);
      this.#cardPopupView = new PopupView(filmList);
      this.#filmPresenterView.init(this.#cardPopupView, filmList);


    });

    renderElement(this.filmsListView, this.#cardView,renderPosition.BEFOREEND);


    this.#popupPresenter.set(filmList.id, this.#cardView.onClickWatchList());

    this.#clickButtonsFilmsList(filmList);

    this.#sortMenuView
      .onClickSortRating(() => {

        this.sortByRating();
      });

    this.#sortMenuView
      .onClickSortDate(() => {
        this.sortByDate();
      });

    this.#sortMenuView
      .onClickSortDefault(() => {
        this.sortByDefault();
      });


    renderElement(this.filmsListView, this.#cardView,renderPosition.BEFOREEND);

  }

  reRenderPopup = (filmList) => {
    remove(this.#cardPopupView);
    this.#cardPopupView = new PopupView(filmList);
    this.#filmPresenterView.init(this.#cardPopupView );

  }

  renderButtons = (filmList, reRender ) => {

    const newFilmsList = this.#filmsList.map((arg) => {
      if(filmList.id === arg.id){

        filmList = reRender;

        return filmList;

      }else{
        return arg;
      }

    });

    this.init(newFilmsList);

    if(this.#cardPopupView){
      remove(this.#cardPopupView);
      this.#cardPopupView = new PopupView(filmList);
      this.#filmPresenterView.init(this.#cardPopupView );
    }
  }

  renderButtons = (filmList ) => {

    const newFilmsList = this.#filmsList.map((arg) => {
      if(filmList.id === arg.id){

        return {...arg, isWatchList : !arg.isWatchList};


      }

      return arg;


    });

    this.init(newFilmsList);

    if(this.#cardPopupView){
      remove(this.#cardPopupView);
      this.#cardPopupView = new PopupView(filmList);
      this.#filmPresenterView.init(this.#cardPopupView );
    }
  }


  #clickButtonsFilmsList = (filmList) => {

    const isWatchList = ({...filmList, isWatchList : !filmList.isWatchList});
    const isHistory = ({...filmList, isHistory : !filmList.isHistory});
    const isFavorite = ({...filmList, isFavorite : !filmList.isFavorite});

    this.#cardView.onClickWatchList(() => {
      this.renderButtons(filmList, isWatchList);
    });

    this.#cardView.onClickWatched(() => {
      this.renderButtons(filmList, isHistory);
    });

    this.#cardView.onClickFavorite(() => {
      this.renderButtons(filmList, isFavorite);
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


  #clearFilmList = () => {
    this.#popupPresenter.forEach((presenter) => remove(presenter));
    this.#popupPresenter.clear();
    this.#numberOfDisplays = NUMBER_OF_DISPLAYS;
    remove(this.#showMoreButton);
  }

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

  #handleFilmChange = (updatedFilm)=> {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#popupPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  sortByRating = () => {
    const sortByRating = this.#filmsList;
    sortByRating.sort((prev, next) => next.rating - prev.rating);
    this.reinit(sortByRating);
  }

  sortByDate = () => {
    // if(this.#filmsListSort === this.#filmsList){console.log('render')}else{console.log('not render')}
    const sortByDate = this.#filmsList;
    sortByDate.sort((prev, next) => next.year - prev.year);
    this.reinit(sortByDate);
  }

  sortByDefault = () => {
    // console.log(this.#filmsListSort, this.#defaultFilmsList)
    this.init(this.#defaultFilmsList);
  }

}
