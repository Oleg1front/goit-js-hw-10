import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
// функція ствоерння об`єкта для прередачі в проміс
function createObj(delay, value, selectedState) {
  return {
    delay: delay,
    value: value,
    shouldResolve: selectedState,
  };
}
  // Функція створення проміса

const createPromise = ({ delay, value, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve.toLowerCase() === 'fulfilled') {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};

form.addEventListener('submit', evt => {
  
    // Прибираємо перезавантаження сторінки
  evt.preventDefault();
  
    //   Отримуємо доступ до інпутів
  const inputDelay = document.querySelector('[name="delay"]');
  const selectedState = document.querySelector('input[name="state"]:checked');
  
    //   Створюємо об`єкт параметрів для проміса зі значеннями інпутів
  const params = createObj(
    parseInt(inputDelay.value),
    parseInt(inputDelay.value),
    String(selectedState.value)
  );

  // Обробляємо наш проміс і виводимо відповідні нотифікації
  createPromise(params)
    //   Проміс виконався успішно
      .then(result => {
        const message = `✅ Fulfilled promise in ${result} ms`;
      console.log(message);
      iziToast.success({
        title: 'Success',
          message: message,
      });
    })
    // просім був відхилений
      .catch(error => {
        const message = `❌ Rejected promise in ${error}ms`
      console.error(message);
      iziToast.error({
        title: 'Помилка',
        message: message,
      });
    });
  // Очищуємо форму після сабміту
  form.reset();
});
