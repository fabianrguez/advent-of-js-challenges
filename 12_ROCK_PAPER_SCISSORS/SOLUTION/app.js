const picks = document.querySelectorAll('.pick-one button');

function handlePick() {
  const { pick } = this.dataset;
  location.href = `./winner.html?pick=${pick}`;
}

picks.forEach((pick) => pick.addEventListener('click', handlePick));
