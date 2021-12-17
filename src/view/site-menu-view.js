import AbstractParentClass from './abstract-parent-class-view';

const createSiteMenuTemplate = (values) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${values.watchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${values.history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${values.favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`);


export default class SiteMenuView extends AbstractParentClass {
  #value = null;

  constructor(value) {
    super();
    this.#value = value;
  }

  get template() {
    return createSiteMenuTemplate(this.#value);
  }
}
