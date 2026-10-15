'use strict';
(() => {
  const modes = {
    ai: {title:'Oma aineisto. Oma työkalu.', text:'Dokumenttihaku, paikalliset avustajat ja agentit.', href:'ai.html', label:'Tutustu Custom AI -projekteihin'},
    it: {title:'Arjen IT. Kokonaisuus hallussa.', text:'Microsoft 365, Intune, Entra ID ja käyttäjätuki.', href:'index.html#nykyinen-tyo', label:'Tutustu nykyiseen työhön'},
    security: {title:'Havainnosta korjaukseen.', text:'Haavoittuvuudet, automaatio ja tulosten varmistus.', href:'index.html#projektit', label:'Tutustu tietoturvan ja automaation projekteihin'}
  };
  document.querySelectorAll('.geometry-lab').forEach(lab => {
    const buttons = lab.querySelectorAll('[data-geometry-mode]');
    buttons.forEach(button => button.addEventListener('click', () => {
      const key = button.dataset.geometryMode;
      const mode = modes[key];
      if (!mode) return;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      lab.querySelectorAll('[data-volume]').forEach(volume => volume.dataset.active = String(volume.dataset.volume === key));
      lab.querySelector('[data-geometry-title]').textContent = mode.title;
      lab.querySelector('[data-geometry-description]').textContent = mode.text;
      const link = lab.querySelector('[data-geometry-link]');
      link.href = mode.href;
      link.setAttribute('aria-label', mode.label);
    }));
    const stage = lab.querySelector('.geometry-stage');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    stage.addEventListener('pointermove', event => {
      const bounds = stage.getBoundingClientRect();
      stage.style.setProperty('--geometry-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 9}px`);
      stage.style.setProperty('--geometry-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 9}px`);
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--geometry-x', '0px');
      stage.style.setProperty('--geometry-y', '0px');
    });
  });
})();
