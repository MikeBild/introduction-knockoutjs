# 13 · Schrittweise migrieren statt neu schreiben

Beim Strangler-Muster ersetzt du eine Anwendung Stück für Stück. Die Grenze zwischen alt und neu sind Custom Elements: Attribute rein, Events raus. So läuft eine Knockout-Komponente in einer React- oder Svelte-Seite, und eine neue Web Component läuft in einer Knockout-Seite.

## Aufgabe

1. Öffne `start/element.ts`.
2. Schreib in `attributeChangedCallback` den neuen Wert in das passende Observable.
3. Leg in `connectedCallback` einen Shadow Root an, setz das Template in ein `<div>` und binde das View Model mit `ko.applyBindings` nur an dieses `<div>`.
4. Räum in `disconnectedCallback` auf: `ko.cleanNode`, `dispose` des View Models, Inhalt entfernen.
5. Vervollständige `ko-counter`: Attribut `start` übernehmen, bei Klick ein `CustomEvent('count-change')` mit `bubbles` und `composed` auslösen.

Der vierte Test zeigt die Gegenrichtung: Eine Knockout-Seite nutzt das Element mit `attr`- und `event`-Binding – genauso bindest du später eine Web Component aus Lit, Svelte oder React ein.

## Prüfen

```bash
npm run test:start -- exercises/13-strangler
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
