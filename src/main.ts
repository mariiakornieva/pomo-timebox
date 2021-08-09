import * as _ from 'lodash';
import './style.css';

const SEC_IN_MIN = 60;
const FOCUS_TIMEOUT = 50 * SEC_IN_MIN;
const REST_TIMEOUT = 10 * SEC_IN_MIN;

const timer = document.getElementById('focus-timer');
const startStopButton = document.getElementById('start-stop-btn');
// const focusRestButton = document.getElementById();

const isInProgress = false;
let timerId: NodeJS.Timer;

type Time = {
  min: number;
  sec: number;
};

const decrementTimeout = (time: Time): Time => {
  if (time.sec === 0) {
    return {
      min: time.min - 1,
      sec: 99,
    };
  }

  return {
    min: time.min,
    sec: time.sec - 1,
  };
};

const onStartStop = (event: Event) => {
  if (isInProgress) {
    clearInterval(timerId);

    return;
  }

  timerId = setInterval(() => {
    if (!timer) {
      return;
    }

    const currentTime = timer.textContent;

    if (!currentTime) {
      clearInterval(timerId);
      return;
    }

    const min = parseInt(currentTime);
    const sec = Number(currentTime.slice(currentTime.indexOf(':') + 1));

    if (min + sec <= 1) {
      clearInterval(timerId);
      return;
    }

    const newTime = decrementTimeout({ min, sec });
    timer.textContent = `${newTime.min}:${newTime.sec}`;
  }, 1000);
};

startStopButton?.addEventListener('click', onStartStop);
