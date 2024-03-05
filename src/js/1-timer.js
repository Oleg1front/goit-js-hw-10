import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const input = document.querySelector('#datetime-picker');

// оголошуємо змінну в якій зберігається вибрана в календарі дата
let userSelectedDate;

// Об`єкт налаштувань flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // перевіряємо змінну на валідність
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        title: 'Alert',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: 'red',
      });
      startBtn.setAttribute('disabled', 'disabled');
    } else {
      startBtn.removeAttribute('disabled');
      // записуємо обрану дату в змінну
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  let diffBetweenDate = userSelectedDate.getTime() - Date.now();

  if (diffBetweenDate <= 0) {
    return;
  }

  countdown();

  startBtn.setAttribute('disabled', 'disabled');
  input.setAttribute('disabled', 'disabled');

  function countdown() {
    setInterval(() => {
      const timeLeft = convertMs(diffBetweenDate);

      if (diffBetweenDate <= 0) {
        startBtn.removeAttribute('disabled');
        input.removeAttribute('disabled');
        return;
      }
      const days = document.querySelector('.value[data-days]');
      const hours = document.querySelector('.value[data-hours]');
      const minutes = document.querySelector('.value[data-minutes]');
      const seconds = document.querySelector('.value[data-seconds]');

      
      days.innerHTML = addZero(timeLeft.days);
      hours.innerHTML = addZero(timeLeft.hours);
      minutes.innerHTML = addZero(timeLeft.minutes);
      seconds.innerHTML = addZero(timeLeft.seconds);
      diffBetweenDate -= 1000;
    }, 1000);
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(str) {
 return String(str).padStart(2, '0');
}
