import AbstractParentClass from './abstract-parent-class-view';
import { remove } from '../utils';

const MAX_DESCRIPTION_LENGTH = 140;

const cutDescription = (description) => {

  // let shortDescription = null;
  // description.forEach((item) => {
  //   shortDescription = item.length > MAX_DESCRIPTION_LENGTH
  //     ? `${item.slice(0, MAX_DESCRIPTION_LENGTH - 1)}(...)`
  //     : item;
  // });
  // return shortDescription;


  const shortDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}(...)`
    : description;
  return shortDescription;
};

const createCardList = (values) => (
  `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${values.title}</h3>
            <p class="film-card__rating">${values.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${values.year}</span>
              <span class="film-card__duration">${values.duration}</span>
              <span class="film-card__genre">${values.genre}</span>
            </p>
            <img src="${values.images}" alt="" class="film-card__poster">
            <p class="film-card__description">${cutDescription(values.description)}</p>
            <span class="film-card__comments">${values.comments} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist${values.isWatchList ? ' film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched${values.isHistory ? ' film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite${values.isFavorite ? ' film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>

        </article>`);

export default class CardListView extends AbstractParentClass {
  #value = null;

  constructor(value) {
    super();
    this.#value = value;
  }

  get template() {
    return createCardList(this.#value);

  }

  destroy = (card, popup) => {
    remove(card);
    remove(popup);
  }

  onClickCard = (callbackk) => {

    this._callback.click = callbackk;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);

  }

  onClickWatchList = (callback) => {

    this._callback.clickWatchList = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#clickWatchList);

  }

  onClickWatched = (callback) => {

    this._callback.clickWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickWatched);

  }

  onClickFavorite = (callback) => {

    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickFavorite);

  }


  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();

  }

  #clickWatchList = (evt) => {
    evt.preventDefault();

    this._callback.clickWatchList();
  }

  #clickWatched = (evt) => {
    evt.preventDefault();

    this._callback.clickWatched();
  }

  #clickFavorite = (evt) => {
    evt.preventDefault();

    this._callback.clickFavorite();
  }

}
