# Bysykkel status

Dette er en veldig enkel konsoll-app for å liste status over alle bysykkel-stasjoner i Oslo.

Appen henter data fra det offisielle API-et og viser det i konsollet i et tabulert oppsett med repeterende overskrifter.

## Systemkrav

Applikasjonen baserer seg på Node.JS, og benytter bibliotekene `request` og `request-promise-native`.

## Installasjon

For å installere kjører du følgende kommandoer i konsollet ditt i den mappen du vil installere:

```sh
git clone https://github.com/hakash/bysykkel.git .
npm i
```

## Kjøring av appen

```sh
npm start
```

## Andre muligheter

Filene `BikeshareFeed.js`, `Stations.js`, `StationDataFetcher.js` og `StationDataPrinter.js` er laget for å kunne importere i forskjellige typer systemer. Om du ønsker å bygge en web-visning, en CSV-export eller noe helt annet, så kan du bruke disse komponentene for å gjøre det.

Så lenge API-et du kobler på støtter [GBFS](https://github.com/NABSA/gbfs) strukturerte data og presenterer en fil for autodiscover, så skal `BikeshareFeed` kunne hente data for deg.

### Eksempel på å exportere CSV

Dette eksempelet gjør en liten endring på eksempelfila som ligger ved i prosjektet, ved å skifte til skriving av CSV til fil, fremfor tabulert skriving til terminal. Forskjellene er import av `fs`-pakken, defineringen av et filnavn, samt bruken av `fs.writeFileSync`fremfor `console.log`.

```javascript
const BikeshareFeed = require("./BikeshareFeed");
const fs = require("fs");

const autodiscoverUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json";
const fileName = "output.csv";

const bf = new BikeshareFeed(autodiscoverUrl,"testcompany","testapp");

bf.on("ready",(err) => {
    if(err) {
        console.log(err);
        return;
    }
    fs.writeFileSync(fileName, bf.csv());
});

bf.loadFeed();
```

### Eksempel på async/await

BikeshareFeed støtter også async/await fremfor callbacks. Samme eksempel som over, men i moderne drakt.

```javascript
const BikeshareFeed = require("./BikeshareFeed");
const fs = require("fs");

const autodiscoverUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json";
const fileName = "output.csv";

async function run() {
    const bf = new BikeshareFeed(autodiscoverUrl,"testcompany","testapp");

    try {
        await bf.lodFeed();
        fs.writeFileSync(fileName, bf.csv());
    }
    catch(err) {
        if(err) {
            console.log(err);
        }
    }
}

run();
```

Lykke til!