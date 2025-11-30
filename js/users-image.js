import { FILE_TYPES } from './consts.js';

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const initUserImage = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const imageUrl = URL.createObjectURL(file);

      preview.src = imageUrl;

      effectsPreviews.forEach((effectPreview) => {
        effectPreview.style.backgroundImage = `url(${imageUrl})`;
      });
    }
  });
};

export { initUserImage };
