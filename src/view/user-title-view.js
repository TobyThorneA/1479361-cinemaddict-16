import { createElement } from '../render.js';

const createUserTitleTemplate = (values) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${values.raiting}</p>
      <img class="profile__avatar" src="${values.bitmap}" alt="Avatar" width="35" height="35">
    </section>`);

export default class UserTitleView{
  #element = null;
  #value = null;

  constructor(value){
    this.#value = value;
  }

  get element () {
    if(!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;

  }

  get template(){
    return createUserTitleTemplate(this.#value);
  }

  removeElement() {
    this.#element = null;
  }

}

