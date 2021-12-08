import { createElement } from '../render.js';

const createCommentsList = (values) => (

  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${values.emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${values.commentsClass}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${values.author}</span>
                <span class="film-details__comment-day">${values.commentsTime}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`);

export default class CommentsListView {
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
    return createCommentsList(this.#value);
  }

  removeElement() {
    this.#element = null;
  }
}
