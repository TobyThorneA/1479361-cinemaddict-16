import { createElement } from '../render.js';

const footerStatisticsTemplate = (values) => (
  `<section class="footer__statistics">
    ${values.numberOfFilms}
  </section>`);

export default class FooterStatisticsView {
  #element = null;
  #value = null;

  constructor(value) {
    this.#value = value;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return footerStatisticsTemplate(this.#value);
  }

  removeElement() {
    this.#element = null;
  }
}
