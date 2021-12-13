const accordionElement = document.querySelectorAll('.accordion');

function toggleAccordion() {
  this.classList.toggle('expand');
}

accordionElement.forEach((accordion) => accordion.addEventListener('click', toggleAccordion));
