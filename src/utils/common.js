import FormatTime from './format-time.js';

const NUMBER_MINUTES = 60;
const thoWordChange = (filmComments, word) => filmComments.length === 1 ? word : `${word}s`;

const addClass = (submit, className) => submit ? className : '';

const sortDate = (filmA, filmB) => FormatTime.getDate(filmB.film_info.release.date, 'YYYY') - FormatTime.getDate(filmA.film_info.release.date, 'YYYY');

const sortRating = (filmA, filmB) => filmB.film_info.total_rating - filmA.film_info.total_rating;
const sortComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;
const onEscKeyDown = (evt, cb) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    cb(evt);
  }
};
const getHourFromMin = (mins) => ({
  hours: Math.trunc(mins / NUMBER_MINUTES),
  mins: mins % NUMBER_MINUTES,
});

export {thoWordChange, addClass, sortDate, sortRating, sortComments, onEscKeyDown, getHourFromMin};
