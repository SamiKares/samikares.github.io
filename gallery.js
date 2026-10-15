'use strict';
(() => {
  const section = document.querySelector('[data-gallery-kind]');
  if (!section || !window.PORTFOLIO_GALLERY) return;
  const data = window.PORTFOLIO_GALLERY[section.dataset.galleryKind];
  const grid = document.querySelector('#gallery-grid');
  const count = document.querySelector('#gallery-count');
  const more = document.querySelector('#gallery-more');
  const filterButtons = [...document.querySelectorAll('.gallery-filter')];
  const dialog = document.querySelector('#gallery-dialog');
  const image = document.querySelector('#lightbox-image');
  const title = document.querySelector('#lightbox-title');
  const position = document.querySelector('#lightbox-position');
  const original = document.querySelector('#lightbox-original');
  const batchSize = 12;
  let filtered = data;
  let visible = batchSize;
  let activeIndex = 0;
  let trigger;
  let previousOverflow = '';

  function render() {
    grid.replaceChildren();
    filtered.slice(0, visible).forEach((item, index) => {
      const button = document.createElement('a');
      button.className = 'gallery-tile';
      button.href = item.src;
      button.dataset.imageIndex = String(index);
      button.setAttribute('aria-label', 'Avaa ' + item.title);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.width = item.width;
      img.height = item.height;
      img.loading = 'lazy';
      img.decoding = 'async';
      const caption = document.createElement('span');
      caption.className = 'gallery-tile-caption';
      const label = document.createElement('span');
      label.textContent = item.title;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      caption.append(label, arrow);
      button.append(img, caption);
      button.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
        event.preventDefault();
        open(index, button);
      });
      grid.append(button);
    });
    count.textContent = Math.min(visible, filtered.length) + ' / ' + filtered.length + ' kuvaa';
    more.hidden = visible >= filtered.length;
    const remaining = Math.min(batchSize, filtered.length - visible);
    if (remaining > 0) more.textContent = 'Näytä ' + remaining + ' lisää ＋';
  }

  function writeImageHash(item) {
    if (!window.location || !window.history?.replaceState) return;
    window.history.replaceState(null, '', window.location.pathname + window.location.search + '#kuva=' + encodeURIComponent(item.filename));
  }

  function updateLightbox() {
    const item = filtered[activeIndex];
    image.src = item.src;
    image.alt = item.alt;
    title.textContent = item.title;
    position.textContent = (activeIndex + 1) + ' / ' + filtered.length;
    original.href = item.src;
    original.title = item.filename;
    writeImageHash(item);
    document.querySelector('#lightbox-prev').disabled = filtered.length < 2;
    document.querySelector('#lightbox-next').disabled = filtered.length < 2;
  }

  function open(index, button) {
    activeIndex = index;
    trigger = button;
    updateLightbox();
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.querySelector('#lightbox-close').focus();
  }

  function move(step) {
    activeIndex = (activeIndex + step + filtered.length) % filtered.length;
    updateLightbox();
  }

  more.addEventListener('click', () => {
    const firstNew = visible;
    visible += batchSize;
    render();
    grid.children[firstNew]?.focus();
  });
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.category;
    filtered = category === 'all' ? data : data.filter(item => (item.categories || [item.category]).includes(category));
    visible = batchSize;
    filterButtons.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));
  document.querySelector('#lightbox-prev').addEventListener('click', () => move(-1));
  document.querySelector('#lightbox-next').addEventListener('click', () => move(1));
  document.querySelector('#lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (window.location?.hash.startsWith('#kuva=') && window.history?.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#kuvat');
    }
    trigger?.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  });
  function openLinkedImage() {
    if (!window.location) return;
    const filename = new URLSearchParams(window.location.hash.slice(1)).get('kuva');
    if (!filename) return;
    const item = data.find(photo => photo.filename === filename);
    if (!item) return;
    if (!filtered.includes(item)) {
      filtered = data;
      visible = batchSize;
      filterButtons.forEach(button => {
        const active = button.dataset.category === 'all';
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      render();
    }
    activeIndex = filtered.indexOf(item);
    if (dialog.open) updateLightbox();
    else open(activeIndex, grid.children[activeIndex] || more);
  }
  window.addEventListener?.('hashchange', openLinkedImage);
  render();
  openLinkedImage();
})();
