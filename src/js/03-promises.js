
import Notiflix from 'notiflix';

const formRefer = document.querySelector('.form');
const delayRefer = document.querySelector('[name="delay"]');
const stepRefer = document.querySelector('[name="step"]');
const amountRefer = document.querySelector('[name="amount"]');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
};
const onSubmitInput = Elem => {
  Elem.preventDefault();
  let delay = Number(delayRefer.value);
  const step = Number(stepRefer.value);
  const amount = Number(amountRefer.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => console.log(`Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => console.log(`Rejected promise ${position} in ${delay}ms`));
    delay += step;
  }
};

formRefer.addEventListener('submit', onSubmitInput);