
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const dataTimeInputElem = document.querySelector('#datetime-picker');
const dataStartButton = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');


let finishTimeCount = 0;

let countDown = null;

let difference = 0;

updateCountValue();

flatpickr(dataTimeInputElem, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
 
    finishTimeCount = selectedDates[0].getTime();

    dataStartButton.disabled = false;
 
    if (finishTimeCount < Date.now()) {
      dataStartButton.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    }
  },
});


dataStartButton.addEventListener('click', onStartCouter);


function onStartCouter() {
  countDown = setInterval(updateCountValue, 1000);
  dataStartButton.setAttribute('disabled', true);
  Notify.success('Відлік розпочався!');
}


function updateCountValue() {
  const nowTime = new Date().getTime();
  difference = finishTimeCount - nowTime;

  if (difference < 0) {
    dataStartButton.setAttribute('disabled', true);
    clearInterval(countDown);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(difference);

  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);
 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}