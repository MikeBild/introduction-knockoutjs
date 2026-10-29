# 03 · Wie merkt Knockout, dass sich etwas ändert?

Ein Observable ist eine Funktion: ohne Argument liest du den Wert, mit Argument schreibst du ihn. Wer liest, während ein Computed oder Binding rechnet, wird automatisch als Abhängigkeit registriert.

## Aufgabe

1. Öffne `start/counter.ts`.
2. Implementiere `increment` und `reset` in `createCounter`.
3. Schreib `recordChanges`: sammle per `subscribe` jeden neuen Wert, `dispose` beendet die Subscription.
4. Ändere `createAuditedTotal` so, dass der Steuersatz mit `peek()` gelesen wird. Eine Änderung am Steuersatz löst dann keine Neuberechnung aus.
5. Überleg: Wann ist `peek` richtig, wann versteckt es einen Bug?

## Prüfen

```bash
npm run test:start -- exercises/03-observables
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
