import {RenderPosition, render, remove} from './utils/render.js';
import {FilterType} from './consts.js';
import NumberOfFilms from './view/number-of-films.js';
import FilmListPresenter from './presenters/film-list-presenter.js';
import FilmsModel from './models/films-model.js';
import CommentsModel from './models/comments-model.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenters/filter-presenter.js';
import Statistics from './view/statistics/statistics.js';
import MenuView from './view/menu-view.js';
import ApiService from './services/api-service.js';

const AUTHORIZATION = 'Basic vkjbb6544dfbj40G';
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('footer');
const apiService = new ApiService(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel(apiService);
const commentsModel = new CommentsModel(apiService);
const filterModel = new FilterModel();
const siteMenu = new MenuView();

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, commentsModel, filterModel, apiService);
new FilterPresenter(siteMenu, filterModel, filmsModel);
let statisticsComponent = null;
const handleSiteMenuClick = (target) => {
  const menuCurrentType = target.dataset.filter;
  const menuActive = document.querySelector('.main-navigation__item--active');
  const menuStats = document.querySelector('.main-navigation__additional');
  switch (menuCurrentType) {
    case FilterType.ALL:
    case FilterType.WATCHLIST:
    case FilterType.HISTORY:
    case FilterType.FAVORITES:
      remove(statisticsComponent);
      filmListPresenter.destroy();
      filmListPresenter.init();
      menuStats.classList.remove('main-navigation__item--active');
      target.classList.add('main-navigation__item--active');
      break;
    case FilterType.STATS:
      filmListPresenter.destroy();
      statisticsComponent = new Statistics(filmsModel.films);
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      statisticsComponent.getCharts(filmsModel.films);
      menuActive.classList.remove('main-navigation__item--active');
      menuStats.classList.add('main-navigation__item--active');
      break;
    default:
      if (statisticsComponent) {
        remove(statisticsComponent);
        menuStats.classList.remove('main-navigation__item--active');
      }
      filmListPresenter.destroy();
      filmListPresenter.init();
      break;
  }
};
siteMenu.setMenuClickHandler(handleSiteMenuClick);
const numberOfFilms = new NumberOfFilms(filmsModel.films);
render(siteFooterElement, numberOfFilms, RenderPosition.BEFOREEND);
filmsModel.init().finally(() => {
  render(siteMainElement, siteMenu, RenderPosition.AFTERBEGIN);
  remove(numberOfFilms);
  render(siteFooterElement, new NumberOfFilms(filmsModel.films), RenderPosition.BEFOREEND);
  siteMenu.setMenuClickHandler(handleSiteMenuClick);
});
