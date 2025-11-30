import { SERVER_URL } from './consts.js';

const fetchPhotos = () => fetch(`${SERVER_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии. Попробуйте обновить страницу');
    }
    return response.json();
  });

const uploadPhoto = (formData) => fetch(`${SERVER_URL}/`, {
  method: 'POST',
  body: formData
}).then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
});

export { fetchPhotos, uploadPhoto };
