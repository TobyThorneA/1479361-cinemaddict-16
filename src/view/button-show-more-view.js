import { createElement } from '../render.js';

const createButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonView {
  #element = null;

  get element() {
    if(!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createButtonTemplate();
  }

  removeElement(){
    this.#element = null;
  }
}
