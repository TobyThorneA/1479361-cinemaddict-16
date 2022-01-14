import FilmListPresenter from './presenter/films-list-presenter';
import { getFilms } from './mock/films.js';
import { getProfile } from './mock/profile.js';
import { renderPosition, renderElement } from './render.js';
import UserTitleView from './view/user-title-view.js';


const NUMBER_OF_CARD_DISPLAYS = 22;
const NUMBER_OF_USERS = 5;


const dataCards = Array.from({length: NUMBER_OF_CARD_DISPLAYS}, getFilms);
const dataUserProfile = Array.from({length: NUMBER_OF_USERS}, getProfile);


const siteMainElement = document.querySelector('.main');
const headerProfileElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const filmPresenter = new FilmListPresenter(siteMainElement);

renderElement(headerProfileElement, new UserTitleView(dataUserProfile[0]), renderPosition.BEFOREEND);
renderElement(footerStatisticsElement, `${dataCards.length} movies inside`, renderPosition.BEFOREEND);


filmPresenter.init(dataCards);
