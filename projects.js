<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
window.SKPage.register('projects', scope => {
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
  const projects = window.SK_PROJECTS || [];
  const cards = [...document.querySelectorAll('.project-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const filterStatus = document.querySelector('#filter-status');
  const dialog = document.querySelector('#project-dialog');
  const projectById = new Map(projects.map(project => [project.id, project]));
  function setFilter(category) {
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    let count = 0;
    cards.forEach(card => {
      const visible = category === 'all' || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) count++;
    });
    filterStatus.textContent = count + (count === 1 ? ' projekti' : ' projektia');
  }
  filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function openProject(id, trigger) {
    const project = projectById.get(id);
    if (!project || !dialog) return;
    document.querySelector('#dialog-category').textContent = project.label + ' / ' + project.state;
    document.querySelector('#dialog-title').textContent = project.name;
    document.querySelector('#dialog-intro').textContent = project.desc;
    const body = document.querySelector('#dialog-body'); body.replaceChildren();
    if (project.screenshot) {
      const figure = element('figure', undefined, 'project-screenshot');
      const link = element('a');
      link.href = project.screenshot.src;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Avaa kuvakaappaus alkuperäiskoossa: ' + project.name);
      const image = element('img');
      image.src = project.screenshot.src;
      image.alt = project.screenshot.alt;
      image.width = project.screenshot.width;
      image.height = project.screenshot.height;
      image.decoding = 'async';
      link.append(image);
      figure.append(link, element('figcaption', 'Kuvakaappaus · avaa alkuperäiskoossa ↗'));
      body.append(figure);
    }
    project.blocks.forEach(([heading, text]) => {
      const section = element('section', undefined, 'case-block');
      section.append(element('h3', heading), element('p', text)); body.append(section);
    });
    const actions = document.querySelector('#dialog-actions'); actions.replaceChildren();
    if (project.repo) {
      const link = element('a', project.repoLabel || 'Lähdekoodi GitHubissa ↗', 'button primary');
      link.href = project.repo; link.target = '_blank'; link.rel = 'noopener noreferrer'; actions.append(link);
    }
    if (project.demo) {
      const link = element('a', 'Kokeile selaindemoa ↓', 'button primary'); link.href = '#lab';
      link.addEventListener('click', () => { dialog.dataset.keepHash = 'true'; dialog.close(); }); actions.append(link);
    }
    const contact = element('a', 'Yhteystiedot ↗', 'button outline'); contact.href = 'index.html#yhteys'; actions.append(contact);
<<<<<<< Updated upstream
    try { history.replaceState(history.state, '', '#' + project.id); } catch {}
=======
<<<<<<< HEAD
    try { history.replaceState(history.state, '', '#' + project.id); } catch {}
=======
    try { history.replaceState(null, '', '#' + project.id); } catch {}
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
    window.skOpenDialog(dialog, trigger); dialog.scrollTop = 0;
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
  dialog?.addEventListener('close', () => {
    if (dialog.dataset.keepHash === 'true') { delete dialog.dataset.keepHash; return; }
    if (projectById.has(location.hash.slice(1))) {
<<<<<<< Updated upstream
      try { history.replaceState(history.state, '', location.pathname + location.search); } catch {}
=======
<<<<<<< HEAD
      try { history.replaceState(history.state, '', location.pathname + location.search); } catch {}
=======
      try { history.replaceState(null, '', location.pathname + location.search); } catch {}
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
    }
  });
  function openHash() {
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (projectById.has(id)) {
      setFilter('all');
      const trigger = document.querySelector(`[data-project="${id}"]`);
      openProject(id, trigger);
    }
  }
  addEventListener('hashchange', openHash);
<<<<<<< Updated upstream
  if (document.documentElement.classList.contains('fractal-busy')) document.addEventListener('sk:navigation-ready', openHash, { once: true });
  else openHash();
=======
<<<<<<< HEAD
  if (document.documentElement.classList.contains('fractal-busy')) document.addEventListener('sk:navigation-ready', openHash, { once: true });
  else openHash();
=======
  openHash();
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes

  const rois = [...document.querySelectorAll('[data-roi]')];
  const state = rois.map(() => ({ missing: false, alert: false, timer: null }));
  const output = document.querySelector('.lab-output');
  const status = document.querySelector('#demo-status');
  const count = document.querySelector('#demo-count');
  const delayInput = document.querySelector('#demo-delay');
  const delayValue = document.querySelector('#delay-value');
  const eventLog = document.querySelector('#event-log');
  let events = [];
  function addEvent(message, warning = false) {
    const time = new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
    events.unshift({ time, message, warning }); events = events.slice(0, 5); eventLog.replaceChildren();
    events.forEach(event => {
      const row = element('li');
      const timeNode = element('time', event.time);
      const content = element('span', event.message, event.warning ? 'event-warning' : undefined);
      row.append(timeNode, content); eventLog.append(row);
    });
  }
  function renderState() {
    const missing = state.filter(item => item.missing).length;
    const alerts = state.filter(item => item.alert).length;
    const pending = missing - alerts;
    state.forEach((item, index) => {
      const roi = rois[index]; const number = String(index + 1).padStart(2, '0');
      roi.classList.toggle('missing', item.missing); roi.classList.toggle('alert', item.alert);
      roi.setAttribute('aria-pressed', String(item.missing));
      roi.setAttribute('aria-label', (item.missing ? 'Palauta kohde alueelle ' : 'Poista kohde alueelta ') + number);
      roi.querySelector('.roi-status').textContent = item.alert ? 'Poikkeama vahvistettu' : item.missing ? 'Tarkistus kesken…' : 'Kohde paikallaan';
    });
    count.textContent = (3 - missing) + ' / 3';
    output.classList.toggle('warning', alerts > 0);
    output.classList.toggle('pending', missing > 0 && !alerts);
    if (alerts) status.textContent = `Poikkeama: ${alerts} ${alerts === 1 ? 'alueelta puuttuu kohde' : 'alueelta puuttuu kohde'}.${pending ? ' Muita alueita tarkistetaan.' : ''}`;
    else if (pending) status.textContent = `Tarkistus käynnissä: ${pending} ${pending === 1 ? 'kohde puuttuu' : 'kohdetta puuttuu'}.`;
    else status.textContent = 'Kaikki kolme kohdetta paikallaan.';
  }
  rois.forEach((roi, index) => roi.addEventListener('click', () => {
    const item = state[index]; const number = String(index + 1).padStart(2, '0');
    clearTimeout(item.timer); item.timer = null;
    item.missing = !item.missing; item.alert = false;
    if (item.missing) {
      const delay = Number(delayInput.value);
      addEvent(`Alue ${number}: kohde poistettu. Tarkistus käynnissä.`);
      item.timer = setTimeout(() => {
        if (!item.missing) return;
        item.alert = true; item.timer = null;
        addEvent(`Alue ${number}: puuttuva kohde vahvistettu.`, true); renderState();
      }, delay);
    } else addEvent(`Alue ${number}: kohde palautettu.`);
    renderState();
  }));
  delayInput?.addEventListener('input', () => {
    delayValue.textContent = (Number(delayInput.value) / 1000).toLocaleString('fi-FI', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' s';
  });
  document.querySelector('#demo-reset')?.addEventListener('click', () => {
    state.forEach(item => { clearTimeout(item.timer); item.missing = false; item.alert = false; item.timer = null; });
    events = []; addEvent('Havainne nollattu. Kaikki kohteet paikallaan.'); renderState();
  });
  addEventListener('pagehide', () => state.forEach(item => clearTimeout(item.timer)));
<<<<<<< Updated upstream
});
=======
<<<<<<< HEAD
});
=======
})();
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
