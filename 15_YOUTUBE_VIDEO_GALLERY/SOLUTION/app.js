const galleryElement = document.querySelector('.gallery');
const featuredVideoElement = document.querySelector('.feature');
const galleryVideoTemplate = document.querySelector('#gallery-video-item');
const commentListElement = document.querySelector('.comment__list');

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

function calcuateCommentTimeAgo(commentDate) {
  const now = new Date();
  const comment = new Date(commentDate);
  const timeDifference = now.getTime() - comment.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3000 * 24));

  return daysDifference;
}

function loadVideoComments(comments = []) {
  if (comments.length === 0) return;

  const nameInitials = (name) => {
    const [first, second, ..._] = name;
    return `${first.toUpperCase()}${second.toUpperCase()}`;
  };

  commentListElement.innerHTML = comments
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(
      ({ user, comment, publishedAt }) => `<div class="comment">
      <span class="circle">${nameInitials(user)}</span>
      <div class="comment__content">
        <div class="comment__info">
          <span class="comment__info--user">${user}</span>
          <span class="comment__info--time">${calcuateCommentTimeAgo(publishedAt)} days ago</span>
        </div>    
        <p>${comment}</p>
      </div>
    </div>`
    )
    .join('');
}

function loadFeaturedVideo({ id, snippet }) {
  const { videoId } = id;
  const { title, description, comments } = snippet;

  const embedVideo = featuredVideoElement.querySelector('.embed');
  embedVideo.firstElementChild.src = `https://www.youtube.com/embed/${videoId}`;
  featuredVideoElement.querySelector('h1').innerText = title;
  featuredVideoElement.querySelector('p').innerText = description;
  loadVideoComments(comments);
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
