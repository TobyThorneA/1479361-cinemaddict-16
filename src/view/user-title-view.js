import AbstractParrentClass from './abstract-parrent-class-view';

const createUserTitleTemplate = (values) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${values.rating}</p>
      <img class="profile__avatar" src="${values.bitmap}" alt="Avatar" width="35" height="35">
    </section>`);

export default class UserTitleView extends AbstractParrentClass{
  #value = null;

  constructor(value){
    super();
    this.#value = value;
  }

  get template(){
    return createUserTitleTemplate(this.#value);
  }
}

