
const bodEltm = document.querySelector('body');
const startBatton = document.querySelector('[data-start]');
const stopBatton = document.querySelector('[data-stop]');

let timeId = null;


stopBatton.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


startBatton.addEventListener('click', onClickstartBatton);
stopBatton.addEventListener('click', onClickstopBatton);


function onClickstartBatton() {
  timeId = setInterval(() => {
    
    const randomColor = getRandomHexColor();

    bodEltm.style.backgroundColor = randomColor;
  }, 1000);
  stopBatton.removeAttribute('disabled');
  startBatton.setAttribute('disabled', true);
}

function onClickstopBatton() {
  clearInterval(timeId);
  stopBatton.setAttribute('disabled', true);
  startBatton.removeAttribute('disabled');
}
