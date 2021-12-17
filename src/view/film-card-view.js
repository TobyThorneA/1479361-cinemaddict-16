import AbstractParentClass from './abstract-parent-class-view';

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
            <p class="film-card__description">${values.description.slice(0, 10)}</p>
            <span class="film-card__comments">${values.comments} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
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

  onClickCard = (callback) => {

    this._callback.click = callback;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  }
}
