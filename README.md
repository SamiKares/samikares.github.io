# Sami Karesniemi — CV & projektit, 19.10.2026

## Päivitys GitHub Pagesiin

Pura ZIP. Kopioi sen sisältö repositorion juureen main-haaraan ja hyväksy tiedostojen korvaaminen. index.html tulee suoraan juureen. main on haara, ei uusi kansio. Säilytä assets-kansion rakenne.

Pieni päivityspaketti sisältää sivuston kaikki HTML-, CSS- ja JavaScript-tiedostot, pienet henkilökuvat sekä uuden PDF-CV:n. Siinä ei ole valokuva-arkiston kuvia. Nykyinen assets/photography/-kansio säilytetään. Paketin voi kopioida myös aiempien päivityspakettien päälle; uuteen tyhjään repositorioon käytetään koko sivuston pakettia.

GitHubin verkkosivulla: valitse main, Add file > Upload files, vedä puretun paketin sisältö juureen ja Commit changes. Varmista, että myös .nojekyll siirtyy.

GitHub Desktop: avaa oikea paikallinen repositorio, valitse main ja Fetch origin / Pull origin. Kopioi paketin sisältö repositorion juureen, tarkista Changes, Commit to main ja Push origin.

Settings > Pages: Source = Deploy from a branch, Branch = main, Folder = /(root). Seuraa julkaisua Actions-välilehdeltä. Päivitä selain tarvittaessa Ctrl+F5.

## Sivut ja sisältö

- index.html: varsinainen CV, työkokemus, osaaminen, viisi projektinostoa, koulutus ja yhteys.
- ai.html: 14 projektin hakemisto suodattimineen ja avattavine kuvauksineen.
- cv.html: ohjaa vanhasta CV-osoitteesta etusivulle.
- photography.html: alkuperäinen 151 valokuvan arkisto.
- assets/documents/sami-karesniemi-cv.pdf: uusi kaksisivuinen CV.
- SISALTO_MUUTOKSET.md: kartoitus poistetusta toistosta ja sivujen sisällön työnjako.

Sisällön muokkaus onnistuu HTML-tiedostoista ilman build-työkaluja. Projektien pitkät kuvaukset ylläpidetään vain ai.html-tiedostossa. Etusivun projektinostot ovat lyhyitä linkkejä tarkkoihin ankkureihin.

resume.css viimeistelee CV-rakenteen. usability.css säilyttää 16–24 CSS-pikseliin skaalautuvan leipätekstin. Pieni henkilökuva, alkuperäiset valokuvat ja geometrinen SVG eivät tarvitse ulkoisia palveluita. Etusivu lataa vain yhteisen navigaation JavaScriptin. Vanhat app.js- ja geometry.js-tiedostot voivat jäädä repositorioon; uusi etusivu ei käytä niitä.

## Yhteystiedot ja työnkuvaukset

Aiemmat tehtävät on kuvattu laajemmin ilman henkilöstön perehdytysviittauksia. Sähköposti ja puhelin näytetään vasta painikkeella, ja ne voi piilottaa uudelleen. contacts.js tarvitsee JavaScriptin; ilman sitä yhteydenotto onnistuu LinkedIn-linkistä.

Sähköpostilinkki lisää uuden domain-osoitteen vastaanottajaksi ja aiemman Gmail-osoitteen CC-kenttään. Se ei määritä postilaatikkoa tai palvelinpuolen edelleenlähetystä. Domain-osoitteen on oltava käytössä omassa sähköpostipalvelussa. PDF-CV:ssä on suorien yhteystietojen sijasta sivuston yhteyslinkki.

Klikkaussuoja vähentää tavallista automaattista poimintaa, mutta ei estä kaikkia botteja tai poista vanhoja kopioita.

## Tarkistukset

Sisäiset ankkurit, tiedostopolut, projektien suodatus, suorien linkkien avautuminen, uusien välilehtien merkinnät ja CV-lataus on tarkistettu ohjelmallisesti. GitHub-polut on tarkistettu sekä osoitteen juuressa että repositorion alikansiossa. PDF:n molemmat sivut on renderöity ja tarkistettu kuvina. Visuaalinen sivuston selaintarkistus ei ollut käytettävissä.
