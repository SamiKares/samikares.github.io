# Päivitys GitHubiin

Kohde: [SamiKares/samikares.github.io](https://github.com/SamiKares/samikares.github.io).

## Käytä kevyttä päivityspakettia

Pura `Sami_Karesniemi_GitHub_Paivitys.zip` omalle koneelle. Se sisältää sivuston koodin ja tarvittavat muut aineistot. Alkuperäiset valokuvat jäävät GitHubissa olevaan `assets/photography/`-kansioon.

## 1. Valitse julkaisuhaara

Tarkista repositorion **Settings → Pages → Build and deployment**, mistä haarasta sivusto julkaistaan. Valitse sama haara repositorion tiedostonäkymässä ennen tiedostojen lataamista.

Repositoriossa ovat tarkistushetkellä haarat `main` ja `mainbakcup`. Oletushaara on `mainbakcup`; julkaisuhaara määräytyy nykyisistä Pages-asetuksista.

## 2. Lataa puretut tiedostot repositorion juureen

Avaa repositorion juurikansio ja valitse **Add file → Upload files**. Vedä puretun paketin tiedostot ja `assets`-kansio latausalueelle. `index.html` tulee samalle tasolle kuin nykyinen `assets`.

Lataa paketin sisältö purettuna. Säilytä kansiorakenne. Päivitetyt samannimiset tiedostot korvaavat vanhat versiot.

| Päivitettävä osa | Tiedostot |
| --- | --- |
| Sivut | `index.html`, `ai.html`, `cv.html`, `photography.html` |
| Ulkoasu | `style.css`, `contact-terminal.css`, `project-highlights.css`, `security-scroll.css` |
| Toiminnot | `common.js`, `contact-terminal.js`, `projects.js`, `projects-data.js`, `security-scroll.js`, `gallery.js` |
| Aineistot | Paketin `assets`-kansion sisältö, kuten `gallery-data.js`, projektikuvat, fontit ja PDF-CV |
| Staattinen julkaisu | `.nojekyll`, jos tiedosto näkyy purkamisen jälkeen |

Nykyinen `assets/photography/` ja mahdollinen `CNAME` säilytetään. Kevyt paketti ei sisällä valokuvakansiota eikä muuta verkkotunnuksen asetuksia. Ohjetiedostoja voi pitää repossa dokumentaationa.

## 3. Tallenna ja tarkista

Kirjoita muutoksen kuvaukseksi esimerkiksi **Update portfolio profile and printable CV** ja tallenna muutokset valittuun julkaisuhaaraan. Jos GitHub edellyttää pull requestia, vie muutos sitä kautta samaan haaraan.

Odota Pages-julkaisun valmistumista. Avaa sivusto ja päivitä välimuisti Windowsissa painamalla **Ctrl + F5**. Tarkista:

- Etusivun profiili painottaa päätelaitehallintaa, tietoturva-automaatiota ja teollisuuden Edge AI:ta.
- PDF-CV avautuu uutena yhden A4-sivun versiona ja sisältää KLINGER-roolin.
- CV-näkymässä näkyvät kolme projektinostoa.
- Data-Driven Endpoint Security on ensimmäinen projekti.
- SOC, konenäkö, SafetyScan ja laiteinventaarion tietokanta seuraavat sitä.
- Sähköposti ja puhelinnumero ovat terminaalissa aluksi piilossa ja avautuvat painikkeesta tai komennolla.
- Yhteystietoterminaalissa toimivat `apua`, `sähköposti`, `puhelin` ja `cv`.
- Konenäködemon hihna on suorassa.
- Kuvagalleria avaa alkuperäiset JPG-kuvat.

## Täyspaketti

`Sami_Karesniemi_Portfolio.zip` sisältää lisäksi kaikki 215 alkuperäistä JPG-tiedostoa. Käytä sitä, jos rakennat sivuston tyhjään kansioon. Kevyt päivityspaketti sopii nykyiseen GitHub-repositorioon, jossa valokuvat ovat jo paikoillaan.

GitHubin ohjeet: [tiedostojen lataaminen](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) ja [Pagesin julkaisuhaara](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
