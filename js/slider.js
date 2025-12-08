import { SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from './consts.js';

const scaleControlElement = document.querySelector('.scale__control--value');
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

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
  scaleControlElement.value = `${value}%`;
  scaleControlElement.setAttribute('value', `${value}%`);
  imagePreviewElement.style.transform = `scale(${value / 100})`;
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
  noUiSlider.create(effectLevelSliderElement, {
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

  effectLevelSliderElement.noUiSlider.updateOptions(effectConfig.options);
  effectLevelSliderElement.noUiSlider.set(effectConfig.options.start);
};

const showSlider = () => {
  effectLevelElement.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevelElement.classList.add('hidden');
};

const updateEffect = (effect, value) => {
  const effectConfig = effects[effect];

  if (effect === 'none') {
    imagePreviewElement.style.filter = '';
    hideSlider();
  } else {
    imagePreviewElement.style.filter = `${effectConfig.filter}(${value}${effectConfig.unit})`;
    showSlider();
  }

  effectLevelValueElement.setAttribute('value', value);
  effectLevelValueElement.value = value;
};

const onSliderUpdate = () => {
  const value = effectLevelSliderElement.noUiSlider.get();
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
  if (!effectLevelSliderElement.noUiSlider) {
    createSlider();
  }

  updateScale(SCALE_DEFAULT);
  scaleSmallerElement.addEventListener('click', onScaleSmallerClick);
  scaleBiggerElement.addEventListener('click', onScaleBiggerClick);
  effectLevelSliderElement.noUiSlider.on('update', onSliderUpdate);
  effectsListElement.addEventListener('change', onEffectChange);

  hideSlider();
  currentEffect = 'none';
  updateEffect(currentEffect, effects.none.options.start);
};

const resetSlider = () => {
  updateScale(SCALE_DEFAULT);
  currentEffect = 'none';

  if (effectLevelSliderElement.noUiSlider) {
    effectLevelSliderElement.noUiSlider.updateOptions(effects.none.options);
    effectLevelSliderElement.noUiSlider.set(effects.none.options.start);
  }

  updateEffect(currentEffect, effects.none.options.start);
  hideSlider();

  scaleSmallerElement.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerElement.removeEventListener('click', onScaleBiggerClick);
  effectsListElement.removeEventListener('change', onEffectChange);

  if (effectLevelSliderElement.noUiSlider) {
    effectLevelSliderElement.noUiSlider.off('update');
  }
};

export { initSlider, resetSlider };
