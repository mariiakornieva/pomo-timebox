import './style.css';

const FOCUS_TIMEOUT_MIN = 1;
const REST_TIMEOUT_MIN = 10;

const FOCUS = 'Focus';
const REST = 'Rest';

const sound = new Audio('../assets/audio/stop-focus-sound.flac');

const timer = document.getElementById('focus-timer');
const label = document.getElementById('label');
const startStopButton = document.getElementById('start-stop-btn');
const focusRestButton = document.getElementById('focus-rest-btn');

let timerId: NodeJS.Timer;

type Time = {
  min: number;
  sec: number;
};

const onTimeout = () => {
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

  if (min + sec === 0) {
    clearInterval(timerId);
    if (startStopButton) {
      startStopButton.textContent = 'Start';
    }

    sound.play();

    return;
  }

  const newTime = decrementTimeout({ min, sec });
  timer.textContent =
    `${newTime.min}`.padStart(2, '0') + ':' + `${newTime.sec}`.padStart(2, '0');
};

export const decrementTimeout = (time: Time): Time => {
  if (time.sec === 0) {
    return {
      min: time.min - 1,
      sec: 59,
    };
  }

  return {
    min: time.min,
    sec: time.sec - 1,
  };
};

const onStartStop = (event: Event) => {
  if (!startStopButton) {
    return;
  }

  if (startStopButton.textContent === 'Stop') {
    clearInterval(timerId);
    startStopButton.textContent = 'Start';
    return;
  }

  startStopButton.textContent = 'Stop';
  timerId = setInterval(onTimeout, 1000);
};

const onFocusRest = (event: Event) => {
  if (!focusRestButton) {
    return;
  }

  if (!startStopButton) {
    return;
  }

  sound.pause();
  sound.currentTime = 0;

  clearInterval(timerId);
  startStopButton.textContent = 'Start';

  document.body.classList.toggle('bg-red-200');
  document.body.classList.toggle('bg-blue-200');

  if (!timer) {
    return;
  }

  timer.classList.toggle('bg-red-100');
  timer.classList.toggle('bg-blue-100');
  timer.classList.toggle('text-red-800');
  timer.classList.toggle('text-blue-800');
  timer.classList.add('rounded-full');
  timer.classList.add('shadow-inner');

  if (focusRestButton.textContent === REST) {
    timer.textContent = `${REST_TIMEOUT_MIN}`.padStart(2, '0') + ':00';
    onRest();
  } else {
    timer.textContent = `${FOCUS_TIMEOUT_MIN}`.padStart(2, '0') + ':00';
    onFocus();
  }
};

const onRest = () => {
  if (label) {
    label.textContent = REST;
    label.classList.toggle('text-red-800');
    label.classList.toggle('text-blue-800');
  }

  if (focusRestButton) {
    focusRestButton.textContent = FOCUS;
  }
};

const onFocus = () => {
  if (label) {
    label.textContent = FOCUS;
    label.classList.toggle('text-red-800');
    label.classList.toggle('text-blue-800');
  }

  if (focusRestButton) {
    focusRestButton.textContent = REST;
  }
};

startStopButton?.addEventListener('click', onStartStop);
focusRestButton?.addEventListener('click', onFocusRest);
