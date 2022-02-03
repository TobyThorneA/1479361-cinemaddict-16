import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {FilmBlocks, SortType, UpdateType, UserAction, FilterType, State} from '../consts.js';
import {sortDate, sortRating, onEscKeyDown} from '../utils/common.js';
import {filter} from '../utils/filter.js';
import SortView from '../view/sort-view.js';
import Film from '../view/film.js';
import FilmListContainer from '../view/films-list-container.js';
import FilmCard from '../view/film-card/film-card.js';
import Popup from '../view/popup/popup.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilm from '../view/no-film.js';
import LoadingView from '../view/loading-view.js';
import ProfileView from '../view/profile-view.js';


const FILM_COUNT = {
  NUMBER_OF_DISPLAYS: 5,
};
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class FilmListPresenter {
  #container = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #sortComponent = null;
  #noFilmsComponent = null;
  #buttonShowMoreComponent = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #api = null;
  #filmId = null;
  #profile = null;
  #film = null;
  #filmsComponent = new Film();
  #filmMainComponent = new FilmListContainer(FilmBlocks.main);
  #loadingComponent = new LoadingView();
  #filmCards = new Map();
  #renderedFilmCount = FILM_COUNT.NUMBER_OF_DISPLAYS;
  #currentSortType = SortType.DEFAULT;
  #mode = Mode.DEFAULT
  #filterType = FilterType.ALL;
  #isLoading = true;
  constructor(container, filmsModel, commentsModel, filterModel, api) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#api = api;
    this.#filterModel.addObserver(this.#handleModel);
    this.#commentsModel.addObserver(this.#handleModel);
    this.init();
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortDate);
      case SortType.RATING:
        return filteredFilms.sort(sortRating);
    }
    return filteredFilms;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init = () => {
    this.#filmsModel.addObserver(this.#handleModel);
    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }
    this.#renderFilmList();
  }

  destroy = () => {
    this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
    remove(this.#sortComponent);
    remove(this.#filmsComponent);
    this.#filmsModel.removeObserver(this.#handleModel);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#container, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortChange);
  };

  #renderFilm = (data, filmListElement) => {
    const prevFilmCardComponent = this.#filmCards.get(data.id);
    if (prevFilmCardComponent && filmListElement && filmListElement !== prevFilmCardComponent.element.parentNode) {
      render(filmListElement, prevFilmCardComponent.createCopy(), RenderPosition.BEFOREEND);
      return;
    }
    this.#filmCardComponent = new FilmCard(data);
    this.#filmCards.set(data.id, this.#filmCardComponent);
    this.#filmCardComponent.setFilmClickHandler(() => {
      this.#popup(data);
      this.#mode = Mode.EDITING;
    });
    this.#filmCardComponent.setWatchlistClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, watchlist: !data.user_details.watchlist}}
      );
    });
    this.#filmCardComponent.setHistoryClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data,
          'user_details': {...data.user_details,
            'already_watched': !data.user_details.already_watched,
            'watching_date': !data.user_details.already_watched ? new Date() : null}}
      );
    });
    this.#filmCardComponent.setFavoriteClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, favorite: !data.user_details.favorite}}
      );
    });
    if (!prevFilmCardComponent) {
      render(filmListElement, this.#filmCardComponent.createCopy(), RenderPosition.BEFOREEND);
      return;
    }
    if (!filmListElement) {
      prevFilmCardComponent.renderedFilms.forEach((film) => {
        replace(this.#filmCardComponent.createCopy(), film);
      });
    }
    remove(prevFilmCardComponent);
  };

  #popup = (data) => {
    this.#api.getComments(data.id)
      .then((comments) => {
        this.#commentsModel.comments = comments;
        this.#createPopup(data, this.#commentsModel.comments);
      })
      .catch(() => {
        this.#setState(State.ABORTING);
      });
  }

  #escKeyDownHandler = (evt) => {
    onEscKeyDown(evt, () => {
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = Mode.DEFAULT;
    });
  };

  #createPopup = (data, comments) => {
    this.#filmId = data.id;
    const commentsID = comments.map((item) => item.id);
    this.#film = data;
    this.#film.comments = commentsID;
    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new Popup(data, comments);
    render(document.body, this.#popupComponent, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#popupComponent.setPopupClickHandler(() => {
      this.#popupComponent.reset(data);
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = Mode.DEFAULT;
    });
    this.#popupComponent.setPopupWatchlistClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, watchlist: !data.user_details.watchlist}}
      );
    });
    this.#popupComponent.setPopupHistoryClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data,
          'user_details': {...data.user_details,
            'already_watched': !data.user_details.already_watched,
            'watching_date': !data.user_details.already_watched ? new Date() : null}}
      );
    });
    this.#popupComponent.setPopupFavoriteClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, favorite: !data.user_details.favorite}}
      );
    });
    this.#popupComponent.setDeleteCommentClickHandler((id) => {
      this.#handleViewAction(
        UserAction.DELETE_COMMENT,
        UpdateType.DELETE,
        comments.find((comment) => comment.id === id),
      );
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, comments: data.comments.filter((comment) => comment !== id)},
      );
    });
    this.#popupComponent.setAddCommentKeydownHandler((comment) => {
      this.#handleViewAction(
        UserAction.ADD_COMMENT,
        UpdateType.ADD,
        comment,
      );
      this.#handleViewAction(
        UserAction,
        UpdateType.MINOR,
        {...data, comments: data.comments.push(comment.id)},
      );
    });
    if (prevPopupComponent !== null && this.#mode === Mode.EDITING) {
      const scrollPoint = prevPopupComponent.element.scrollTop;
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = scrollPoint;
      this.#popupComponent.userEmoji = prevPopupComponent.userEmoji;
      this.#popupComponent.userComment = prevPopupComponent.userComment;
      this.#popupComponent.userData();
    }
    remove(prevPopupComponent);
  }

  #closePopup = () => {
    this.#filmId = null;
    this.#commentsModel.comments = [];
    document.body.classList.remove('hide-overflow');
    remove(this.#popupComponent);
    this.#popupComponent = null;
  };

  #setState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }
    const resetFormState = () => {
      this.#popupComponent.updateData({
        isDisabled: false,
      });
    };
    switch (state) {
      case State.ADDING:
        this.#popupComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.DELETING:
        this.#popupComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.ABORTING:
        this.#filmCardComponent.shake(resetFormState);
        this.#popupComponent.shake(resetFormState);
        break;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch(error) {
          this.#setState(State.ABORTING);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#setState(State.ADDING);
        try {
          await this.#commentsModel.addComment(updateType, update, this.#filmId);
          this.#popupComponent.reset(this.#film);
        }
        catch(error) {
          this.#setState(State.ABORTING);
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#setState(State.DELETING);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(error) {
          this.#setState(State.ABORTING);
        }
        break;
      default:
        break;
    }
  }

  #handleModel = (updateType, data) => {
    switch (updateType) {
      case UpdateType.DELETE:
        break;
      case UpdateType.ADD:
        this.#clearBoard();
        this.#renderFilm(this.#film);
        this.#renderFilmList();
        if (this.#mode === Mode.EDITING) {
          this.#popup(this.#film);
        }
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderFilm(data);
        this.#renderFilmList();
        if (this.#mode === Mode.EDITING) {
          this.#popup(data);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderFilmList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmList();
        break;
    }
  }

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#closePopup();
    this.#renderedFilmCount = FILM_COUNT.NUMBER_OF_DISPLAYS;
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderFilmList();
  }

  #renderCardFilms = (films, container) => {
    films.forEach((film) => {
      this.#renderFilm(film, container);
    });
  }

  #handlShowMoreButtonClick = () => {

    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount +  FILM_COUNT.NUMBER_OF_DISPLAYS);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);
    this.#renderCardFilms(films, this.#filmMainComponent.container);
    this.#renderedFilmCount = newRenderedFilmCount;
    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#buttonShowMoreComponent);
    }
  }

  #renderShowMoreButton = () => {
    this.#buttonShowMoreComponent = new ShowMoreButtonView();
    this.#buttonShowMoreComponent.setClickHandler(this.#handlShowMoreButtonClick);
    render(this.#filmMainComponent, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);
  }

  #renderLoading = () => {
    render(this.#filmMainComponent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyFilmsList = () => {
    this.#noFilmsComponent = new NoFilm(this.#filterType);
    render(this.#container, this.#noFilmsComponent, RenderPosition.BEFOREEND);
    remove(this.#loadingComponent);
  }

  #renderProfile = () => {
    remove(this.#profile);
    this.#profile = new ProfileView(this.#filmsModel.films);
    render(document.querySelector('.header'), this.#profile, RenderPosition.BEFOREEND);
  }

  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;
    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#buttonShowMoreComponent);
    remove(this.#filmMainComponent);
    remove(this.#loadingComponent);
    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT.NUMBER_OF_DISPLAYS;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderFilmList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
    } else {
      remove(this.#loadingComponent);
      this.#renderSort();
    }

    const films = this.films;
    const filmCount = films.length;
    this.#renderProfile();
    render(this.#container, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmMainComponent, RenderPosition.BEFOREEND);
    if (filmCount === 0 && !this.#isLoading) {
      remove(this.#sortComponent);
      this.#renderEmptyFilmsList();
      return;
    }
    this.#renderCardFilms(films.slice(0, this.#renderedFilmCount), this.#filmMainComponent.container);
    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  }
}
