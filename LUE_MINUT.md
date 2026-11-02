# Sami Karesniemi — portfolio

Kevyt päivityspaketti nykyiseen GitHub-sivustoon. Ei asennusta, rakennusvaihetta tai ulkoisia JavaScript- ja fonttipalveluja. Julkaistavat tiedostot ovat paketin juuressa.

Sivutekstit ja otsikot on tiivistetty 2.11.2026. Tekstit kuvaavat suoraan työtä, työkaluja ja projektien tilaa.

## Käyttö

Avaa `index.html` selaimessa. Julkaise sivusto kopioimalla paketin sisältö palvelimen tai GitHub Pages -repositorion juureen. `index.html` ja `assets` kuuluvat samalle tasolle. Säilytä olemassa oleva `CNAME`, jos käytössäsi on oma verkkotunnus.

## Sisältö

- `index.html`: CV, työkokemus, osaaminen, projektinostot ja yhteystiedot.
- `ai.html`: 12 projektikuvausta, suodatus ja konenäön tilalogiikan selaindemo.
- `photography.html`: 190 kuvaa, suodatus ja kuvakatselu. Kuvat haetaan alkuperäisillä JPG-tiedostonimillä `assets/photography/`-kansiosta. Alkuperäiset 215 JPG-tiedostoa säilyvät GitHubin assets/photography/-kansiossa. Valokuvat eivät sisälly tähän kevyeen päivityspakettiin; samojen kuvien rinnakkaisversioita ei toisteta galleriassa.
- `cv.html`: erillinen CV-näkymä. Sivuilla on myös tulostustyylit.
- `assets/documents/sami-karesniemi-cv-20261102.pdf`: PDF-CV, jossa päivitetyt yhteystiedot ja Turvabotti-linkki.

Sisältöjä voi muokata suoraan HTML-tiedostoista. Projektikuvausten lähde on `projects-data.js` ja kuva-arkiston lähde `assets/gallery-data.js`. Perusulkoasu on `style.css`-tiedostossa. Yhteystietoterminaali, projektinostot ja kilpisiirtymä käyttävät lisäksi omia CSS-tiedostojaan. Sivujen yhteiset toiminnot ovat `common.js`-tiedostossa; projekti- ja galleriatoiminnot omissa tiedostoissaan.

Konenäköhavainne on selaimessa toimiva tilasimulaatio. Se ei muodosta kamerayhteyttä tai käytä tunnistusmallia. Projektien tilat on erotettu valmiisiin ratkaisuihin, kehitystyöhön ja kokeiluihin.

## Käyttöliittymä

Etusivun tietoturvakilpi irtoaa alun grafiikasta vierityksen mukana. Sen kuusi osaa leviävät laajalle erillisille lentoradoille, keskiosa kasvaa ja muuttaa muotoaan, ja osat kokoontuvat ensimmäisen tietoturvaprojektin kehykseen. Hajonta mukautuu näytön leveyteen. Ylös vierittäessä se palaa takaisin. Liike on pois käytöstä, kun laitteen asetuksissa on valittu animaatioiden vähentäminen. Toteutus on tiedostoissa `security-scroll.js` ja `security-scroll.css`.

- Vaalea ja tumma teema; valinta muistetaan selaimessa.
- Näppäimistöllä käytettävät välilehdet, dialogit ja kuvakatselu.
- `Ctrl / ⌘ K` tai `/`: sivujen ja keskeisten projektien pikahaku.
- Kuvakatselu: vasen/oikea nuoli, kosketuspyyhkäisy, `Esc` sulkee.
- Liikkeen vähentämisen käyttöjärjestelmäasetus huomioidaan.
- Sisältöjen perusnäkymät toimivat myös ilman JavaScriptiä.

## Tarkistus 2.11.2026

Etusivu, projektisivu ja valokuva-arkisto tarkistettiin selaimessa 320, 375, 768 ja 1440 pikselin levyisissä kehyksissä. Sivusuuntaista ylivuotoa ei havaittu korjausten jälkeen. Projektisuodatus, projektikuvaukset, gallerian suodatus ja lisälataus, kuvien näppäimistöselaus, mobiilivalikko, pikahaku sekä teemavaihto testattiin. Konenäköhavainteesta tarkistettiin puuttuvan kohteen viive, poikkeama, palautus ja nollaus. Staattinen tarkistus varmisti HTML-linkit, ankkurit, CSS- ja JS-viittaukset sekä kaikki gallerian kuvatiedostot. JavaScript-tiedostojen syntaksi tarkistettiin Nodella.

Fonttien lisenssit ovat `assets/fonts/LICENSE.txt`-tiedostossa. Valokuvat © Sami Karesniemi.

SOC- ja LLM Office Simulation -projekteissa on kuvakaappaukset. Pieni esikatselu avaa projektikuvauksen; kuvan voi avata myös alkuperäiskoossa. Puhelinnumero näytetään vasta käyttäjän painalluksesta, eikä sitä ole sivun HTML:ssä tai PDF-CV:ssä.

Valokuva-arkiston polut: `assets/gallery-data.js` ja HTML:n ensimmäiset 18 kuvaa käyttävät samoja `assets/photography/*.jpg`-tiedostoja. Säilytä tiedostonimien isot kirjaimet, välilyönnit ja ääkköset. Osoitteissa ne on URL-koodattu; levyllä nimet pysyvät alkuperäisinä.

## Uusimmat muutokset

Projektit alkavat Data-Driven Endpoint Securitystä, SOC Command Centeristä, teollisuuden konenäöstä, SafetyScanista ja laiteinventaarion tietokannasta. Tietokannan ja reaaliaikaisten CVE- sekä kyberturvasyötteiden yhteys kuvataan insinöörityön yhteydessä. SafetyScan on turvavarusteiden käytön konenäköseurantaan tarkoitettu prototyyppi. PowerShell-ohjatut Intune-päivitykset sisältävät Adobe Readerin ja Acrobatin esimerkin.

Yhteystietoterminaali toimii tiedostoilla `contact-terminal.js` ja `contact-terminal.css`. Komennot: `apua`, `sähköposti`, `kopioi`, `puhelin`, `github`, `linkedin`, `cv`, `projektit`, `tyhjennä`. Nuolinäppäimet selaavat komentoja. Toiminnot käsittelevät yhteystietoja ja linkkejä selaimessa. Puhelinnumero tuodaan näkyviin vasta käyttäjän toiminnolla. Konenäköhavainteen hihna on vaakasuorassa.

GitHub-päivityksen ohje on `GITHUB_PAIVITYS.md`. Kuvausten tarkistuslähteet ovat `PROJEKTILAHTEET.md`-tiedostossa.
