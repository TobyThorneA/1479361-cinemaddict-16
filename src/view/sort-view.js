import AbstractParentClass from './abstract-parent-class-view';

const createSort = () => `
<ul class="sort">
    <li><a href="#" class="sort__button3 sort__button--active"> Sort by default </a></li>
    <li><a href="#" class="sort__button2"> Sort by date </a></li>
    <li><a href="#" class="sort__button1"> Sort by rating </a></li>
  </ul>
`;

export default class SortView extends AbstractParentClass {

  get template() {
    return createSort();
  }

  onClickSortRating = (callbackk) => {

    this._callback.clickSortRating = callbackk;

    this.element.querySelector('.sort__button1').addEventListener('click', this.#clickHandlerSortRating);

  }

  onClickSortDate = (callbackk) => {

    this._callback.clickSortDate = callbackk;

    this.element.querySelector('.sort__button2').addEventListener('click', this.#clickHandlerSortDate);

  }

  onClickSortDefault = (callbackk) => {

    this._callback.clickSortDefault = callbackk;

    this.element.querySelector('.sort__button3').addEventListener('click', this.#clickHandlerSortDefault);

  }

  #clickHandlerSortRating = (evt) => {
    evt.preventDefault();

    this._callback.clickSortRating();

  }

  #clickHandlerSortDate = (evt) => {
    evt.preventDefault();

    this._callback.clickSortDate();

  }

  #clickHandlerSortDefault = (evt) => {
    evt.preventDefault();

    this._callback.clickSortDefault();

  }

}
