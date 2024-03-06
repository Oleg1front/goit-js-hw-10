import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createObj(delay, value, selectedState) {
  return {
    delay: delay,
    value: value,
    shouldResolve: selectedState,
  };
}

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const inputDelay = document.querySelector('[name="delay"]');
  const selectedState = document.querySelector('input[name="state"]:checked');

  const params = createObj(
    parseInt(inputDelay.value),
    parseInt(inputDelay.value),
    String(selectedState.value)
  );
  const createPromise = params => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params.shouldResolve.toLowerCase() === 'fulfilled') {
          resolve(params.value);
        } else {
          reject(params.value);
        }
      }, params.delay);
    });
  };
  createPromise(params)
    .then(result => {
      console.log(`✅ Fulfilled promise in ${result} ms`);
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result} ms`,
      });
    })
    .catch(error => {
      console.error(`❌ Rejected promise in ${error}ms`);
      iziToast.error({
        title: 'Помилка',
        message: `❌ Rejected promise in ${error}ms`,
      });
    });
  form.reset();
});
