(() => {
  'use strict';
  const terminal = document.querySelector('.contact-terminal');
  if (!terminal) return;
  const session = terminal.querySelector('.terminal-session');
  const form = terminal.querySelector('.terminal-command');
  const input = terminal.querySelector('#contact-command');
  const output = terminal.querySelector('.terminal-output');
  if (!session || !form || !input || !output) return;

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

  const history = [];
  let historyIndex = 0;
  const aliases = new Map([
    ['apua', 'help'], ['help', 'help'], ['?', 'help'],
    ['sähköposti', 'email'], ['sahkoposti', 'email'], ['email', 'email'], ['mail', 'email'],
    ['kopioi', 'copy'], ['copy', 'copy'],
    ['puhelin', 'phone'], ['phone', 'phone'], ['numero', 'phone'], ['puh', 'phone'],
    ['yhteys', 'contact'], ['tiedot', 'contact'], ['contact', 'contact'], ['whoami', 'contact'],
    ['github', 'github'], ['linkedin', 'linkedin'], ['viesti', 'linkedin'],
    ['cv', 'cv'], ['projektit', 'projects'],
    ['tyhjennä', 'clear'], ['tyhjenna', 'clear'], ['clear', 'clear']
  ]);

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

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
    const command = value.trim().slice(0, 80);
    if (!command) return;
    history.push(command);
    if (history.length > 20) history.shift();
    historyIndex = history.length;
    input.value = '';
    const action = aliases.get(command.toLocaleLowerCase('fi'));
    if (action === 'clear') {
      resetOutput();
      return;
    }

    output.querySelector('.terminal-hint')?.remove();
    const entry = node('div', undefined, 'terminal-entry');
    entry.append(node('p', '$ ' + command, 'terminal-echo'));
    const result = node('div', undefined, 'terminal-result');
    entry.append(result);

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
        break;
      }
      case 'github':
        result.append(link('github.com/SamiKares ↗', 'https://github.com/SamiKares', true));
        break;
      case 'linkedin':
        result.append(link('LinkedIn / Sami Karesniemi — Lähetä viesti ↗', 'https://www.linkedin.com/in/sami-karesniemi/', true));
        break;
      case 'cv': {
        const heroCv = document.querySelector('.hero-actions a[download]')?.getAttribute('href') || 'assets/documents/sami-karesniemi-cv-20261102-v2.pdf';
        const download = link('Lataa CV / PDF ↓', heroCv);
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

    output.append(entry);
    while (output.childElementCount > 6) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    run(input.value, event);
  });
  terminal.querySelectorAll('[data-terminal-command]').forEach(button => {
    button.addEventListener('click', event => run(button.dataset.terminalCommand, event));
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      input.value = '';
      historyIndex = history.length;
      return;
    }
    if (!history.length || !['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = history[historyIndex] || '';
    input.setSelectionRange(input.value.length, input.value.length);
  });
  session.hidden = false;
  terminal.classList.add('terminal-ready');
})();
