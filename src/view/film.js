import abstractParrentView from './abstract-parrent-view.js';

const createFilmsTemplate = () => (
  '<section class="films"></section>'
);

export default class Film extends abstractParrentView {
  get template(){
    return createFilmsTemplate();
  }
}
