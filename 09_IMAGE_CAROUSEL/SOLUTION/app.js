const content = [
  {
    image: 'dave-hoefler-okUIdo6NxGo-unsplash.jpg',
    caption: 'Photo by Dave Hoefler on Unsplash',
  },
  {
    image: 'sherman-yang-VBBGigIuaDY-unsplash.jpg',
    caption: 'Photo by Sherman Yang n Unsplash',
  },
  {
    image: 'jakob-owens-EwRM05V0VSI-unsplash.jpg',
    caption: 'Photo by Jakob Owens on Unsplash',
  },
  {
    image: 'finding-dan-dan-grinwis-O35rT6OytRo-unsplash.jpg',
    caption: 'Photo by Dan Grinwis on Unsplash',
  },
  {
    image: 'vincentiu-solomon-ln5drpv_ImI-unsplash.jpg',
    caption: 'Photo by Vincentiu Solomon on Unsplash',
  },
  {
    image: 'silas-baisch-Wn4ulyzVoD4-unsplash.jpg',
    caption: 'Photo by Silas Baisch on Unsplash',
  },
  {
    image: 'eugene-golovesov-EXdXp7Z4X4w-unsplash.jpg',
    caption: 'Photo by Eugene Golovesov on Unsplash',
  },
  {
    image: 'jennifer-reynolds-_8HI5xf4TkE-unsplash.jpg',
    caption: 'Photo by Jennifer reynolds on Unsplash',
  },
  {
    image: 'kellen-riggin-SIBOiXKg0Ds-unsplash.jpg',
    caption: 'Photo by Kellen Riggin on Unsplash',
  },
  {
    image: 'rafael-hoyos-weht-zhkAp8DGkxw-unsplash.jpg',
    caption: 'Photo by Rafael Hoyos on Unsplash',
  },
  {
    image: 'sonya-romanovska-wzdXhyi3AiM-unsplash.jpg',
    caption: 'Photo by Sonya Romanovska on Unsplash',
  },
];

const feature = document.querySelector('.feature');
const thumbnails = document.querySelector('.thumbnails');
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const thumbnailTemplate = document.querySelector('#thumbnail-template');
let activeThumbnailIndex = 0;

function removeSelectedClass() {
  const allThumbnails = document.querySelectorAll('.thumbnails li a');
  allThumbnails.forEach((thumbnail) => {
    if (thumbnail.parentElement.classList.contains('selected')) {
      thumbnail.parentElement.classList.remove('selected');
    }
  });
}

function handleThumbnailClicked() {
  removeSelectedClass();
  this.parentElement.classList.add('selected');
  const { index } = this.dataset;
  setFeaturedImage(index);
  activeThumbnailIndex = +index;
}

function createThumbnailElement({ image, caption, index }) {
  thumbnailTemplate.content.querySelector('.thumbnail a').dataset.image = image;
  thumbnailTemplate.content.querySelector('.thumbnail a').dataset.index = index;
  thumbnailTemplate.content.querySelector('img').src = `images/${image}`;
  thumbnailTemplate.content.querySelector('img').alt = caption;

  return document.importNode(thumbnailTemplate.content, true);
}

function setFeaturedImage(index) {
  feature.querySelector('img').src = `images/${content[index].image}`;
  feature.querySelector('.caption').textContent = content[index].caption;
  setActiveThumbnail(index);
  activeThumbnailIndex = +index;
}

function setActiveThumbnail(index) {
  const activeThumbnail = document.querySelector(`[data-index='${index}']`);
  activeThumbnail?.parentElement.classList.add('selected');
  if (activeThumbnail) {
    thumbnails.scrollLeft = activeThumbnail.offsetLeft;
  }
}

function loadThumbnails() {
  setFeaturedImage(activeThumbnailIndex);
  content.forEach((thumbnail, index) => {
    const thumbnailElement = createThumbnailElement({ ...thumbnail, index });
    index === activeThumbnailIndex && thumbnailElement.querySelector('.thumbnail').classList.add('selected');
    thumbnailElement.querySelector('a').addEventListener('click', handleThumbnailClicked);
    thumbnails.querySelector('ul').appendChild(thumbnailElement);
  });
}

function goLeft() {
  if (activeThumbnailIndex === 0) {
    activeThumbnailIndex = content.length - 1;
  } else {
    activeThumbnailIndex--;
  }
  removeSelectedClass();
  setFeaturedImage(activeThumbnailIndex);
}

function goRight() {
  if (activeThumbnailIndex === content.length - 1) {
    activeThumbnailIndex = 0;
  } else {
    activeThumbnailIndex++;
  }
  removeSelectedClass();
  setFeaturedImage(activeThumbnailIndex);
}

document.addEventListener('DOMContentLoaded', loadThumbnails);
leftButton.addEventListener('click', goLeft);
rightButton.addEventListener('click', goRight);
