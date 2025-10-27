const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const { url, comments, likes, description } = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments ? comments.length : 0;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (objects) => {
  for (let i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPhoto(objects));
  }

  pictures.appendChild(fragment);
};

export { renderPhotos };
