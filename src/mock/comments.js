import { generateRandomValue, createRandomValues } from '../utils.js';

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

export const getComments = () => (
  {
    commentsClass: createRandomValues(commentsClass),
    commentsTime: generateRandomValue(commentsTime),
    emoji:generateRandomValue(imagesEmojies),
    author:generateRandomValue(authors),
  }
);
