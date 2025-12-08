import { isEscapeKey } from './util.js';
import {MAX_HASHTAG_SYMBOLS, MAX_COMMENT_SYMBOLS, MAX_HASHTAGS} from './consts.js';
import { initSlider, resetSlider } from './slider.js';
import { uploadPhoto } from './fetch.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { initUserImage } from './users-image.js';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadFormElement.querySelector('.text__description');
const imgUploadSubmitElement = imgUploadFormElement.querySelector('.img-upload__submit');

const toggleSubmitButton = (isDisabled) => {
  imgUploadSubmitElement.disabled = isDisabled;
  imgUploadSubmitElement.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div',
});

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const validateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.trim();

  if (!inputText) {
    return true;
  }

  const hashtags = inputText.split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    errorMessage = `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`;
    return false;
  }

  const Rules = [
    {
      check: hashtags.some((hashtag) => hashtag === '#'),
      error: 'Хэш-тег не может состоять только из одной решётки'
    },
    {
      check: hashtags.some((hashtag) => hashtag[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: hashtags.some((hashtag) => hashtag.length > MAX_HASHTAG_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_SYMBOLS} символов, включая решётку`
    },
    {
      check: hashtags.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      error: 'Хэш-тег содержит недопустимые символы'
    },
    {
      check: hashtags.some((hashtag, index, array) =>
        array.some((otherHashtag, otherIndex) =>
          otherIndex !== index && otherHashtag.toLowerCase() === hashtag.toLowerCase())),
      error: 'Хэш-теги не должны повторяться'
    }
  ];

  return Rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const validateComment = (value) => {
  errorMessage = '';

  if (!value) {
    return true;
  }

  if (value.length > MAX_COMMENT_SYMBOLS) {
    errorMessage = `Длина комментария не может составлять больше ${MAX_COMMENT_SYMBOLS} символов`;
    return false;
  }

  return true;
};

pristine.addValidator(
  textHashtagsElement,
  validateHashtags,
  getErrorMessage,
  2,
  false
);

pristine.addValidator(
  textDescriptionElement,
  validateComment,
  getErrorMessage,
  1,
  false
);

const onHashtagsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onDescriptionKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const performClose = () => {
  imgUploadFormElement.reset();
  pristine.reset();
  resetSlider();
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  toggleSubmitButton(false);
  imgUploadInputElement.value = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const successMessageElement = document.querySelector('.success');
    const errorMessageElement = document.querySelector('.error');

    if (successMessageElement || errorMessageElement) {
      return;
    }

    evt.preventDefault();

    document.removeEventListener('keydown', onDocumentKeydown);
    textHashtagsElement.removeEventListener('keydown', onHashtagsKeydown);
    textDescriptionElement.removeEventListener('keydown', onDescriptionKeydown);

    performClose();
  }
};

const openForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initSlider();

  document.addEventListener('keydown', onDocumentKeydown);
  textHashtagsElement.addEventListener('keydown', onHashtagsKeydown);
  textDescriptionElement.addEventListener('keydown', onDescriptionKeydown);
};

const closeForm = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtagsElement.removeEventListener('keydown', onHashtagsKeydown);
  textDescriptionElement.removeEventListener('keydown', onDescriptionKeydown);

  performClose();
};

imgUploadInputElement.addEventListener('change', () => {
  openForm();
});

imgUploadCancelElement.addEventListener('click', () => {
  closeForm();
});

const setFormSubmit = () => {
  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    toggleSubmitButton(true);

    const formData = new FormData(evt.target);

    uploadPhoto(formData)
      .then(() => {
        closeForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  });
};

initUserImage();
setFormSubmit();

export { openForm, closeForm };
