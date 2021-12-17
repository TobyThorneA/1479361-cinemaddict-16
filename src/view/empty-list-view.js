import AbstractParrentClass from './abstract-parent-class-view';

const emptyListTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`);

export default class EmptyListView extends AbstractParrentClass {

  get template() {
    return emptyListTemplate();
  }
}
