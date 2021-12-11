import { generateRandomValue } from '../utils.js';

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

export const getProfile = () => (
  {
    rating: generateRandomValue(userTitles),
    bitmap: generateRandomValue(bitmaps),
  }
);
