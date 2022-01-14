import { getRandomInteger, generateRandomValue, createRandomValues } from '../utils.js';
import { nanoid } from 'nanoid';
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
  ' comedy ',
  ' horrors ',
  ' drama ',
  ' melodrama ',
  ' action movie ',
  ' historical ',
  ' adventure ',
  ' mysticism '
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Expected an assignment or function call and instead saw an expression',
  'Cras aliquet varius magna, non porta ligula feugiat eget.Expected an assignment or function call and instead saw an expression',
  'Fusce tristique felis at fermentum pharetra.Expected an assignment or function call and instead saw an expression',
  'Aliquam id orci ut lectus varius viverra.Поведение стрелочных функций с ключевым словом this отличается от поведения обычных функций с this. Каждая функция в JavaScript определяет свой собственный контекст this, но внутри стрелочных функций значение this то же самое, что и снаружи (стрелочные функции не имеют своего this). Посмотрим на следующий код:',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Поведение стрелочных функций с ключевым словом this отличается от поведения обычных функций с this. Каждая функция в JavaScript определяет свой собственный контекст this, но внутри стрелочных функций значение this то же самое, что и снаружи (стрелочные функции не имеют своего this). Посмотрим на следующий код:',
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

export const getFilms = () => (
  {
    id: nanoid(),
    title: generateRandomValue(titles),
    originalTitle: generateRandomValue(originalTitles),
    rating: getRandomInteger(1, 10),
    year: getRandomInteger(1895, 2021),
    duration: generateRandomValue(hours),
    string: '',
    genre: createRandomValues(genres),
    description: createRandomValues(descriptions),
    comments: getRandomInteger(1, 100),
    images: generateRandomValue(imgs),
    age: generateRandomValue(ageRaitings),
    director: generateRandomValue(directos),
    writers: generateRandomValue(writers),
    actors: generateRandomValue(actors),
    release: generateRandomValue(reliases),
    country: generateRandomValue(countries),
    isWatchList: getRandomInteger(0,1),
    isHistory: getRandomInteger(0,1),
    isFavorite: getRandomInteger(0,1),
  }
);
