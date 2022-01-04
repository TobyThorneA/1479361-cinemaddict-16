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
import { remove, replace, updateItem } from '../utils.js';


const NUMBER_OF_DISPLAYS = 5;


export default class FilmListPresenter {
  #filmsContainer = null;

  #popupPresenter = new Map();

  #numberOfDisplays = NUMBER_OF_DISPLAYS;
  #showMoreButton = new ButtonView();
  #filmsListComponent = new FilmsListView()
  #cardComponent= null;
  #cardPopupComponent = null;
  #filmPresenterComponent = null;

  from = 0;
  to = 5;

  constructor (filmsContainer) {
    this.#filmsContainer = filmsContainer;

  }

  #filmsList = []

  init = (filmsList) => {
    this.#filmsList = [...filmsList];
    this.#renderSiteMenu();
    this.#renderSortMenu();
    this.#renderFilmsList();
    this.#renderShowMoreButton();

    if(this.#filmsList.length === 0){
      this.#emptyList();
    }else{
      this.#renderCardsFilmList();
    }

  }

  reinit = (newFilmsList) => {
    this.#filmsList = [...newFilmsList];
    this.#renderShowMoreButton();

    if(this.#filmsList.length === 0){
      this.#emptyList();
    }else{
      this.#renderCardsFilmList();
    }
  };


  #emptyList = () => {

    renderElement(this.#filmsContainer, new EmptyListView(),renderPosition.BEFOREEND);

  }

  #renderSiteMenu = () => {
    renderElement(this.#filmsContainer, new SiteMenuView(getFiltersData(this.#filmsList)), renderPosition.BEFOREEND);
  }

  #renderSortMenu = () => {
    renderElement(this.#filmsContainer, new SortView(), renderPosition.BEFOREEND);
  }

  #renderFilmsList = () => {
    renderElement(this.#filmsContainer, this.#filmsListComponent,renderPosition.BEFOREEND);
  }

  #queryId = (itId, arrId,cardView) => {
    if(itId.id === arrId.id){
      remove(cardView);
    }
  }

  #renderCardFilm = (filmList) => {

    this.#cardComponent = new CardListView(filmList);


    this.#cardPopupComponent = new PopupView(filmList);
    this.#filmPresenterComponent = new FilmPresenter(this.#filmsContainer);

    this.#filmPresenterComponent.init(this.#cardComponent, this.#cardPopupComponent);

    renderElement(this.#filmsListComponent, this.#cardComponent,renderPosition.BEFOREEND);


    this.#popupPresenter.set(filmList.id, this.#cardComponent);

    this.#cardComponent.onClickFavorite(() => {
      renderElement(this.#filmsListComponent, this.#cardComponent,renderPosition.BEFOREEND);
      remove(this.#cardPopupComponent)

      // if(this.#filmPresenterComponent === null){
      //   this.#filmPresenterComponent.init(this.#cardComponent, this.#cardPopupComponent);
      // }

    });

    this.#cardComponent.onClickWatchList(()=>{


      const newFilmsList = this.#filmsList.map((arg) => {
        // this.renderClassButton(filmList, arg)
        if(filmList.id === arg.id){
      this.#clearFilmList();
      if(filmList.string === ''){
        filmList.string = 'film-card__controls-item--active';
      }else{
        filmList.string = '';
      }

      return filmList;

    }else{
      return arg;
    }

      });
      console.log('newFilmsList', newFilmsList)
      this.reinit(newFilmsList);



    });
    renderElement(this.#filmsListComponent, this.#cardComponent,renderPosition.BEFOREEND);
  }

  renderClassButton = (filmList, arg) => {
    if(filmList.id === arg.id){
      this.#clearFilmList();
      if(filmList.string === ''){
        filmList.string = 'film-card__controls-item--active';
      }else{
        filmList.string = '';
      }

      return filmList;

    }else{
      return arg;
    }
  }


  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#cardPopupComponent);
  }


  #renderCardsFilmList = () => {

    this.#filmsList
      .slice(this.from, this.to)
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
    this.#renderCardsFilmList();

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

}
