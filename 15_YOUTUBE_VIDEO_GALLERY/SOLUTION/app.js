const galleryElement = document.querySelector('.gallery');
const featuredVideoElement = document.querySelector('.feature');
const galleryVideoTemplate = document.querySelector('#gallery-video-item');

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

function findActiveVideoByParams(items) {
  const { videoId } = getUrlParams();
  const activeVideo = items.find(({ id }) => id.videoId === videoId);
  return activeVideo ? activeVideo : items[0];
}

function createGalleryVideoItem({ id, snippet }) {
  const { videoId } = id;
  const { title, thumbnails } = snippet;

  galleryVideoTemplate.content.querySelector('.video').href = `?videoId=${videoId}`;
  galleryVideoTemplate.content.querySelector('.video').title = title;
  galleryVideoTemplate.content.querySelector('h3').textContent = title;
  galleryVideoTemplate.content.querySelector('img').src = thumbnails.high.url;
  galleryVideoTemplate.content.querySelector('img').alt = title;

  return document.importNode(galleryVideoTemplate.content, true);
}

async function retrieveVideoList() {
  return await fetch('./sampleData.json')
    .then((response) => response.json())
    .then((data) => data);
}

function loadFeaturedVideo({ id, snippet }) {
  const { videoId } = id;
  const { title, description } = snippet;

  const embedVideo = featuredVideoElement.querySelector('.embed');
  embedVideo.firstElementChild.src = `https://www.youtube.com/embed/${videoId}`;
  featuredVideoElement.querySelector('h1').innerText = title;
  featuredVideoElement.querySelector('p').innerText = description;
}

async function init() {
  const { items } = await retrieveVideoList();
  const activeVideo = findActiveVideoByParams(items);
  initGallery(items);
  loadFeaturedVideo(activeVideo);
}

function initGallery(items) {
  const galleryVideoItems = items.map(createGalleryVideoItem);
  galleryVideoItems.forEach((galleryItem) => galleryElement.appendChild(galleryItem));
}

document.addEventListener('DOMContentLoaded', init);
