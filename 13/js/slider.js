import { SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from './consts.js';

const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentScale = SCALE_DEFAULT;
let currentEffect = 'none';

const effects = {
  none: {
    filter: '',
    unit: '',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    }
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    }
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    }
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    }
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    }
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    }
  }
};

const updateScale = (value) => {
  currentScale = value;
  scaleControl.value = `${value}%`;
  scaleControl.setAttribute('value', `${value}%`);
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const newValue = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newValue);
};

const onScaleBiggerClick = () => {
  const newValue = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newValue);
};

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

const updateSlider = (effect) => {
  const effectConfig = effects[effect];

  effectLevelSlider.noUiSlider.updateOptions(effectConfig.options);
  effectLevelSlider.noUiSlider.set(effectConfig.options.start);
};

const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevel.classList.add('hidden');
};

const updateEffect = (effect, value) => {
  const effectConfig = effects[effect];

  if (effect === 'none') {
    imagePreview.style.filter = '';
    hideSlider();
  } else {
    imagePreview.style.filter = `${effectConfig.filter}(${value}${effectConfig.unit})`;
    showSlider();
  }

  effectLevelValue.setAttribute('value', value);
  effectLevelValue.value = value;
};

const onSliderUpdate = () => {
  const value = effectLevelSlider.noUiSlider.get();
  updateEffect(currentEffect, value);
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    updateSlider(currentEffect);
    updateEffect(currentEffect, effects[currentEffect].options.start);
  }
};

const initSlider = () => {
  updateScale(SCALE_DEFAULT);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);

  createSlider();
  hideSlider();
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  effectsList.addEventListener('change', onEffectChange);

  currentEffect = 'none';
  updateEffect(currentEffect, effects.none.options.start);
};

const resetSlider = () => {
  updateScale(SCALE_DEFAULT);
  currentEffect = 'none';
  updateEffect(currentEffect, effects.none.options.start);
  hideSlider();
};

export { initSlider, resetSlider };
