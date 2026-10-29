# 04 · pureComputed statt computed

Ein `pureComputed` rechnet nur, solange jemand zuhört, und schläft sonst. Für abgeleitete Werte ist es deshalb die Standardwahl. Mit `read` und `write` wird es schreibbar – das Beispiel aus `legacy/5-decomposing.md`, modernisiert.

## Aufgabe

1. Öffne `start/names.ts`.
2. Lass `read` den vollen Namen liefern, ohne Leerzeichen am Rand.
3. Lass `write` die Eingabe am letzten Leerzeichen teilen und in `firstName` und `lastName` schreiben.
4. Ohne Leerzeichen landet alles im Vornamen, der Nachname wird leer.
5. Ersetze im Kopf jedes `ko.computed` aus deinem Projekt: Braucht es Nebenwirkungen? Wenn nicht, wird es ein `pureComputed`.

## Prüfen

```bash
npm run test:start -- exercises/04-computed
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
