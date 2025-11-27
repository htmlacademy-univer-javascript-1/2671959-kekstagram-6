import { getRandomArrayElement } from './util.js';
import { getRandomInteger } from './util.js';
import {AVATAR_AMT, PICTURES_AMT, COMMENTS_AMT, MIN_LIKES, MAX_LIKES, NAMES, MESSAGES, DESCRIPTIONS} from './consts.js';

let lastId = 0;

const generateId = () => {
  lastId++;
  return lastId;
};

function getRandomMessage() {
  const numberOfSentences = Math.floor(Math.random() * 2) + 1;
  const selectedMessages = [];

  for (let i = 0; i < numberOfSentences; i++) {
    const randomMessage = getRandomArrayElement(MESSAGES);
    selectedMessages.push(randomMessage);
  }

  return selectedMessages.join(' ');
}

const generateCommentId = generateId;

const generateComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_AMT)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const generatePhotos = () => {
  const photos = [];

  for (let i = 1; i <= PICTURES_AMT; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: Array.from(
        { length: getRandomInteger(0, COMMENTS_AMT) },
        generateComments,
      )
    });
  }

  return photos;
};

export { generatePhotos };
