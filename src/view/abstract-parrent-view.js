import {createElement} from '../utils/render.js';

const SHAKE_ANIMATION_TIMEOUT = 600;
const SECOND = 1000;

export default class abstractParrentView {
  #element = null;
  _callback = {};
  constructor() {
    if (new.target === abstractParrentView) {throw new Error('Can\'t instantiate abstractParrentView, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }

  shake(callback) {
    this.element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SECOND}s`;
    setTimeout(() => {
      this.element.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
