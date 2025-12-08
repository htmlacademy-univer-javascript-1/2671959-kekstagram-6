import { isEscapeKey } from './util.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement) {
    messageElement.remove();
  }
  document.removeEventListener('keydown', onMessageKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
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
  bodyElement.append(messageElement);

  document.addEventListener('keydown', onMessageKeydown);
  bodyElement.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successTemplateElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplateElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
