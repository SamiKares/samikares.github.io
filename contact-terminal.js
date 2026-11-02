(() => {
  'use strict';
  const terminal = document.querySelector('.contact-terminal');
  if (!terminal) return;
  const session = terminal.querySelector('.terminal-session');
  const form = terminal.querySelector('.terminal-command');
  const input = terminal.querySelector('#contact-command');
  const output = terminal.querySelector('.terminal-output');
  if (!session || !form || !input || !output) return;

  const history = [];
  let historyIndex = 0;
  const aliases = new Map([
    ['apua', 'help'], ['help', 'help'], ['?', 'help'],
    ['sähköposti', 'email'], ['sahkoposti', 'email'], ['email', 'email'], ['mail', 'email'],
    ['kopioi', 'copy'], ['copy', 'copy'],
    ['puhelin', 'phone'], ['phone', 'phone'], ['numero', 'phone'],
    ['github', 'github'], ['linkedin', 'linkedin'], ['cv', 'cv'], ['projektit', 'projects'],
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
    if (external) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
    return anchor;
  }
  function resetOutput() {
    output.replaceChildren(node('p', 'Kirjoita apua tai valitse komento.', 'terminal-hint'));
  }
  function run(value, event) {
    const command = value.trim().slice(0, 80);
    if (!command) return;
    history.push(command);
    if (history.length > 20) history.shift();
    historyIndex = history.length;
    input.value = '';
    const action = aliases.get(command.toLocaleLowerCase('fi'));
    if (action === 'clear') { resetOutput(); return; }

    output.querySelector('.terminal-hint')?.remove();
    const entry = node('div', undefined, 'terminal-entry');
    entry.append(node('p', '$ ' + command, 'terminal-echo'));
    const result = node('div', undefined, 'terminal-result');
    entry.append(result);
    switch (action) {
      case 'help':
        result.append(node('p', 'sähköposti · kopioi · puhelin · github · linkedin · cv · projektit · tyhjennä'));
        result.append(node('p', 'Enter suorittaa. ↑ ja ↓ selaavat aiempia komentoja.', 'terminal-muted'));
        break;
      case 'email':
        result.append(link('sami@karesniemi.fi ↗', 'mailto:sami@karesniemi.fi'));
        result.append(node('p', 'Avaa osoite sähköpostiohjelmaan tai kirjoita kopioi.', 'terminal-muted'));
        break;
      case 'copy':
        terminal.querySelector('[data-copy]')?.click();
        result.append(node('p', 'Osoite: sami@karesniemi.fi'));
        break;
      case 'phone': {
        const button = terminal.querySelector('[data-reveal-phone]');
        if (button) window.skRevealPhone?.(button, event, false);
        const phone = terminal.querySelector('.phone-contact a');
        if (phone) result.append(link(phone.textContent, phone.getAttribute('href')));
        else result.append(node('p', 'Näytä numero yhteystietojen painikkeesta.'));
        break;
      }
      case 'github':
        result.append(link('github.com/SamiKares ↗', 'https://github.com/SamiKares', true));
        break;
      case 'linkedin':
        result.append(link('LinkedIn / Sami Karesniemi ↗', 'https://www.linkedin.com/in/sami-karesniemi/', true));
        break;
      case 'cv': {
        const download = link('Lataa CV / PDF ↓', 'assets/documents/sami-karesniemi-cv-20261102.pdf');
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
  form.addEventListener('submit', event => { event.preventDefault(); run(input.value, event); });
  terminal.querySelectorAll('[data-terminal-command]').forEach(button => {
    button.addEventListener('click', event => run(button.dataset.terminalCommand, event));
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { input.value = ''; historyIndex = history.length; return; }
    if (!history.length || !['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = history[historyIndex] || '';
    input.setSelectionRange(input.value.length, input.value.length);
  });
  session.hidden = false;
  terminal.classList.add('terminal-ready');
})();
