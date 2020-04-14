if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });

    init();
  });
}


function init() {
  fillMedia();
  const urlInput = document.getElementById('add-media-url');
  const mediaType = document.getElementById('add-media-type');
  const addBtn = document.getElementById('add-media-btn');

  addBtn.addEventListener('click', () => {
    const urlValue = urlInput.value;
    const mediaTypeValue = mediaType.value;

    if (!urlValue || !mediaTypeValue) {
      return;
    }

    if (mediaTypeValue === 'img') {
      addImg(urlValue);
      localStorage.setItem('img', urlValue);
    }

    if (mediaTypeValue === 'video') {
      addVideo(urlValue);
      localStorage.setItem('video', urlValue);
    }
  })
}

function addImg(src) {
  const img = document.querySelector('img');
  const p = document.getElementById('img-text');

  img.setAttribute('src', src);
  p.innerHTML = 'This image has been cached';
}

function addVideo(src) {
  const video = document.querySelector('video');
  const p = document.getElementById('video-text');

  video.setAttribute('src', src);
  p.innerHTML = 'This video has been cached';
}

function fillMedia() {
  const img = localStorage.getItem('img');
  const video = localStorage.getItem('video');

  if (img) {
    addImg(img);
  }

  if (video) {
    addVideo(video);
  }
}