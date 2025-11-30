import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement) {
    messageElement.remove();
  }
  document.removeEventListener('keydown', onMessageKeydown);
  body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function onMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (template, closeButtonClass) => {
  const messageElement = template.cloneNode(true);
  body.append(messageElement);

  document.addEventListener('keydown', onMessageKeydown);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
