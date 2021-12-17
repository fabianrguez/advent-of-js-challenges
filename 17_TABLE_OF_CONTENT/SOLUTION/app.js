const anchorLinks = document.querySelectorAll('a[href^="#"]');
const titles = document.querySelectorAll('h3');

function setNavLinkActive(hash) {
  document.querySelectorAll('aside ul li').forEach((li) => li.classList.remove('selected'));
  const anchor = [...anchorLinks].find((anchor) => anchor.hash === hash);
  anchor.parentElement.classList.add('selected');
}

function contentScrolledObserver(element) {
  const options = {
    rootMargin: '-150px 0px',
    threshold: 1.0,
  };
  const observer = new IntersectionObserver((intersection) => {
    const [item] = intersection;
    if (item.isIntersecting) {
      setNavLinkActive(`#${element.id}`);
    }
  }, options);
  observer.observe(element);
}

function scrollToContent(e) {
  e.preventDefault();
  const element = document.querySelector(this.hash);
  element.scrollIntoView({ behaviour: 'smooth' });
  setNavLinkActive(this.hash)
}

titles.forEach((title) => contentScrolledObserver(title));
anchorLinks.forEach((anchorLink) => anchorLink.addEventListener('click', scrollToContent));
