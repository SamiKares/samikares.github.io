'use strict';
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu(returnFocus = false) {
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus && wasOpen) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  document.addEventListener('pointerdown', event => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.matchMedia('(max-width: 1100px)').addEventListener('change', () => closeMenu());
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
