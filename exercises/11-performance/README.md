# 11 · deferUpdates und rateLimit gezielt einsetzen

Knockout aktualisiert standardmäßig synchron: Jede Änderung läuft sofort durch alle Computeds und Bindings. `deferUpdates` bündelt Änderungen in einer Microtask, `rateLimit` drosselt einzelne Observables – etwa die Produktsuche des Werkstatt-Shops während der Eingabe.

## Aufgabe

1. Öffne `start/search.ts`.
2. Drossle `query` mit `extend({ rateLimit: { timeout: 300, method: 'notifyWhenChangesStop' } })`. Die Suche lädt dann erst, wenn die Eingabe 300 Millisekunden ruht.
3. Schalte in `enableDeferredUpdates` die Option `ko.options.deferUpdates` ein.
4. Lies die Tests: Sie nutzen `vi.useFakeTimers()` für `rateLimit` und `ko.tasks.runEarly()` für `deferUpdates`.
5. Überleg für dein Projekt: Wo würde `deferUpdates` global helfen, und wo brauchst du gezielt `rateLimit`?

## Prüfen

```bash
npm run test:start -- exercises/11-performance
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
