import { debounce } from './util.js';
import { renderPhotos } from './photos.js';
import { RANDOM_PHOTOS_COUNT } from './consts.js';

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filtersContainerElement = document.querySelector('.img-filters');
const filterButtonsElement = filtersContainerElement.querySelectorAll('.img-filters__button');

let currentPhotos = [];
let currentFilter = FilterType.DEFAULT;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const applyFilter = (photos, filterType) => {
  switch (filterType) {
    case FilterType.RANDOM:
      return getRandomPhotos(photos);
    case FilterType.DISCUSSED:
      return photos.slice().sort(sortByComments);
    default:
      return photos;
  }
};

const updatePhotos = debounce((photos) => {
  renderPhotos(photos);
});

const onFilterChange = (evt) => {
  if (!evt.target.matches('.img-filters__button')) {
    return;
  }

  evt.stopPropagation();
  evt.preventDefault();

  const clickedButton = evt.target;
  const newFilter = clickedButton.id.replace('filter-', '');

  if (newFilter === currentFilter) {
    return;
  }

  filterButtonsElement.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  clickedButton.classList.add('img-filters__button--active');

  currentFilter = newFilter;
  const filteredPhotos = applyFilter(currentPhotos, currentFilter);
  updatePhotos(filteredPhotos);
};

const initSorting = (photos) => {
  currentPhotos = photos;
  filtersContainerElement.classList.remove('img-filters--inactive');

  const defaultButton = document.querySelector('#filter-default');
  if (defaultButton) {
    filterButtonsElement.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });
    defaultButton.classList.add('img-filters__button--active');
  }

  currentFilter = 'filter-default';
  filtersContainerElement.removeEventListener('click', onFilterChange);
  filtersContainerElement.addEventListener('click', onFilterChange);
};

export { initSorting };
