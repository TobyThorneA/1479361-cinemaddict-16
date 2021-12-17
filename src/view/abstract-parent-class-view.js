import { createElement } from '../render.js';

export default class AbstractParentClass {
  #element = null;
  _callback = {};

  constructor () {
    if(new.target === AbstractParentClass) {

      throw new Error('нельзя создать экземпляр абстрактнго класса');

    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {

    throw new Error('Не реалезован абстрактный метод: get template');
  }


  removeElement() {
    this.#element = null;
  }
}


