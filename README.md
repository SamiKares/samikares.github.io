# Sami Karesniemi — Custom AI & yritys-IT

GitHub Pagesiin valmis henkilökohtainen sivusto. Versio 15.10.2026.

Mukana ovat mustavalkoinen ulkoasu, nykyisen työn osaaminen, kuusi Custom AI -projektia, 152 valokuvan arkisto ja CV. Konenäkö on pienempi projektiesimerkki, jonka demon voi avata erikseen.

## Julkaise nykyiseen samikares.github.io-repositorioon

1. Pura ZIP omalle koneelle. Etsi kansio, jossa index.html on suoraan näkyvissä.
2. Avaa nykyinen samikares.github.io-repositoriosi GitHub Desktopissa. Jos sitä ei vielä ole koneella, käytä File → Clone Repository ja valitse kyseinen repositorio.
3. Kopioi puretun paketin kaikki tiedostot ja assets-kansio tämän paikallisen repositorion juureen. Korvaa samannimiset tiedostot. Ota mukaan myös .nojekyll.
4. Tarkista muutokset GitHub Desktopissa, kirjoita yhteenveto, esimerkiksi ”Päivitä portfolio”, ja valitse Commit to main. Lähetä päivitys painikkeella Push origin.
5. Avaa GitHubissa repositorion Settings → Pages. Valitse Source: Deploy from a branch, Branch: main ja kansio: /(root). Paina Save.
6. Avaa Pages-asetuksissa näkyvä sivuston osoite, kun julkaisu on valmistunut.

GitHubiin siirretään puretut tiedostot. Pelkän ZIP-tiedoston lataaminen repositorioon ei asenna sivustoa. index.html kuuluu repon juureen, ei erilliseen alikansioon.

Paketin .nojekyll ohjaa julkaisemaan staattiset tiedostot sellaisinaan. Jos repositoriossa on jo oma domain ja CNAME-tiedosto, säilytä nykyinen CNAME ja domain-asetus.

## Jos lataat tiedostot GitHubin selaimessa

Käytä repositorion Add file → Upload files -toimintoa. GitHubin selainlatauksessa voi siirtää enintään 100 tiedostoa kerralla, joten lataa valokuvat kahdessa erässä. Säilytä paketin kansiorakenne: kuvat kuuluvat assets/photography-kansioon. GitHub Desktopilla voit siirtää koko päivityksen yhdessä commitissa.

## Kokeile omalla koneella

Avaa index.html selaimessa. Sivut käyttävät suhteellisia polkuja, joten sama paketti toimii GitHub Pagesin juuriosoitteessa ja projektin alihakemistossa. Kuvagalleria ja muut toiminnot toimivat paikallisilla JavaScript-tiedostoilla.

## Sivut ja tiedostot

- index.html: etusivu, nykyinen työ ja projektiesimerkit
- ai.html: Custom AI, avustajat, agentit ja dokumenttihaku
- photography.html: 152 valokuvan arkisto
- cv.html: työkokemus, koulutus ja osaaminen
- assets/documents/sami-karesniemi-cv.pdf: alkuperäinen PDF-CV
- assets/photography/: valokuvat
- style.css, portfolio.css ja premium.css: ulkoasu
- common.js, app.js, gallery.js ja assets/gallery-data.js: navigaatio ja sivujen toiminnot

## Tarkistettu

Paketin sivujen väliset linkit, kuvat, CSS- ja JavaScript-viittaukset sekä galleriadata tarkistettiin sekä juuriosoitteen että projektihakemiston poluilla. Kaikki 152 valokuvaa ovat mukana. Visuaalista selaintarkistusta tai julkaisua omalle GitHub-tilillesi ei tehty paketin luomisen yhteydessä.

GitHubin ohjeet:

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop
- https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
