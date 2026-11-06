<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
window.SKPage.register('gallery', scope => {
  'use strict';
  const setTimeout = scope.timeout.bind(scope);
  const setInterval = scope.interval.bind(scope);
  const requestAnimationFrame = scope.frame.bind(scope);
  const IntersectionObserver = scope.observer(window.IntersectionObserver);
  const ResizeObserver = scope.observer(window.ResizeObserver);
<<<<<<< Updated upstream
=======
=======
(() => {
  'use strict';
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
  const photos = window.SK_GALLERY || [];
  const grid = document.querySelector('#photo-grid');
  const filters = [...document.querySelectorAll('[data-gallery-filter]')];
  const more = document.querySelector('#load-more');
  const status = document.querySelector('#gallery-status');
  const bottomCount = document.querySelector('#gallery-count');
  const lightbox = document.querySelector('#lightbox');
  const image = document.querySelector('#lightbox-image');
  let filtered = photos;
  let displayed = 18;
  let imageIndex = 0;
  function photoNode(photo) {
    const figure = document.createElement('figure'); figure.className = 'photo-item';
    const button = document.createElement('button'); button.className = 'photo-button';
    button.dataset.photo = photo.id; button.setAttribute('aria-label', 'Suurenna kuva: ' + photo.title); button.setAttribute('aria-haspopup', 'dialog');
    const thumbnail = document.createElement('img'); thumbnail.src = photo.thumb; thumbnail.alt = photo.alt;
    thumbnail.width = photo.width; thumbnail.height = photo.height; thumbnail.loading = 'lazy'; thumbnail.decoding = 'async';
    const plus = document.createElement('span'); plus.className = 'photo-plus'; plus.setAttribute('aria-hidden', 'true');
    const symbol = document.createElement('span'); symbol.textContent = '+'; plus.append(symbol);
    button.append(thumbnail, plus);
    const caption = document.createElement('figcaption'); caption.className = 'photo-caption';
    const title = document.createElement('span'); title.textContent = photo.title;
    const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.className = 'arrow'; arrow.setAttribute('aria-hidden', 'true');
    caption.append(title, arrow); figure.append(button, caption); return figure;
  }
  function render(append = false) {
    const oldLength = grid.childElementCount;
    if (!append) grid.replaceChildren();
    const fragment = document.createDocumentFragment();
    filtered.slice(append ? oldLength : 0, displayed).forEach(photo => fragment.append(photoNode(photo)));
    grid.append(fragment);
    const text = Math.min(displayed, filtered.length) + ' / ' + filtered.length + ' kuvaa';
    status.textContent = text; bottomCount.textContent = text;
    more.hidden = displayed >= filtered.length;
    more.setAttribute('aria-label', 'Näytä seuraavat ' + Math.min(18, Math.max(0, filtered.length - displayed)) + ' kuvaa');
  }
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.galleryFilter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filtered = photos.filter(photo => category === 'all' || photo.category === category);
    displayed = 18; render();
  }));
  more?.addEventListener('click', () => { displayed += 18; render(true); });
  function updateImage() {
    const photo = filtered[imageIndex]; if (!photo) return;
    image.src = photo.src; image.alt = photo.alt;
    document.querySelector('#lightbox-title').textContent = photo.title;
    document.querySelector('#lightbox-count').textContent = `${imageIndex + 1} / ${filtered.length} · Kuva © Sami Karesniemi`;
    const original = document.querySelector('#lightbox-original'); original.href = photo.src;
    original.setAttribute('aria-label', 'Avaa kuva erikseen: ' + photo.title);
    // Preload only the next photograph rather than the full archive.
    const next = filtered[(imageIndex + 1) % filtered.length];
    if (next) { const preload = new Image(); preload.src = next.src; }
  }
  grid?.addEventListener('click', event => {
    const button = event.target.closest('[data-photo]'); if (!button) return;
    imageIndex = filtered.findIndex(photo => String(photo.id) === button.dataset.photo);
    if (imageIndex < 0) return;
    updateImage(); window.skOpenDialog(lightbox, button);
  });
  function moveImage(direction) {
    if (!filtered.length) return;
    imageIndex = (imageIndex + direction + filtered.length) % filtered.length; updateImage();
  }
  document.querySelector('.lightbox-prev')?.addEventListener('click', () => moveImage(-1));
  document.querySelector('.lightbox-next')?.addEventListener('click', () => moveImage(1));
  lightbox?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveImage(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveImage(1); }
  });
  let touchStart;
  image?.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  image?.addEventListener('touchend', event => {
    const difference = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(difference) > 65) moveImage(difference < 0 ? 1 : -1);
    touchStart = undefined;
  }, { passive: true });
  // The server-rendered first page remains usable and visible before scripts execute.
  if (photos.length) render();
<<<<<<< Updated upstream
});
=======
<<<<<<< HEAD
});
=======
})();
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
