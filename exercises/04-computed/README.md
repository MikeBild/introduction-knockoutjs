# 04 · pureComputed statt computed

Ein `pureComputed` rechnet nur, solange jemand zuhört, und schläft sonst. Für abgeleitete Werte ist es deshalb die Standardwahl. Mit `read` und `write` wird es schreibbar – wie das Beispiel aus `legacy/5-decomposing.md`, hier für ein Preisfeld im Werkstatt-Shop: intern ganze Cent, im Eingabefeld Euro mit Komma.

## Aufgabe

1. Öffne `start/price.ts`.
2. Lass `read` den Preis als Text liefern: `1290` wird „12,90“.
3. Lass `write` Eingaben wie „12,90“ oder „12.90“ in Cent umrechnen. Runde mit `Math.round`, damit keine Kommazahlen im Zustand landen.
4. Ignoriere ungültige Eingaben wie „zwölf“, negative Werte oder mehr als zwei Nachkommastellen.
5. Geh im Kopf jedes `ko.computed` aus deinem Projekt durch: Braucht es Side Effects? Wenn nicht, wird es ein `pureComputed`.

## Prüfen

```bash
npm run test:start -- exercises/04-computed
```

`npm run test:start` testet deinen Startpunkt in `start/`, `npm test` die Lösung in `solution/`.
