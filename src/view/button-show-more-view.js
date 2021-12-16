import AbstractParrentClass from './abstract-parrent-class-view';

const createButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonView extends AbstractParrentClass {

  get template() {
    return createButtonTemplate();
  }

  clickButton = (callback) => {

    this._callback.click = callback;

    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  }
}
