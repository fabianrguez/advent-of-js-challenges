const starRating = document.querySelector('.star-rating');
const stars = document.querySelectorAll('.star');
let lastStarHighlighted = '';

function highlightStar() {
  starRating.classList.contains(lastStarHighlighted) && starRating.classList.remove(lastStarHighlighted);
  const star = this.classList[1];
  starRating.classList.add(star);
  lastStarHighlighted = star;
}

stars.forEach((start) => start.addEventListener('mouseover', highlightStar));
