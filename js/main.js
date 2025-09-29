const AVATAR_AMT = 6;
const PICTURES_AMT = 25;
const COMMENTS_AMT = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const NAMES = [
  'Дмитрий',
  'Павел',
  'Артём',
  'Никита',
  'Егор',
  'Дарья',
  'Ольга',
  'Наталья'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Поймал момент, который хочется сохранить навсегда.',
  'Солнце в душе и ветер в волосах.',
  'Иногда нужно просто остановиться и посмотреть, как прекрасен мир.',
  'Эту атмосферу не передать словами, только тишиной.',
  'Маленькие радости — мой главный девиз по жизни.',
  'Говорят, счастье в мелочах, и я с этим полностью согласен',
  'Пятница, наконец-то! Планы на выходные?',
  'Нашла свой кусочек счастья там, где его не ждала.',
  'Это та самая магия, ради которой всё и затевалось.',
  'Настроение: сиять изнутри.',
  'Включила режим «наслаждаться моментом».',
  'Просто я и мой кофе против всего мира.'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

generatePhotos();
