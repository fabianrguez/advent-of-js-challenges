const toasterElement = document.querySelector('.toaster');
const toasterCloseButton = toasterElement.querySelector('.close-toaster');

function showToaster() {
  const { showed } = toasterElement.dataset;
  if (showed === 'false') {
    toasterElement.classList.remove('collapsed');
    toasterElement.dataset.showed = true;
  }
}

function closeToaster() {
  toasterElement.classList.add('collapsed');
}

function handleMoveOutOfPage(e) {
  const { clientHeight } = e.target;
  const { clientY } = e;

  if (clientY < 10 || clientY === clientHeight - 10) {
    showToaster();
  }
}

function init() {
  setInterval(showToaster, 15000);
}

toasterCloseButton.addEventListener('click', closeToaster);
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('mousemove', handleMoveOutOfPage);
