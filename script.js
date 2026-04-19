const photoGrid = document.getElementById('photoGrid');
const previewPanel = document.getElementById('previewPanel');
const imageUpload = document.getElementById('imageUpload');
const videoUpload = document.getElementById('videoUpload');
const audioUpload = document.getElementById('audioUpload');

const photos = [
  'https://picsum.photos/id/1015/800/1200',
  'https://picsum.photos/id/1011/800/1200',
  'https://picsum.photos/id/1025/800/1200',
  'https://picsum.photos/id/1005/800/1200',
  'https://picsum.photos/id/1035/800/1200',
  'https://picsum.photos/id/1043/800/1200'
];

function createPhotoTiles() {
  photos.forEach((src, index) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.animation = `fadeUp 0.5s ease ${index * 60}ms both`;
    tile.innerHTML = `<img src="${src}" alt="Farewell memory ${index + 1}" loading="lazy" />`;
    photoGrid.appendChild(tile);
  });
}

function createPreviewItem(type, url, name) {
  const wrapper = document.createElement('div');
  wrapper.className = 'preview-item';
  wrapper.innerHTML = `
    <strong>${type}: ${name}</strong>
    <div class="preview-media"></div>
  `;

  const mediaContainer = wrapper.querySelector('.preview-media');
  if (type === 'Photo') {
    const img = document.createElement('img');
    img.src = url;
    img.alt = name;
    mediaContainer.appendChild(img);
  } else if (type === 'Video') {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.playsInline = true;
    mediaContainer.appendChild(video);
  } else if (type === 'Audio') {
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    mediaContainer.appendChild(audio);
  }

  previewPanel.appendChild(wrapper);
}

function buildPreview() {
  previewPanel.innerHTML = '';
  const items = [];

  if (imageUpload.files.length) {
    const file = imageUpload.files[0];
    items.push({ type: 'Photo', file });
  }
  if (videoUpload.files.length) {
    const file = videoUpload.files[0];
    items.push({ type: 'Video', file });
  }
  if (audioUpload.files.length) {
    const file = audioUpload.files[0];
    items.push({ type: 'Audio', file });
  }

  if (!items.length) {
    previewPanel.innerHTML = '<p class="preview-note">Selected files will preview here.</p>';
    return;
  }

  items.forEach(item => {
    const url = URL.createObjectURL(item.file);
    createPreviewItem(item.type, url, item.file.name);
  });
}

imageUpload.addEventListener('change', buildPreview);
videoUpload.addEventListener('change', buildPreview);
audioUpload.addEventListener('change', buildPreview);

createPhotoTiles();
