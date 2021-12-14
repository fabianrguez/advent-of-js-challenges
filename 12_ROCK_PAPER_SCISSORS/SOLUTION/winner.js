const playAgainButton = document.querySelector('.play-again');
const yourPick = document.querySelector('.your-pick');
const computerPick = document.querySelector('.computer-pick');

const PICKS = ['rock', 'paper', 'scissors'];

function playAgain() {
  location.href = './index.html';
}

function getUrlParams() {
  const queryString = decodeURIComponent(location.search).substring(1).split('&');
  return queryString
    .map((param) => {
      const [key, value] = param.split('=');
      return {
        [key]: value,
      };
    })
    .reduce((acc, param) => ({ ...acc, ...param }), {});
}

function capitalize(string) {
  const [first, ...rest] = string;
  return [first.toUpperCase(), ...rest].join('');
}

function loadYourPick(pick) {
  const yourPickImage = yourPick.querySelector('img');
  yourPickImage.alt = `${capitalize(pick)}`;
  yourPickImage.src = `images/${pick}.png`;
}

function randomPick() {
  const randomNumber = Math.floor(Math.random() * PICKS.length);
  return PICKS[randomNumber];
}

function loadComputerPick() {
  const pick = randomPick();
  const computerPickImage = computerPick.querySelector('img');
  computerPickImage.alt = `${capitalize(pick)}`;
  computerPickImage.src = `images/${pick}.png`;

  return pick;
}

function checkWinner({ userPick, computerPick }) {
  if (
    (userPick === 'paper' && computerPick === 'rock') ||
    (userPick === 'scissors' && computerPick === 'paper') ||
    (userPick === 'rock' && computerPick === 'scissors')
  ) {
    document.body.classList.add('you-win');
  } else if (userPick === computerPick) {

    document.body.classList.add('tie');
  } else {
    document.body.classList.add('computer-wins');
  }
}

function init() {
  const { pick } = getUrlParams();
  if (pick) {
    const computerPick = loadComputerPick();
    loadYourPick(pick);
    checkWinner({ userPick: pick, computerPick });
  }
}

document.addEventListener('DOMContentLoaded', init);
playAgainButton.addEventListener('click', playAgain);
