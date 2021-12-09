import { getRandomInteger, generateRandomValue, generateRandomStrings } from '../utils.js';

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
  'made for each other',
  'popeye meets sinbad',
  'sagebrush trail',
  'santa claus conquers the martians',
  'the dance of the life',
  'the great flamarion',
  'the man with the golden arm',
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

const userTitles = [
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
  'Good film',
  'Nice',
  'asdasdas',
  'adasdbfnfnfgnfgnfgnfgnfg',
  'fgnfgnfgnfnegerryjykuldgsdvsdv',
  'l.jkl.,jhmdfbsefwegr',
  'sgdfgh,jk;.kl/rtjetjrt',
  'asegdhfjgkluyhlgmfg',
  'dhfgjfgjfgjktyiktyktyky',
  'dgdfhdfjf',
  'dghdfhdfhcvnvbmb,kluil',
  'sdgerrtuyr6utyiuyklyuu',
  'jhryjtyktykrdhdbhdfhdfh',
  'fhfgjtukilui.hj,fghfgh',
  'fhrjtykuyluytgktykt',

];
const commentsTime = [
  '2 hours ago',
  'now',
  '3 minuts ago',
  '5 days ago',
  '14 days ago',
  '1 year ago',
];
export const generateDataUserProfile =() => (
  {
    watchList: getRandomInteger(10, 300),
    history: getRandomInteger(10, 300),
    favorites: getRandomInteger(10, 300),
    userTitle: generateRandomValue(userTitles),
    bitmap: generateRandomValue(bitmaps),
  }
);

export const generateDataCards = () => (
  {
    title: generateRandomValue(titles),
    originalTitle: generateRandomValue(originalTitles),
    rating: getRandomInteger(1, 10),
    year: getRandomInteger(1895, 2021),
    duration: generateRandomValue(hours),
    commentsClass: generateRandomStrings(commentsClass),
    genre: generateRandomValue(genres),
    commentsTime: generateRandomValue(commentsTime),
    genres: {
      details0: generateRandomValue(genres),
      details1: generateRandomValue(genres),
      details2: generateRandomValue(genres),
    },
    description: generateRandomStrings(descriptions),
    comments: getRandomInteger(1, 100),
    images: generateRandomValue(imgs),
    age: generateRandomValue(ageRaitings),
    director: generateRandomValue(directos),
    writers: generateRandomValue(writers),
    actors: generateRandomValue(actors),
    release: generateRandomValue(reliases),
    country: generateRandomValue(countries),
    emoji:generateRandomValue(imagesEmojies),
    author:generateRandomValue(authors),
    numberOfFilms: getRandomInteger(1000, 30000),

    isHistory: false,
    isFavorite: false,
  }
);
