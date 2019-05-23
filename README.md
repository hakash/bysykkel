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

Filene `Stations.js` og `StationDataFetcher.js` er laget for å kunne importere i forskjellige typer systemer. Om du ønsker å bygge en web-visning, en CSV-export eller noe helt annet, så kan du bruke disse komponentene for å gjøre det.

Så lenge API-et du kobler på støtter [GBFS](https://github.com/NABSA/gbfs) strukturerte data, så skal `StationDataFetcher` kunne hente data for deg.

Lykke til!