# 14 · Observables mit Signals und RxJS verbinden

Während einer Migration leben Knockout-Observables, RxJS-Streams und Signals nebeneinander. Statt Zustand doppelt zu pflegen, baust du kleine Brücken: je Richtung eine Funktion, und jede hat ein `dispose`.

## Aufgabe

1. Öffne `start/bridge.ts`.
2. Implementiere `fromKo`: ein RxJS-`Observable`, das den aktuellen Wert sofort sendet, danach jede Änderung. Beim Unsubscribe endet die Knockout-Subscription.
3. Implementiere `toKo`: Werte aus einem Stream landen in einem Knockout-Observable. Nach außen gibst du nur ein `pureComputed` heraus.
4. Implementiere `koToSignal` und `signalToKo` mit `signal` und `effect` aus `@preact/signals-core`.
5. Prüf in jedem Test, dass nach `dispose` keine Werte mehr fließen. Brücken ohne Aufräumen sind die häufigsten Speicherlecks einer Migration.

## Prüfen

```bash
npm run test:start -- exercises/14-signals-bridge
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
