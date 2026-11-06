Kevyt päivityspaketti: säilytä GitHubin assets/photography-kansion alkuperäiset kuvat.

# Sami Karesniemi — portfolio

Valmis staattinen sivusto. Ei asennusta, rakennusvaihetta tai ulkoisia JavaScript- ja fonttipalveluja. Julkaistavat tiedostot ovat `dist`-kansiossa.

Sivutekstit ja otsikot on tiivistetty 2.11.2026. Tekstit kuvaavat suoraan työtä, työkaluja ja projektien tilaa.

## Käyttö

Avaa `index.html` selaimessa. Julkaise sivusto kopioimalla `dist`-kansion sisältö palvelimen tai GitHub Pages -repositorion juureen. `index.html` ja `assets` kuuluvat samalle tasolle. Säilytä olemassa oleva `CNAME`, jos käytössäsi on oma verkkotunnus.

## Sisältö

- `index.html`: CV, työkokemus, osaaminen, projektinostot ja yhteystiedot.
- `ai.html`: 12 projektikuvausta, suodatus ja konenäön tilalogiikan selaindemo.
- `photography.html`: 190 kuvaa, suodatus ja kuvakatselu. Kuvat haetaan alkuperäisillä JPG-tiedostonimillä `assets/photography/`-kansiosta. Paketti sisältää liitteen kaikki 215 JPG-tiedostoa; samojen kuvien rinnakkaisversioita ei toisteta galleriassa.
- `cv.html`: erillinen CV-näkymä. Sivuilla on myös tulostustyylit.
- `assets/documents/sami-karesniemi-cv-20261102-v2.pdf`: Yhden A4-sivun CV: nykyinen KLINGER-rooli, insinöörityö, projektit, koulutus ja oma labra.

Sisältöjä voi muokata suoraan HTML-tiedostoista. Projektikuvausten lähde on `projects-data.js` ja kuva-arkiston lähde `assets/gallery-data.js`. Perusulkoasu on `style.css`-tiedostossa. Yhteystietoterminaali, projektinostot ja kilpisiirtymä käyttävät lisäksi omia CSS-tiedostojaan. Sivujen yhteiset toiminnot ovat `common.js`-tiedostossa; projekti- ja galleriatoiminnot omissa tiedostoissaan.

Konenäköhavainne on selaimessa toimiva tilasimulaatio. Se ei muodosta kamerayhteyttä tai käytä tunnistusmallia. Projektien tilat on erotettu valmiisiin ratkaisuihin, kehitystyöhön ja kokeiluihin.

## Käyttöliittymä

Sivujen vaihdossa näkymä jakautuu rekursiivisesti muodostettuihin kolmiopaloihin. Palat erkanevat vaiheittain, kiertyvät laajalle ja kokoavat seuraavan sivun samoista kohdista. Jokainen vaihto saa uuden satunnaissiemenen; jako, lentoradat ja napsautuskohdasta etenevä ajoitus vaihtuvat. Toteutus käyttää sivun todellista sisältöä ja selaimen Web Animations APIa, ilman ulkoisia animaatiokirjastoja.

`fractal-geometry.js` muodostaa jaon, `fractal-navigation.js` hoitaa sivunvaihdon ja `fractal-navigation.css` siirtymän kerroksen. `page-lifecycle.js` vapauttaa vanhan sivun tapahtumakuuntelijat, ajastimet ja tarkkailijat ennen uuden sivun alustamista. Mobiilissa paloja on 24, tabletissa 36 ja suurella näytöllä 52. Takaisin/eteenpäin-selaus ja suorat projektilinkit toimivat. Liikkeen vähentämisen asetuksella sekä paikallisessa `file://`-avauksessa käytetään tavallista sivunvaihtoa. Animaatiot toimivat HTTP(S)-palvelimella, esimerkiksi GitHub Pagesissa.

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

Yhteystietoterminaali toimii tiedostoilla `contact-terminal.js` ja `contact-terminal.css`. Komennot: `apua`, `sähköposti`, `kopioi`, `puhelin`, `github`, `linkedin`, `cv`, `projektit`, `tyhjennä`. Nuolinäppäimet selaavat komentoja. Toiminnot käsittelevät yhteystietoja ja linkkejä selaimessa. Sähköpostiosoite ja puhelinnumero tuodaan näkyviin vasta käyttäjän painalluksella tai yhteystietokomennolla. Myös sähköpostin kopiointipainike näkyy vasta osoitteen avaamisen jälkeen. Konenäköhavainteen hihna on vaakasuorassa.

GitHub-päivityksen ohje on `GITHUB_PAIVITYS.md`. Kuvausten tarkistuslähteet ovat `PROJEKTILAHTEET.md`-tiedostossa.

Profiili painottaa päätelaitehallintaa, tietoturva-automaatiota ja teollisuuden Edge AI:ta. Virallinen KLINGER-tehtävänimike säilyy työhistoriassa. Elektroniikan ja tietoliikenteen pohja näkyy jo alussa; Heltech-opinnot on päivitetty vuosiin 2005–2009. Aiempi logistiikkaura on tiivistetty. Myös erillinen CV-näkymä sisältää kolme projektinostoa. Oma labra kertoo tiedonpalautuksesta, laitteistosta ja paikallisen tekoälyn kokeiluista. Nessus on kuvattu haavoittuvuuksien hallinnan ja auditoinnin työkaluna.
