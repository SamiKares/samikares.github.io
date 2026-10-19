'use strict';
(() => {
  const entries = [...document.querySelectorAll('.project-entry')];
  const buttons = [...document.querySelectorAll('[data-project-filter]')];
  const groups = [...document.querySelectorAll('[data-project-group]')];
  const result = document.querySelector('#project-results');
  if (!entries.length || !result) return;
  function filterProjects(category) {
    buttons.forEach(button => {
      const selected = button.dataset.projectFilter === category;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('active', selected);
    });
    let count = 0;
    entries.forEach(entry => {
      entry.hidden = category !== 'all' && entry.dataset.projectCategory !== category;
      if (!entry.hidden) count++;
    });
    groups.forEach(group => { group.hidden = category !== 'all' && group.dataset.projectGroup !== category; });
    result.textContent = count + (count === 1 ? ' projekti' : ' projektia');
  }
  buttons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.projectFilter)));
  function openLinkedProject() {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const entry = entries.find(item => item.id === id);
    if (!entry) return;
    if (entry.hidden) filterProjects('all');
    entry.open = true;
    entry.scrollIntoView({block: 'start'});
    entry.querySelector('summary').focus({preventScroll: true});
  }
  window.addEventListener('hashchange', openLinkedProject);
  openLinkedProject();
})();
