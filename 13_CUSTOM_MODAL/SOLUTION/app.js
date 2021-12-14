const modalTriggers = document.querySelectorAll('.something');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close');

function toggleModal() {
  overlay.classList.toggle('open');
}

modalTriggers.forEach((modalTrigger) => modalTrigger.addEventListener('click', toggleModal));
closeModalButton.addEventListener('click', toggleModal);
