import AbstractParentClass from './abstract-parent-class-view';

const createUserTitleTemplate = (values) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${values.rating}</p>
      <img class="profile__avatar" src="${values.bitmap}" alt="Avatar" width="35" height="35">
    </section>`);

export default class UserTitleView extends AbstractParentClass{
  #value = null;

  constructor(value){
    super();
    this.#value = value;
  }

  get template(){
    return createUserTitleTemplate(this.#value);
  }
}

