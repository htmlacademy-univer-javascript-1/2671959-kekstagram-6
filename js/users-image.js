import { FILE_TYPES } from './consts.js';

const fileChooserElement = document.querySelector('.img-upload__input');
const previewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewsElements = document.querySelectorAll('.effects__preview');

const initUserImage = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const imageUrl = URL.createObjectURL(file);

      previewElement.src = imageUrl;

      effectsPreviewsElements.forEach((effectPreviewElement) => {
        effectPreviewElement.style.backgroundImage = `url(${imageUrl})`;
      });
    }
  });
};

export { initUserImage };
