const timer = document.querySelector('.timer');
const ring = document.querySelector('.ring');
const minutesElement = timer.querySelector('.minutes input');
const secondsElement = timer.querySelector('.seconds input');
const startButton = timer.querySelector('.start');
const settingButton = timer.querySelector('.settings');
const messageElement = document.querySelector('.message');
const closeMessageButton = messageElement.querySelector('.close');

let interval,
  timerProgress = 0,
  totalTime = 0;

const STATUS = {
  STOPPED: 'STOPPED',
  STARTED: 'STARTED',
};

const TIMER_STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  FINISHED: 'finished',
};

const BUTTON_STATUS_LABEL = {
  STARTED: 'stop',
  STOPPED: 'start',
};

const SETTINGS_STATUS = {
  CONFIGURED: 'configured',
  CONFIGURING: 'configuring',
};

function getTimeConfigured() {
  const { value: minutes } = minutesElement;
  const { value: seconds } = secondsElement;
  return { minutes: +minutes, seconds: +seconds };
}

function updateTimerStatus(status) {
  timer.dataset.status = TIMER_STATUS[status];
  startButton.innerText = BUTTON_STATUS_LABEL[status];
}

function updateRingProgress(progressPercent = 0) {
  const circleSvg = ring.querySelector('svg circle');
  const radius = +circleSvg.getAttribute('r');
  const circunference = 2 * radius * Math.PI;
  const ringProgress = Math.trunc((progressPercent * circunference) / 100);

  ring.style.strokeDashoffset = `${ringProgress}`;
}

function actualTimeInSeconds({ minutes, seconds }) {
  const minutesInSeconds = +minutes * 60;
  return minutesInSeconds + +seconds;
}

function timeInMinutesAndSeconds(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return { minutes, seconds };
}

function calculateProgress({ totalTime, minutes, seconds }) {
  const timeElapsed = totalTime - actualTimeInSeconds({ minutes, seconds });
  return (timeElapsed * 100) / totalTime;
}

function timeLeft({ minutes, seconds }) {
  let secondsLeft = seconds,
    minutesLeft = minutes;
  if (secondsLeft === 0) {
    secondsLeft = 59;
    minutesLeft--;
  } else {
    secondsLeft--;
  }

  return { minutes: minutesLeft, seconds: secondsLeft };
}

function updateTime({ minutes, seconds }) {
  minutesElement.value = minutes < 10 ? `0${minutes}` : minutes;
  secondsElement.value = seconds < 10 ? `0${seconds}` : seconds;
}

function isTimerActive({ minutes, seconds }) {
  return minutes >= 0 && seconds >= 0;
}

function startTimer({ minutes, seconds }) {
  updateTimerStatus(STATUS.STARTED);
  ring.classList.remove('ending');
  messageElement.classList.remove('show');

  let intervalSeconds = +seconds,
    intervalMinutes = +minutes;
  interval = setInterval(() => {
    const _timeLeft = timeLeft({ minutes: intervalMinutes, seconds: intervalSeconds });
    intervalSeconds = _timeLeft.seconds;
    intervalMinutes = _timeLeft.minutes;

    if (isTimerActive({ minutes: intervalMinutes, seconds: intervalSeconds })) {
      timerProgress = calculateProgress({ totalTime, minutes: intervalMinutes, seconds: intervalSeconds });
      updateTime({ minutes: intervalMinutes, seconds: intervalSeconds });
      updateRingProgress(timerProgress);
    } else {
      stopTimer();
      updateRingProgress();
      ring.classList.add('ending');
      timer.dataset.status = TIMER_STATUS.FINISHED;
      messageElement.classList.add('show');
    }
  }, 1000);
}

function stopTimer() {
  updateTimerStatus(STATUS.STOPPED);
  clearInterval(interval);
}

function restartTimer() {
  updateRingProgress();
  const { minutes: prevMinutes, seconds: prevSeconds } = timeInMinutesAndSeconds(totalTime);
  updateTime({ minutes: prevMinutes, seconds: prevSeconds });
  startTimer({ minutes: prevMinutes, seconds: prevSeconds });
}

function handleButtonStart() {
  const { status } = timer.dataset;
  const { minutes, seconds } = getTimeConfigured();

  if (status === TIMER_STATUS.STOPPED) {
    startTimer({ minutes, seconds });
  } else if (status === TIMER_STATUS.FINISHED) {
    restartTimer();
  } else {
    stopTimer();
  }
}

function toggleTimerInput(value) {
  minutesElement.disabled = value;
  secondsElement.disabled = value;
}

function toggleStartButton(value) {
  startButton.disabled = value;
}

function handleSettingsButton() {
  stopTimer();
  const { status } = this.dataset;
  let newStatus = SETTINGS_STATUS.CONFIGURED;
  if (status === SETTINGS_STATUS.CONFIGURED) {
    newStatus = SETTINGS_STATUS.CONFIGURING;
  } else {
    updateRingProgress();
    const { minutes, seconds } = getTimeConfigured();
    updateTime({ minutes, seconds });
    totalTime = actualTimeInSeconds({ minutes, seconds });
  }

  const enable = status === SETTINGS_STATUS.CONFIGURING;
  toggleStartButton(!enable);
  toggleTimerInput(enable);

  this.dataset.status = newStatus;
}

function handleCloseMessage() {
  this.parentElement.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
  const { minutes, seconds } = getTimeConfigured();

  totalTime = actualTimeInSeconds({ minutes, seconds });
});
startButton.addEventListener('click', handleButtonStart);
settingButton.addEventListener('click', handleSettingsButton);
closeMessageButton.addEventListener('click', handleCloseMessage);
