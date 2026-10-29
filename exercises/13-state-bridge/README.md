# 13 · Zustand zwischen alter und neuer Welt teilen

Während einer Migration brauchen Knockout-Seiten und neue Web Components denselben Zustand, etwa einen Warenkorb. Statt ihn doppelt zu pflegen, einigst du dich auf einen kleinen, framework-neutralen Vertrag: `get()` und `subscribe(listener)`, das eine Abmeldefunktion zurückgibt. Keine Library, nur TypeScript.

## Aufgabe

1. Öffne `start/bridge.ts`.
2. Implementiere `createStore`: aktueller Wert, Listener in einem `Set`, `set` ignoriert gleiche Werte.
3. Implementiere `toStore`: `get` liest per `peek` ohne Abhängigkeit, `subscribe` meldet nur Änderungen und gibt eine Funktion zurück, die die Knockout-Subscription beendet.
4. Implementiere `fromStore`: Startwert über `get`, danach jede Änderung. Nach außen gibst du nur ein `pureComputed` heraus, `dispose` meldet sich ab.
5. Lies `CartBadge`: Die Web Component bekommt den Store als Property und meldet sich in `disconnectedCallback` ab. Brücken ohne Abmelden sind die häufigsten Speicherlecks einer Migration.

## Prüfen

```bash
npm run test:start -- exercises/13-state-bridge
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
