import AbstractParentClass from './abstract-parent-class-view';

const createButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonView extends AbstractParentClass {

  get template() {
    return createButtonTemplate();
  }

  onClickButton = (callback) => {

    this._callback.click = callback;

    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  }
}
