'use strict';
// Click-to-reveal reduces simple harvesting. All client-side data can be decoded.
(() => {
  const data = {
    "email": {
      "to": "c2FtaUBrYXJlc25pZW1pLmZp",
      "cc": "c2FtaS5rYXJlc25pZW1pQGdtYWlsLmNvbQ=="
    },
    "phone": {
      "value": "KzM1ODQ1MTA1MTYxNg==",
      "label": "KzM1OCA0NSAxMDUgMTYxNg=="
    }
  };
  document.querySelectorAll('[data-contact-kind]').forEach(group => {
    const kind = group.dataset.contactKind;
    const button = group.querySelector('button');
    const output = group.querySelector('.contact-reveal-output');
    if (!button || !output || !data[kind]) return;
    const name = kind === 'email' ? 'sähköposti' : 'puhelinnumero';
    function buttonLabel(open) {
      const symbol = document.createElement('span');
      symbol.setAttribute('aria-hidden', 'true');
      symbol.textContent = open ? '−' : '＋';
      button.replaceChildren(document.createTextNode((open ? 'Piilota ' : 'Näytä ') + name + ' '), symbol);
    }
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      buttonLabel(open);
      output.replaceChildren();
      output.hidden = !open;
      if (!open) return;
      const link = document.createElement('a');
      if (kind === 'email') {
        const to = atob(data.email.to);
        link.textContent = to;
        link.href = 'mailto:' + to + '?cc=' + encodeURIComponent(atob(data.email.cc));
        link.title = 'Avaa sähköpostisovellus';
      } else {
        link.textContent = atob(data.phone.label);
        link.href = 'tel:' + atob(data.phone.value);
        link.title = 'Avaa puhelinsovellus';
      }
      output.append(link);
      link.focus({preventScroll: true});
    });
  });
})();
