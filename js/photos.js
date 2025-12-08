import { openBigPicture } from './big-picture.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const { url, comments, likes, description, id } = picture;
  const pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments ? comments.length : 0;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.dataset.pictureId = id;

  pictureElement.addEventListener('click', () => {
    openBigPicture(picture);
  });

  return pictureElement;
};

const clearPhotos = () => {
  const existingPhotos = picturesElement.querySelectorAll('.picture');
  existingPhotos.forEach((photoElement) => photoElement.remove());
};

const renderPhotos = (objects) => {
  clearPhotos();

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPhoto(objects[i]));
  }

  picturesElement.appendChild(fragment);
};

export { renderPhotos };
