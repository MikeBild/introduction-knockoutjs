# 12 · Schrittweise migrieren statt neu schreiben

Beim Strangler-Muster ersetzt du eine Anwendung Stück für Stück. Die Grenze zwischen alt und neu sind Custom Elements: Attribute rein, Events raus. So läuft Knockout-Code auf jeder Seite, die HTML spricht, und eine neue Web Component läuft in einer Knockout-Seite.

## Aufgabe

1. Öffne `start/element.ts`.
2. Schreib in `attributeChangedCallback` den neuen Wert in das passende Observable.
3. Leg in `connectedCallback` einen Shadow Root an, setz das Template in ein `<div>` und binde das ViewModel mit `ko.applyBindings` nur an dieses `<div>`.
4. Räum in `disconnectedCallback` auf: `ko.cleanNode`, `dispose` des ViewModels, Inhalt entfernen.
5. Vervollständige `ko-quantity`, die Mengenwahl des Werkstatt-Shops: Attribut `start` übernehmen, bei „+“ und „−“ die Menge ändern (nie unter 1) und ein `CustomEvent('quantity-change')` mit `bubbles` und `composed` auslösen.

Der vierte Test zeigt die Gegenrichtung: Eine Knockout-Seite nutzt das Element mit `attr`- und `event`-Binding – genauso bindest du jede neue Web Component ein.

## Prüfen

```bash
npm run test:start -- exercises/12-strangler
```

`npm run test:start` testet deinen Startpunkt in `start/`, `npm test` die Lösung in `solution/`.
