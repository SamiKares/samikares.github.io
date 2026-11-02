(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const toast = $('.toast');
  let toastTimer;
  function notify(message) {
    clearTimeout(toastTimer);
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
  }
  window.skNotify = notify;

  const menuButton = $('.menu-toggle');
  const navigation = $('#navigation');
  function closeMenu() {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('open');
    const symbol = menuButton?.querySelector('span');
    if (symbol) symbol.textContent = '＋';
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
    $('span', menuButton).textContent = open ? '−' : '＋';
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  $$('#navigation a').forEach(link => link.addEventListener('click', closeMenu));
  matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menuButton.focus();
    }
  });

  const themeButton = $('.theme-toggle');
  function syncThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton?.setAttribute('aria-label', dark ? 'Ota vaalea teema käyttöön' : 'Ota tumma teema käyttöön');
    themeButton?.setAttribute('aria-pressed', String(dark));
  }
  syncThemeButton();
  themeButton?.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('sk-theme', dark ? 'dark' : 'light'); } catch {}
    syncThemeButton();
  });

  const clock = $('.clock');
  function updateClock() {
    if (!clock) return;
    const value = new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', hour: '2-digit', minute: '2-digit' }).format(new Date());
    clock.textContent = ' / ' + value;
    clock.setAttribute('aria-label', 'Helsingin paikallinen aika ' + value);
  }
  updateClock();
  setInterval(updateClock, 30000);
  let scrollQueued = false;
  const progress = $('.progress-line');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
    scrollQueued = false;
  }
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const reveals = $$('.reveal');
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view'); observer.unobserve(entry.target);
        }
      });
    }, { threshold: .06, rootMargin: '0px 0px 25px 0px' });
    reveals.forEach(node => observer.observe(node));
  }

  const systemTabs = $$('.system-tab');
  const systemStage = $('.system-stage');
  const systemCaption = $('#system-caption');
  const systemCopy = $('.system-copy');
  const descriptions = {
    infra: 'Intune, Entra ID, Microsoft 365 ja AD / GPO.',
    security: 'Nessus, Sophos ja FortiGate. Korjausten kohdistus ja jälkitarkistus.',
    ai: 'Paikalliset kielimallit, dokumenttihaku ja kamerakuvan analyysi.'
  };
  function selectSystem(tab, focus = false) {
    if (!tab || !systemStage) return;
    systemTabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    systemStage.dataset.mode = tab.dataset.mode;
    systemCopy.textContent = descriptions[tab.dataset.mode];
    systemCaption.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
  }
  systemTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSystem(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % systemTabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + systemTabs.length) % systemTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = systemTabs.length - 1;
      if (target !== undefined) { event.preventDefault(); selectSystem(systemTabs[target], true); }
    });
  });
  // Keep the complete schematic visible until a visitor selects a specialty.
  if (systemStage && !reducedMotion.matches && matchMedia('(pointer: fine)').matches) {
    const drawing = $('.system-drawing');
    let frame;
    systemStage.addEventListener('pointermove', event => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = systemStage.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        drawing.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
      });
    });
    systemStage.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame); drawing.style.transform = '';
    });
  }

  const dialogTriggers = new WeakMap();
  function openDialog(dialog, trigger) {
    if (!dialog || dialog.open) return;
    dialogTriggers.set(dialog, trigger || document.activeElement);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  window.skOpenDialog = openDialog;
  $$('dialog').forEach(dialog => {
    $$('[data-close-dialog]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.style.overflow = '';
      const trigger = dialogTriggers.get(dialog);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    });
  });

  const palette = $('#palette');
  const paletteInput = $('#palette-input');
  const paletteResults = $('#palette-results');
  const routes = [
    { title: 'CV & osaaminen', hint: 'Sivu', href: 'index.html', words: 'etusivu työkokemus koulutus osaaminen cv' },
    { title: 'Projektit', hint: 'Sivu', href: 'ai.html', words: 'koodi automaatio ai github projektit' },
    { title: 'Valokuva-arkisto', hint: 'Sivu', href: 'photography.html', words: 'valokuvaus skate lumi ihmiset' },
    { title: 'Ota yhteyttä', hint: 'Yhteys', href: 'index.html#yhteys', words: 'mail sähköposti yhteys contact' },
    { title: 'Lataa CV / PDF', hint: 'Tiedosto', href: 'assets/documents/sami-karesniemi-cv-20261102-v2.pdf', words: 'resume ansioluettelo cv pdf' },
    {"title": "Data-Driven Endpoint Security", "hint": "Insinöörityö", "href": "ai.html#thesis", "words": "tietokanta cve kyberturvasyötteet intune endpoint opinnäytetyö"},
    {"title": "SOC Command Center Pro", "hint": "Projekti", "href": "ai.html#soc", "words": "fortinet tietoturva verkko"},
    {"title": "Paikallinen konenäkö", "hint": "Projekti", "href": "ai.html#vision", "words": "kamerat hanwha opencv yolo"},
    {"title": "SafetyScan", "hint": "Projekti", "href": "ai.html#safety", "words": "konenäkö turvavaruste kypärä liivi ppe"},
    {"title": "Laiteinventaarion tietokanta", "hint": "Projekti", "href": "ai.html#asset", "words": "m-files intune sophos entra inventaario"},
    {"title": "PowerShell-ohjatut Intune-päivitykset", "hint": "Projekti", "href": "ai.html#adobe", "words": "adobe reader acrobat powershell"},
    {"title": "CELL-7 Agent", "hint": "Projekti", "href": "ai.html#cell7", "words": "agentti llm nvd cve"},
    {"title": "Paikallinen dokumenttihaku", "hint": "Projekti", "href": "ai.html#rag", "words": "pdf haku dokumentti"},
    {"title": "Turvabotti", "hint": "Verkkosivu", "href": "https://turvabotti.com/", "words": "turvabotti projekti"},
    {"title": "Konenäön selaindemo", "hint": "Demo", "href": "ai.html#lab", "words": "kamera roi opencv edge vision"}
  ];
  function renderRoutes() {
    const query = paletteInput.value.toLocaleLowerCase('fi').trim();
    const matching = routes.filter(route => `${route.title} ${route.words}`.toLocaleLowerCase('fi').includes(query));
    paletteResults.replaceChildren();
    matching.forEach(route => {
      const li = document.createElement('li');
      const link = document.createElement('a'); link.href = route.href;
      const title = document.createElement('span'); title.textContent = route.title;
      const hint = document.createElement('small'); hint.textContent = route.hint + ' ↗';
      link.append(title, hint); li.append(link); paletteResults.append(li);
      link.addEventListener('click', () => palette.close());
    });
    if (!matching.length) {
      const empty = document.createElement('li'); empty.className = 'palette-empty'; empty.textContent = 'Ei osumia. Kokeile esimerkiksi Intune, kamera tai CV.'; paletteResults.append(empty);
    }
  }
  function showPalette(trigger) {
    if ($('dialog[open]')) return;
    closeMenu(); paletteInput.value = ''; renderRoutes();
    openDialog(palette, trigger); paletteInput.focus();
  }
  $$('.palette-toggle').forEach(button => button.addEventListener('click', () => showPalette(button)));
  paletteInput?.addEventListener('input', renderRoutes);
  palette?.addEventListener('keydown', event => {
    const links = $$('a', paletteResults);
    if (!links.length) return;
    const index = links.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') { event.preventDefault(); links[(index + 1) % links.length].focus(); }
    if (event.key === 'ArrowUp') { event.preventDefault(); links[index <= 0 ? links.length - 1 : index - 1].focus(); }
    if (event.key === 'Enter' && document.activeElement === paletteInput) { event.preventDefault(); links[0].click(); }
  });
  document.addEventListener('keydown', event => {
    const editing = event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName));
    if ((event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !editing)) {
      event.preventDefault();
      if (palette.open) palette.close(); else showPalette(document.activeElement);
    }
  });

  // Decode only after a real pointer or keyboard activation.
  function revealEmail(button, event, focus = true) {
    if (!(event instanceof Event) || !event.isTrusted || !button?.isConnected) return;
    const terminal = button.closest('.contact-terminal');
    const address = [40,58,54,50,27,48,58,41,62,40,53,50,62,54,50,117,61,50].map(value => String.fromCharCode(value ^ 91)).join('');
    const link = document.createElement('a');
    link.className = 'contact-email';
    link.href = 'mailto:' + address;
    link.textContent = address;
    button.replaceWith(link);
    const copy = terminal?.querySelector('[data-copy]');
    if (copy) { copy.dataset.copy = address; copy.hidden = false; }
    if (focus) link.focus({ preventScroll: true });
    return link;
  }
  window.skRevealEmail = revealEmail;
  $$('[data-reveal-email]').forEach(button => button.addEventListener('click', event => revealEmail(button, event)));

  function revealPhone(button, event, focus = true) {
    if (!(event instanceof Event) || !event.isTrusted || !button?.isConnected) return;
    const number = [112, 104, 110, 99, 111, 110, 106, 107, 110, 106, 109, 106, 109].map(value => String.fromCharCode(value ^ 91)).join('');
    const link = document.createElement('a');
    link.href = 'tel:' + number;
    link.textContent = number.slice(0, 4) + ' ' + number.slice(4, 6) + ' '
      + number.slice(6, 9) + ' ' + number.slice(9);
    button.replaceWith(link);
    if (focus) link.focus({ preventScroll: true });
    return link;
  }
  window.skRevealPhone = revealPhone;
  $$('[data-reveal-phone]').forEach(button => button.addEventListener('click', event => revealPhone(button, event)));

  $$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    if (!value) return;
    const previousFocus = document.activeElement;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const area = document.createElement('textarea'); area.value = value;
        area.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.append(area); area.select();
        const copied = document.execCommand('copy'); area.remove();
        if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
        if (!copied) throw new Error('copy failed');
      }
      notify('Sähköpostiosoite kopioitu.');
    } catch { notify('Kopioi osoite: ' + value); }
  }));
})();
