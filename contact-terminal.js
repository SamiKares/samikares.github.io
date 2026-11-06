<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
window.SKPage.register('contact-terminal', scope => {
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
  const terminal = document.querySelector('.contact-terminal');
  if (!terminal) return;
  const session = terminal.querySelector('.terminal-session');
  const form = terminal.querySelector('.terminal-command');
  const input = terminal.querySelector('#contact-command');
  const output = terminal.querySelector('.terminal-output');
  if (!session || !form || !input || !output) return;

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======
  // XOR-obfuscated contact payload (no plaintext or Base64 for crawlers/scrapers)
  const vault = {
    e: [27, 57, 86, 98, 180, 180, 144, 235, 7, 97, 27, 63, 210, 255, 1, 118, 93, 98],
    p: [67, 107, 14, 51, 212, 235, 196, 185, 83, 34, 64, 118, 134, 164, 89, 110],
    t: [28, 61, 87, 49, 223, 236, 196, 161, 86, 39, 68, 102, 130, 163, 94, 105, 13],
    m: [5, 57, 82, 103, 128, 176, 203]
  };

  let humanInteracted = false;
  const markHuman = event => {
    if (!event || event.isTrusted) humanInteracted = true;
  };
  terminal.addEventListener('pointerdown', markHuman, { passive: true });
  terminal.addEventListener('keydown', markHuman, { passive: true });
  terminal.addEventListener('touchstart', markHuman, { passive: true });

  function unlock(bytes, event) {
    if (!humanInteracted && event && event.isTrusted === false) return '';
    const seed = `${terminal.id || 'yhteys'}:sk:2026`;
    const key = Array.from(seed, (c, i) => c.charCodeAt(0) ^ ((i * 31 + 17) & 0xff));
    return String.fromCharCode(...bytes.map((b, i) => b ^ key[i % key.length]));
  }

>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
  const history = [];
  let historyIndex = 0;
  const aliases = new Map([
    ['apua', 'help'], ['help', 'help'], ['?', 'help'],
    ['sähköposti', 'email'], ['sahkoposti', 'email'], ['email', 'email'], ['mail', 'email'],
    ['kopioi', 'copy'], ['copy', 'copy'],
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    ['puhelin', 'phone'], ['phone', 'phone'], ['numero', 'phone'],
    ['github', 'github'], ['linkedin', 'linkedin'], ['cv', 'cv'], ['projektit', 'projects'],
    ['tyhjennä', 'clear'], ['tyhjenna', 'clear'], ['clear', 'clear']
  ]);
<<<<<<< Updated upstream
=======
=======
    ['puhelin', 'phone'], ['phone', 'phone'], ['numero', 'phone'], ['puh', 'phone'],
    ['yhteys', 'contact'], ['tiedot', 'contact'], ['contact', 'contact'], ['whoami', 'contact'],
    ['github', 'github'], ['linkedin', 'linkedin'], ['viesti', 'linkedin'],
    ['cv', 'cv'], ['projektit', 'projects'],
    ['tyhjennä', 'clear'], ['tyhjenna', 'clear'], ['clear', 'clear']
  ]);

>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
  function link(text, href, external = false) {
    const anchor = node('a', text);
    anchor.href = href;
    if (external) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
    return anchor;
  }
  function revealEmail(event) {
    const button = terminal.querySelector('[data-reveal-email]');
    if (button) window.skRevealEmail?.(button, event, false);
    return terminal.querySelector('.email-contact .contact-email');
  }
  function resetOutput() {
    output.replaceChildren(node('p', 'Kirjoita apua tai valitse komento.', 'terminal-hint'));
  }
  function run(value, event) {
<<<<<<< Updated upstream
=======
=======

  function link(text, href, external = false) {
    const anchor = node('a', text);
    anchor.href = href;
    if (external) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    return anchor;
  }

  function resetOutput() {
    const hint = node('p', undefined, 'terminal-hint');
    hint.append(
      'Yhteystiedot on lukittu. Kirjoita ',
      node('strong', 'sähköposti'),
      ', ',
      node('strong', 'puhelin'),
      ', ',
      node('strong', 'yhteys'),
      ' tai ',
      node('strong', 'apua'),
      '.'
    );
    output.replaceChildren(hint);
  }

  async function copyEmailToClipboard(addr) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(addr);
        return true;
      }
    } catch (_) {}
    return false;
  }

  function run(value, event) {
    markHuman(event);
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
    const command = value.trim().slice(0, 80);
    if (!command) return;
    history.push(command);
    if (history.length > 20) history.shift();
    historyIndex = history.length;
    input.value = '';
    const action = aliases.get(command.toLocaleLowerCase('fi'));
<<<<<<< Updated upstream
    if (action === 'clear') { resetOutput(); return; }
=======
<<<<<<< HEAD
    if (action === 'clear') { resetOutput(); return; }
=======
    if (action === 'clear') {
      resetOutput();
      return;
    }
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes

    output.querySelector('.terminal-hint')?.remove();
    const entry = node('div', undefined, 'terminal-entry');
    entry.append(node('p', '$ ' + command, 'terminal-echo'));
    const result = node('div', undefined, 'terminal-result');
    entry.append(result);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
    switch (action) {
      case 'help':
        result.append(node('p', 'sähköposti · kopioi · puhelin · github · linkedin · cv · projektit · tyhjennä'));
        result.append(node('p', 'Enter suorittaa. ↑ ja ↓ selaavat aiempia komentoja.', 'terminal-muted'));
        break;
      case 'email': {
        const email = revealEmail(event);
        if (email) {
          result.append(link(email.textContent + ' ↗', email.getAttribute('href')));
          result.append(node('p', 'Avaa osoite sähköpostiohjelmaan tai kirjoita kopioi.', 'terminal-muted'));
        } else result.append(node('p', 'Näytä sähköposti yhteystietojen painikkeesta.'));
        break;
      }
      case 'copy': {
        const email = revealEmail(event);
        if (email) {
          terminal.querySelector('[data-copy]')?.click();
          result.append(node('p', 'Osoite: ' + email.textContent));
        } else result.append(node('p', 'Näytä sähköposti yhteystietojen painikkeesta.'));
        break;
      }
      case 'phone': {
        const button = terminal.querySelector('[data-reveal-phone]');
        if (button) window.skRevealPhone?.(button, event, false);
        const phone = terminal.querySelector('.phone-contact a');
        if (phone) result.append(link(phone.textContent, phone.getAttribute('href')));
        else result.append(node('p', 'Näytä numero yhteystietojen painikkeesta.'));
<<<<<<< Updated upstream
=======
=======

    switch (action) {
      case 'help':
        result.append(node('p', 'sähköposti · puhelin · yhteys · kopioi · linkedin · github · cv · projektit · tyhjennä'));
        result.append(node('p', 'Suorat yhteystiedot puretaan vain terminaalikomennoilla. Enter suorittaa, ↑ ja ↓ selaavat historiaa.', 'terminal-muted'));
        break;
      case 'email': {
        const addr = unlock(vault.e, event);
        const scheme = unlock(vault.m, event);
        if (addr) {
          result.append(link(addr + ' ↗', scheme + addr));
          result.append(node('p', 'Avaa sähköpostiohjelmaan tai kopioi komennolla kopioi.', 'terminal-muted'));
        }
        break;
      }
      case 'copy': {
        const addr = unlock(vault.e, event);
        if (addr) {
          const msg = node('p', 'Osoite: ' + addr);
          result.append(msg);
          copyEmailToClipboard(addr).then(copied => {
            result.append(node('p', copied ? 'Kopioitu leikepöydälle.' : 'Kopioi osoite yltä.', 'terminal-muted'));
          });
        }
        break;
      }
      case 'phone': {
        const disp = unlock(vault.p, event);
        const tel = unlock(vault.t, event);
        if (disp) {
          result.append(link(disp + ' ↗', tel));
          result.append(node('p', 'Suora puhelinnumero avattu istuntoon. Poista näkyvistä komennolla tyhjennä.', 'terminal-muted'));
        }
        break;
      }
      case 'contact': {
        const addr = unlock(vault.e, event);
        const scheme = unlock(vault.m, event);
        const disp = unlock(vault.p, event);
        const tel = unlock(vault.t, event);
        if (addr && disp) {
          const row1 = node('p');
          row1.append('Sähköposti: ', link(addr + ' ↗', scheme + addr));
          const row2 = node('p');
          row2.append('Puhelin: ', link(disp + ' ↗', tel));
          result.append(row1, row2);
          result.append(node('p', 'Voit tyhjentää näkymän komennolla tyhjennä.', 'terminal-muted'));
        }
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
        break;
      }
      case 'github':
        result.append(link('github.com/SamiKares ↗', 'https://github.com/SamiKares', true));
        break;
      case 'linkedin':
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
        result.append(link('LinkedIn / Sami Karesniemi ↗', 'https://www.linkedin.com/in/sami-karesniemi/', true));
        break;
      case 'cv': {
        const download = link('Lataa CV / PDF ↓', 'assets/documents/sami-karesniemi-cv-20261102-v2.pdf');
<<<<<<< Updated upstream
=======
=======
        result.append(link('LinkedIn / Sami Karesniemi — Lähetä viesti ↗', 'https://www.linkedin.com/in/sami-karesniemi/', true));
        break;
      case 'cv': {
        const heroCv = document.querySelector('.hero-actions a[download]')?.getAttribute('href') || 'assets/documents/sami-karesniemi-cv-20261102-v2.pdf';
        const download = link('Lataa CV / PDF ↓', heroCv);
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
        download.download = 'Sami_Karesniemi_CV.pdf';
        result.append(download);
        break;
      }
      case 'projects':
        result.append(link('Avaa projektit ↗', 'ai.html'));
        break;
      default:
        result.append(node('p', 'Tuntematon komento. Kirjoita apua.', 'terminal-muted'));
    }
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======

>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
    output.append(entry);
    while (output.childElementCount > 6) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
  }
<<<<<<< Updated upstream
  form.addEventListener('submit', event => { event.preventDefault(); run(input.value, event); });
=======
<<<<<<< HEAD
  form.addEventListener('submit', event => { event.preventDefault(); run(input.value, event); });
=======

  form.addEventListener('submit', event => {
    event.preventDefault();
    run(input.value, event);
  });
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
  terminal.querySelectorAll('[data-terminal-command]').forEach(button => {
    button.addEventListener('click', event => run(button.dataset.terminalCommand, event));
  });
  input.addEventListener('keydown', event => {
<<<<<<< Updated upstream
    if (event.key === 'Escape') { input.value = ''; historyIndex = history.length; return; }
=======
<<<<<<< HEAD
    if (event.key === 'Escape') { input.value = ''; historyIndex = history.length; return; }
=======
    if (event.key === 'Escape') {
      input.value = '';
      historyIndex = history.length;
      return;
    }
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
    if (!history.length || !['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = history[historyIndex] || '';
    input.setSelectionRange(input.value.length, input.value.length);
  });
  session.hidden = false;
  terminal.classList.add('terminal-ready');
<<<<<<< Updated upstream
});
=======
<<<<<<< HEAD
});
=======
})();
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
