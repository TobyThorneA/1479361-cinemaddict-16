import { getRandomInteger } from '../utils.js';

const titles = [
  'made for each other',
  'popeye meets sinbad',
  'sagebrush trail',
  'santa claus conquers the martians',
  'the dance of the life',
  'the great flamarion',
  'the man with the golden arm',
];

const originalTitles = [
  'original: made for each other',
  'original: popeye meets sinbad',
  'original: sagebrush trail',
  'original: santa claus conquers the martians',
  'original: the dance of the life',
  'original: the great flamarion',
  'original: the man with the golden arm',
];

const hours = [
  '1h 55m',
  '1h 34m',
  '3h 34m',
  '2h 14m',
  '2h 12m',
  '1h 59m',
  '1h 43m',
  '2h 34m',
];

const genres = [
  'comedy',
  'horrors',
  'drama',
  'melodrama',
  'action movie',
  'historical',
  'adventure',
  'mysticism'
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const imgs = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const ageRaitings = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];

const directos = [
  'Nikola Anelka',
  'Zinedin Zidane',
  'Cristiano Ronaldo dos Santos Aveiro',
  'Lev Yashin',
  'Luish Figo',
  'Pierre-Emerick Aubameyang',
];

const writers = [
  'Серый, Колька и Витек',
  'Sola, bola, mola',
  'artificial intelligence',
  'garrilaz',
  'rammstein',
];
const actors = [
  'DanBalan, Igor and What a fuck is this?!?!?!',
  'lisa, simon , flora',
  'Slot, table',
  'bloom, Dasha, sun, pizza',
  'Aleksandr, Sonya, Robert',
];

const reliases = [
  '30 marth 1954',
  '12 marth 2005',
  '22 marth 1939',
  '1 marth 2021',
  '8 marth 2001',
  '7 marth 1990',
  '14 marth 1635',
];
const countries = [
  'USA',
  'Canada',
  'England',
  'USSR',
  'Russia',
  'Ukraine',
];
const imagesEmojies = [
  './images/emoji/angry.png',
  './images/emoji/puke.png',
  './images/emoji/sleeping.png',
  './images/emoji/smile.png',
];
const authors = [
  'Vasya',
  'Tanya',
  'Tolya',
  'Kate',
  'Simon',
  'Slon',
  'Dwarf',
];

const days = [
  '5 hours ago',
  'today',
  '2 days ago',
  '1 hour ago',
  '7 days ago',
];
const raitings = [
  'novice',
  'fun',
  'movie buf',
];

const bitmaps = [
  './images/bitmap.png',
  './images/bitmap@2x.png',
  './images/bitmap@2x.png',
];

const commentsClass = [
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">крутой фильм виуууу</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Вася</span>
                <span class="film-details__comment-day">3 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`,
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">Good FIIILMS</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">VADIM</span>
                <span class="film-details__comment-day">1 hour ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`,
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">Шикарно</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Миха</span>
                <span class="film-details__comment-day">today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`,
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">Very nice</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Gora</span>
                <span class="film-details__comment-day">7 yers ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`,
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-puke">
            </span>
            <div>
              <p class="film-details__comment-text">GO GO GO</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Vazasdart</span>
                <span class="film-details__comment-day">4 hours ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`,
  `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-angry">
            </span>
            <div>
              <p class="film-details__comment-text">FARAAAAAAAAA!!!</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Artem</span>
                <span class="film-details__comment-day">12 hours ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`

];

const generateRandomValue = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const generateRandomDescriptions = (array) => {
  const random = getRandomInteger(1,5);
  const art = [];
  for(let i = 0; i < random; i++){
    const rand = Math.floor(Math.random()*array.length);
    const rValue = array[rand];
    art.push(rValue);
  }
  return art;
};

export const generateData = () => (
  {
    title: generateRandomValue(titles),
    originalTitle: generateRandomValue(originalTitles),
    rating: getRandomInteger(1, 10),
    year: getRandomInteger(1895, 2021),
    duration: generateRandomValue(hours),
    commentsClass: generateRandomDescriptions(commentsClass),
    genre: generateRandomValue(genres),
    genres: {
      details0: generateRandomValue(genres),
      details1: generateRandomValue(genres),
      details2: generateRandomValue(genres),
    },
    description: generateRandomDescriptions(descriptions),
    comments: getRandomInteger(1, 100),
    images: generateRandomValue(imgs),
    age: generateRandomValue(ageRaitings),
    director: generateRandomValue(directos),
    writers: generateRandomValue(writers),
    actors: generateRandomValue(actors),
    release: generateRandomValue(reliases),
    country: generateRandomValue(countries),
    raiting: generateRandomValue(raitings),
    bitmap: generateRandomValue(bitmaps),
    emoji:{
      emoji0: generateRandomValue(imagesEmojies),
      emoji1: generateRandomValue(imagesEmojies),
      emoji2: generateRandomValue(imagesEmojies),
      emoji3: generateRandomValue(imagesEmojies),
    },
    author: {
      author0: generateRandomValue(authors),
      author1: generateRandomValue(authors),
      author2: generateRandomValue(authors),
      author3: generateRandomValue(authors)
    },
    day: {
      day0: generateRandomValue(days),
      day1: generateRandomValue(days),
      day2: generateRandomValue(days),
      day3: generateRandomValue(days),
    },
    watchList: getRandomInteger(10, 300),
    history: getRandomInteger(10, 300),
    favorites: getRandomInteger(10, 300),
    numberOfFilms: getRandomInteger(1000, 30000),

    isHistory: false,
    isFavorite: false,
  }
);
