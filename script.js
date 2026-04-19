const photoGrid = document.getElementById('photoGrid');
const videoGrid = document.getElementById('videoGrid');
const previewPanel = document.getElementById('previewPanel');
const imageUpload = document.getElementById('imageUpload');
const videoUpload = document.getElementById('videoUpload');

const photoTiles = [
  { src: 'https://picsum.photos/seed/cusat1/800/1000', title: 'Campus sunset', subtitle: 'Evening conversations' },
  { src: 'https://picsum.photos/seed/cusat2/800/1000', title: 'Farewell smile', subtitle: 'Friends forever' },
  { src: 'https://picsum.photos/seed/cusat3/800/1000', title: 'Study nights', subtitle: 'Every memory' },
  { src: 'https://picsum.photos/seed/cusat4/800/1000', title: 'Group cheers', subtitle: 'Final gathering' },
  { src: 'https://picsum.photos/seed/cusat5/800/1000', title: 'Campus walk', subtitle: 'Golden hour' },
  { src: 'https://picsum.photos/seed/cusat6/800/1000', title: 'Ceremony', subtitle: 'Last chapter' }
];

const videoTiles = [
  { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', title: 'Farewell highlights', subtitle: 'Moments of the night' },
  { src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Memories reel', subtitle: 'Short film story' },
  { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', title: 'Best friends', subtitle: 'Shared laughter' }
];

function createPhotoTiles() {
  photoGrid.innerHTML = photoTiles.map((item, index) => `
    <article class="memory-card fade-up" style="animation-delay:${index * 80}ms;">
      <img src="${item.src}" alt="${item.title}" loading="lazy" />
      <div class="memory-meta">
        <p class="memory-title">${item.title}</p>
        <p class="memory-sub">${item.subtitle}</p>
      </div>
    </article>
  `).join('');
}

function createVideoTiles() {
  videoGrid.innerHTML = videoTiles.map((item, index) => `
    <article class="video-card fade-up" style="animation-delay:${index * 80}ms;">
      <video src="${item.src}" muted loop playsinline preload="metadata"></video>
      <div class="video-meta">
        <p class="video-title">${item.title}</p>
        <p class="video-sub">${item.subtitle}</p>
      </div>
    </article>
  `).join('');
}

function renderPreview(items) {
  if (!items.length) {
    previewPanel.innerHTML = '<p class="preview-note">Selected files preview here.</p>';
    return;
  }
  previewPanel.innerHTML = '<div class="preview-list"></div>';
  const list = previewPanel.querySelector('.preview-list');
  items.forEach(file => {
    const item = document.createElement('div');
    item.className = 'preview-item';
    item.innerHTML = `<span>${file.name}</span><small>${(file.size / 1024 / 1024).toFixed(2)} MB</small>`;
    list.appendChild(item);
  });
}

function handleUploads() {
  const images = Array.from(imageUpload.files || []);
  const videos = Array.from(videoUpload.files || []);
  const items = [...images, ...videos];
  renderPreview(items);
}

imageUpload.addEventListener('change', handleUploads);
videoUpload.addEventListener('change', handleUploads);

createPhotoTiles();
createVideoTiles();
