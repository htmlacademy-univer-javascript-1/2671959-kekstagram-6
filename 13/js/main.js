import { fetchPhotos } from './fetch.js';
import { showAlert } from './util.js';
import { renderPhotos } from './photos.js';
import { initSorting } from './sorting.js';
import './form.js';

fetchPhotos()
  .then((photos) => {
    renderPhotos(photos);
    initSorting(photos);
  })
  .catch((error) => {
    showAlert(error.message);
  });
