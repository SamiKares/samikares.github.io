# GitHub Pages — Editorial / Geometry 2026-10-15

## Päivitys

Pura ZIP. Kopioi sen sisältö nykyisen repositorion juureen main-haaraan ja hyväksy tiedostojen korvaaminen. index.html tulee suoraan juureen. main on haaran nimi, ei uusi kansio.

Päivityspaketti sisältää kaikki viimeksi lähettämäsi samikares.github.io-main(1).zip-version jälkeen muuttuneet ja lisätyt tiedostot. Voit käyttää sitä myös edellisen päivityspaketin päälle. Valokuva-arkistoa ei tarvitse ladata uudelleen. Älä poista olemassa olevaa assets/photography/-kansiota.

GitHubin verkkosivulla: avaa repositorio, valitse main, Add file > Upload files, vedä puretun paketin sisältö juureen ja Commit changes. Säilytä assets-kansion rakenne. Varmista, että myös .nojekyll siirtyy mukaan.

GitHub Desktop: avaa tai kloonaa oikea repositorio, valitse main, Fetch origin ja tarvittaessa Pull origin. Kopioi puretun ZIPin sisältö paikallisen repositorion juureen. Tarkista Changes-lista, Commit to main ja Push origin. Voit kopioida koko täyden paketin; vain muuttuneet tiedostot näkyvät muutoksina.

Settings > Pages: Source = Deploy from a branch, Branch = main, Folder = /(root). Seuraa julkaisun onnistumista Actions-välilehdeltä. Päivitä selain tarvittaessa Ctrl+F5.

## Uusi ilme

Paperinvalkoinen hero, suuret serif-otsikot, tummat sisältöosiot ja hillitty salvianvihreä geometria. Delta Cafés ja Heron AI toimivat visuaalisina esikuvina. Kaikki SVG-kuviot on piirretty tätä sivustoa varten. Ei ulkoisia fontteja, kirjastoja tai AI-kuvia.

Geometrinen osaamiskartta vaihtaa Custom AI:n, yritys-IT:n ja tietoturvan välillä. Valokuva-arkiston alkuperäiset nimet, suorat kuvalinkit ja suodattimet säilyvät.

## Tarkistukset

Navigaatio, projektisuodatus, tapauskuvaukset, galleria, kuvalinkit, osaamiskartan painikkeet ja reduced-motion on tarkistettu ohjelmallisesti. Staattiset polut toimivat sekä osoitteen juuressa että repositorion alikansiossa. Visuaalinen selaintarkistus ei ollut käytettävissä.

# Sami Karesniemi — Tekniikkaa käytännössä

Suomenkielinen henkilökohtainen portfolio. Riippuvuudeton HTML/CSS/JavaScript-toteutus painottaa räätälöityjä AI-työkaluja, nykyisen työn yritys-IT-osaamista, tietoturvaa ja automaatiota. Mukana ovat myös valokuvaus ja CV.

Visuaalinen suunta yhdistää Delta Cafésin toimituksellista rytmiä ja Heron AI:n teknistä piirroskieltä: paperinvalkoinen aloitus, suuret serif-otsikot, tummat sisältöosiot ja hillitty salvianvihreä geometria. Kuviot ovat alkuperäisiä SVG/CSS-elementtejä. Esikuvien kuvia, logoja tai koodia ei ole käytetty. Kaikkien neljän sivun yhteinen viimeistely on editorial.css-tiedostossa. Geometrinen osaamiskartta vaihtaa painopistettä Custom AI:n, yritys-IT:n ja tietoturvan välillä. Liike huomioi reduced-motion-asetuksen.

Etusivun kärki on kuvaton. Tausta- ja CV-osioissa käytetään pieniä, viiveellä ladattavia WebP-henkilökuvia; valokuva-arkiston kuvat säilyvät alkuperäisissä väreissä. Sivusto ei lataa ulkoisia fontteja, kirjastoja tai AI-kuvia. Visuaalinen selaintarkistus ei ollut käytettävissä.

## Sisältö

- Räätälöidyt AI-työkalut, yritys-IT, tietoturva ja automaatio
- Nykyisen työn oma osio: Microsoft 365, Intune, Entra ID, käyttäjätuki, päätelaitteet ja ISO 27001 -käytäntöjen tukeminen
- Projektien suodatus ja avattavat tapauskuvaukset
- Konenäkö pienempänä, viimeisenä projektiesimerkkinä; selainhavainnollistus avautuu erikseen details-elementistä
- Kuusi GitHub-projektia Custom AI -sivulla
- 151 valokuvan arkisto, neljä kategoriaa, erissä lataus ja näppäimistöllä selattava kuvannäkymä
- Osaaminen, työhistoria, koulutus, henkilökuva ja suorat yhteystiedot
- Lähdepaketin PDF-CV muuttamattomana

Simulaatio ei käsittele kamerakuvaa. Projektien tilat erottavat testatut toteutukset, demot ja jatkokehityksen. Asiakasympäristöjen yksityiskohtia ei julkaista.

## Rakenne

Etusivu on dist/index.html, Custom AI dist/ai.html, kuva-arkisto dist/photography.html ja CV dist/cv.html. Tyylit ovat style.css- ja portfolio.css-tiedostoissa. geometry.js käsittelee geometrisen osaamiskartan. common.js käsittelee navigaation, app.js etusivun vuorovaikutukset ja gallery.js galleriat. Kuvat ja galleriadata ovat assets-hakemistossa. Hosting-asetukset ovat .openai/hosting.json-tiedostossa. Sivustolla ei ole lomakepalvelua, analytiikkaa tai ulkoisia fonttiriippuvuuksia.

## Tarkistukset

JavaScriptin syntaksi sekä kaikkien neljän HTML-sivun ankkurit, sivujen väliset linkit, tiedostoviittaukset ja yksilölliset tunnisteet tarkistettiin. Navigaatio, projektisuodatus, kaikkien neljän kuvauksen avaus ja sulkeminen sekä simulaation viive, palautus ja nollaus tarkistettiin DOM-harnessilla. Myös 151 kuvan arkiston suodatus ja lisälataus sekä valokuva-arkiston avaaminen, nuolinäppäimet, kuvasta toiseen siirtyminen ja kohdistuksen palautus tarkistettiin. Kaikki 151 valokuvaa löytyvät; kymmenen generoitua kuvaa ja niiden galleria on poistettu julkaistavasta sisällöstä ja PDF:n tavut vastaavat lähdepakettia. Visuaalista selaintarkistusta ja ulkoisten GitHub-linkkien live-varmistusta ei voitu suorittaa tässä ympäristössä.

Sisältöpainotus päivitetty 15.10.2026: custom AI ja nykyinen työ nostettu etusivun kärkeen. Etusivulla on viisi projektikorttia, joista ensimmäinen esittelee custom AI -projekteja. Konenäkö on viimeinen ja sen demo avataan erikseen. AI-sivulla ei ole enää kuvagalleriaa, gallerian skriptejä eikä generoituja kuvatiedostoja. PDF-CV säilyy lähdepaketin versiona.

Henkilökuva optimoitu: alkuperäinen 4 414 416 tavun PNG korvattu 3 228 ja 11 000 tavun WebP-versioilla. Kuvan roolia pienennetty: etusivun hero-omakuva poistettu, taustan kuva 80 px ja CV:n kuva 64 px. Molemmissa srcset, lazy loading ja async decoding. Vanhaa PNG:tä ei sisällytetä julkaisuun tai GitHub-pakettiin.

Kuvanimi- ja linkkikorjaus: galleria käyttää alkuperäisiä tiedostonimiä. Geneeriset luokka/numero-kuvatekstit on korvattu nimillä. Kuvapolut URL-koodataan myös ääkkösille ja välilyönneille. Etusivun esikatseluista on suorat kuva-kohtaiset linkit galleriaan. Galleriakortit ovat alkuperäisiin tiedostoihin osoittavia linkkejä, jotka toimivat myös ilman JavaScriptiä. Yksi saman kuvan kaksoismerkintä yhdistetty; sen kaksi kategoriaa säilyvät.
