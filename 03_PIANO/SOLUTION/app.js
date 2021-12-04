const piano = document.querySelector('.piano');
const keys = piano.querySelectorAll('.key');

function initAudio() {
  [
    './audio/key-1.mp3',
    './audio/key-2.mp3',
    './audio/key-3.mp3',
    './audio/key-4.mp3',
    './audio/key-5.mp3',
    './audio/key-6.mp3',
    './audio/key-7.mp3',
    './audio/key-8.mp3',
    './audio/key-9.mp3',
    './audio/key-10.mp3',
    './audio/key-11.mp3',
    './audio/key-12.mp3',
    './audio/key-13.mp3',
    './audio/key-14.mp3',
    './audio/key-15.mp3',
    './audio/key-16.mp3',
    './audio/key-17.mp3',
    './audio/key-18.mp3',
    './audio/key-19.mp3',
    './audio/key-20.mp3',
    './audio/key-21.mp3',
    './audio/key-22.mp3',
    './audio/key-23.mp3',
  ].map((audio, index) => {
    const audioElement = `<audio data-key=${index + 1} src="${audio}"></audio>`;
    piano.insertAdjacentHTML('beforeend', audioElement);
  });
}

function playSound() {
  const audioElement = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
  if (!audioElement) return;

  audioElement.currentTime = 0;
  audioElement.play();
}

keys.forEach((key) => key.addEventListener('click', playSound));
document.addEventListener('DOMContentLoaded', initAudio);
