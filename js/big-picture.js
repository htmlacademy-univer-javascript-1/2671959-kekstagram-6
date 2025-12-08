import { isEscapeKey } from './util.js';
import { COMMENTS_PER_STEP } from './consts.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = bigPictureElement.querySelector('.social__comments');

let currentComments = [];
let commentsShown = 0;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const pictureElement = document.createElement('img');
  pictureElement.classList.add('social__picture');
  pictureElement.src = comment.avatar;
  pictureElement.alt = comment.name;
  pictureElement.width = 35;
  pictureElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(pictureElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderComments = () => {
  const commentsToShow = Math.min(commentsShown + COMMENTS_PER_STEP, currentComments.length);

  if (commentsShown === 0) {
    commentsListElement.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();
  for (let i = commentsShown; i < commentsToShow; i++) {
    const commentElement = createCommentElement(currentComments[i]);
    fragment.appendChild(commentElement);
  }

  commentsListElement.appendChild(fragment);

  const commentsCountText = `<span class="social__comment-shown-count">${commentsToShow}</span> из <span class="social__comment-total-count comments-count">${currentComments.length}</span> комментариев`;
  commentsCountElement.innerHTML = commentsCountText;

  commentsLoaderElement.classList.toggle('hidden', commentsToShow >= currentComments.length);

  commentsShown = commentsToShow;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const resetComments = () => {
  commentsShown = 0;
  currentComments = [];
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetComments();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    document.removeEventListener('keydown', onDocumentKeydown);
    closeBigPicture();
  }
};

const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPicture = (photoData) => {
  resetComments();

  bigPictureElement.querySelector('.big-picture__img img').src = photoData.url;
  bigPictureElement.querySelector('.likes-count').textContent = photoData.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photoData.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photoData.description;

  commentsCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  currentComments = photoData.comments;
  renderComments();

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButtonElement.addEventListener('click', onCloseBigPictureClick);

export { openBigPicture };
