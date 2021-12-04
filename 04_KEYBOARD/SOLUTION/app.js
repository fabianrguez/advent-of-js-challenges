const keys = document.querySelectorAll('.key');

function random(max) {
  return Math.floor(Math.random() * max);
}

function jiggleRandomKey() {
  const _random = random(keys.length);
  keys[_random].classList.add('jiggle');
}

function keyClicked(e) {
  const { key } = e;
  const keyFound = [...keys].filter((_key) => _key.dataset.key === key.toUpperCase());

  keyFound &&
    keyFound.forEach((_key) => {
      if (_key.classList.contains('jiggle')) {
        _key.classList.remove('jiggle');
        jiggleRandomKey();
      }
    });
}

document.addEventListener('DOMContentLoaded', jiggleRandomKey);
document.addEventListener('keydown', keyClicked);
