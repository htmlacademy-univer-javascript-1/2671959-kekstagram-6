import { isEscapeKey } from './util.js';

const MAX_HASHTAG_SYMBOLS = 20;
const MAX_COMMENT_SYMBOLS = 140;
const MAX_HASHTAGS = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
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

  const rules = [
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
        array.indexOf(hashtag.toLowerCase(), index + 1) > -1
      ),
      error: 'Хэш-теги не должны повторяться'
    }
  ];

  return rules.every((rule) => {
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
  textHashtags,
  validateHashtags,
  getErrorMessage,
  2,
  false
);

pristine.addValidator(
  textDescription,
  validateComment,
  getErrorMessage,
  1,
  false
);

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

imgUploadInput.addEventListener('change', () => {
  openForm();
});

imgUploadCancel.addEventListener('click', () => {
  closeForm();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

document.addEventListener('keydown', onDocumentKeydown);

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const updateSubmitButtonState = () => {
  imgUploadSubmit.disabled = !pristine.validate();
};

textHashtags.addEventListener('input', updateSubmitButtonState);
textDescription.addEventListener('input', updateSubmitButtonState);

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    pristine.validate();
  }
});

updateSubmitButtonState();

export { openForm, closeForm };
