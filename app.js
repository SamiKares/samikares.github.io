'use strict';

const projects = {
  vision: {
    category: '05 / KONENÄKÖ · TOIMIVA DEMO',
    title: 'Paikallinen konenäkö käytännön testipenkissä.',
    intro: 'Modulaarinen konenäköprojekti yhdistää kameran, tunnistusmallin ja tapahtumatiedon. Lähtökohtana on käsitellä kuva asiakkaan omassa verkossa tai paikallisella tietokoneella.',
    blocks: [
      ['Ongelma', 'Pelkkä kamerakuva ei kerro, onko oikea määrä kohteita oikeissa paikoissa. Ensimmäinen käyttötapaus on kolmen paikan valvonta: puuttuuko yksi kohde, ja milloin siitä pitää ilmoittaa?'],
      ['Rakennettu pohja', 'Demoprojektissa on käytetty webkameraa ja RTSP-videota, Pythonia, OpenCV:tä sekä YOLO-tunnistusta. Hanwha-kameran RTSP-yhteys on saatu toimimaan. Tapahtumien ja kuvien paikallinen tallennus kuuluu kehitettyyn demopohjaan.'],
      ['Mitä tällä sivulla voi kokeilla', 'Selaimen simulaatio havainnollistaa aluekohtaista valvontaa. Poista keskimmäinen kohde: lyhyen tarkistusviiveen jälkeen tila muuttuu poikkeamaksi. Palauta kohde tai nollaa havainne. Sivun demo ei käytä kameraa tai tunnistusmallia.'],
      ['Jatkokehitys', 'Usean kameran hallinta, alueiden säätö ja tapahtumien välittäminen Wisenet WAVE -järjestelmään ovat jatkokehityksen tavoitteita. Integraation tuotantovalmiutta ei ole vahvistettu.']
    ]
  },
  endpoint: {
    category: '02 / LAITEHALLINTA · KEHITYSTYÖ',
    title: 'Laitetiedosta korjaustyön lähtökohdaksi.',
    intro: 'Laite voi löytyä inventaariosta, vaikka sen hallinta- tai suojaustilasta ei olisi tuoretta näyttöä. Siksi tiedot pitää yhdistää ja niiden merkitys erottaa toisistaan.',
    blocks: [
      ['Ongelma', 'M-Filesin, Intunen, Entran ja päätelaitesuojausten tiedot kuvaavat laitetta eri näkökulmista. Päällekkäiset nimet ja puuttuvat tiedot tekevät kokonaisuudesta vaikeasti luettavan.'],
      ['Työtapa', 'Normalisoin laitenimet, yhdistän saman laitteen eri lähteistä ja pidän näkyvissä vain selvityksen kannalta olennaiset tiedot. Tavoitteena on löytää nopeasti laitteet, joiden aktiivisuus tai hallintaan liittyminen vaatii tutkimista.'],
      ['Kehitetty kokonaisuus', 'Projektissa on koottu yhteisiä työtaulukoita ja tutkittu hallintaan liittymisen poikkeamia. Samasta ajatuksesta kehittyy opinnäytetyön aihe: inventaarion, haavoittuvuustiedon ja Intune-korjausten yhdistäminen.'],
      ['Miten tulos varmistetaan', 'Inventaarion merkintä ei yksin todista laitteen käyttöä tai suojausta. Korjauksen vaikutus täytyy tarkistaa uudesta lähdetiedosta tai kohdennetusta jälkitarkistuksesta. Tässä portfoliossa ei esitetä vahvistamattomia parannusprosentteja.']
    ]
  },
  adobe: {
    category: '03 / AUTOMAATIO · TESTATTU RATKAISU',
    title: 'Tunnista tuote. Kohdista päivitys.',
    intro: 'Yhden asennuspolun piti riittää. Käytännössä Readerin ja lisensoidun Acrobatin erottaminen osoittautui tarpeelliseksi.',
    blocks: [
      ['Ongelma', 'Yhteinen asennusratkaisu alkoi pyytää lisenssiä myös käyttötapauksessa, jossa tarvittiin vain Reader. Tuotteiden käsittely samalla tavalla ei vastannut ympäristön todellista tilannetta.'],
      ['Ratkaisu', 'Tein omat PowerShell-skriptit, jotka tunnistavat, onko koneessa Adobe Reader vai Acrobatin täysversio. Asennus- ja päivityspolku valitaan tunnistetun tuotteen mukaan.'],
      ['Tilanne', 'Readerin ja Acrobatin erottelu on testattu toimivaksi. Sovelluspaketointi ja jakelun hallinta liittyvät laajempaan Intune-työhön. Tämän sivun koodi kuvaa periaatetta, eikä se ole suoraan ajettava asennusskripti.'],
      ['Mitä työ opetti', 'Hyvä automaatio tarkistaa ensin lähtötilan. Kun tunnistus, kohdistus ja jälkitarkistus ovat selkeitä, myös virhetilanteita on helpompi selvittää.']
    ]
  },
  security: {
    category: '04 / TIETOTURVA · PROTOTYYPIT',
    title: 'Havainnot tarvitsevat kontekstin.',
    intro: 'Kaksi rinnakkaista kehitysprojektia: verkkoliikenteen selkeämpi tilannekuva ja henkilökohtainen työkalu olennaisten haavoittuvuustiedotteiden löytämiseen.',
    blocks: [
      ['Verkkoliikenteen visualisointi', 'Fortinet-telemetrian näkymiä on kehitetty liikenteen, sovellusten ja yhteyksien tarkasteluun. Työssä on huomioitu myös yhden näytön ja pystynäyttöjen erilaiset asettelut sekä näkymän keveys.'],
      ['Henkilökohtainen haavoittuvuustarkistin', 'Python- ja PowerShell-projekti vertaa haavoittuvuustiedotteita omaan laite- ja ohjelmistolistaan. Nessus-aineistoa on käytetty seurattavien tuotteiden tunnistamiseen. Työkalua kehitetään henkilökohtaiseen, paikalliseen käyttöön.'],
      ['Tavoiteltu hyöty', 'Havainto yhdistetään siihen, mitä ympäristössä todella on. Tarkoitus on helpottaa jatkoselvityksen kohdistamista ja vähentää käsin tehtävää lähteiden läpikäyntiä.'],
      ['Rajaus', 'Prototyypit tukevat tarkastelua ja priorisointia. Yksittäinen CVE-osuma tai liikennekuva ei yksin vahvista haavoittuvuutta tai tietoturvapoikkeamaa. Sivun verkkografiikka on havainne.']
    ]
  }
};

const filterButtons = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.project-card')];
function selectFilter(filter) {
  filterButtons.forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    const visible = filter === 'all' || card.dataset.categories.split(' ').includes(filter);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#filter-status').textContent = count + ' projektia näkyvissä.';
}
filterButtons.forEach(button => button.addEventListener('click', () => selectFilter(button.dataset.filter)));
document.querySelectorAll('a[href="#demo"]').forEach(link => link.addEventListener('click', () => selectFilter('all')));

const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
function closeDialog() { dialog.close(); }
document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  dialogTrigger = button;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const body = document.querySelector('#dialog-body');
  body.replaceChildren();
  project.blocks.forEach(([title, content]) => {
    const section = document.createElement('section');
    section.className = 'case-block';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    section.append(heading, paragraph);
    body.append(section);
  });
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}));
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) closeDialog(); });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; if (dialogTrigger) dialogTrigger.focus(); });

const toggle = document.querySelector('#demo-toggle');
const slot = document.querySelector('#middle-slot');
const slotStatus = document.querySelector('#middle-status');
const demoStatus = document.querySelector('#demo-status');
const demoOutput = document.querySelector('.demo-output');
let missing = false;
let pendingTimer;
function setDemoMissing(value) {
  clearTimeout(pendingTimer);
  missing = value;
  slot.classList.toggle('missing', missing);
  toggle.setAttribute('aria-pressed', String(missing));
  toggle.replaceChildren(document.createTextNode(missing ? 'Palauta kohde ' : 'Poista yksi kohde '));
  const symbol = document.createElement('span');
  symbol.setAttribute('aria-hidden', 'true');
  symbol.textContent = missing ? '+' : '−';
  toggle.append(symbol);
  demoOutput.classList.remove('warning');
  slotStatus.textContent = missing ? 'Kohde puuttuu' : 'Kohde löytyi';
  demoStatus.textContent = missing ? '2/3 kohdetta. Tarkistetaan poikkeamaa…' : '3/3 kohdetta. Kaikki paikallaan.';
  if (missing) pendingTimer = setTimeout(() => {
    demoOutput.classList.add('warning');
    demoStatus.textContent = 'Poikkeama: alueelta 02 puuttuu kohde.';
  }, 1400);
}
toggle.addEventListener('click', () => setDemoMissing(!missing));
document.querySelector('#demo-reset').addEventListener('click', () => setDemoMissing(false));

