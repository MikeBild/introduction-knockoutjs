# 09 · Custom Bindings kapseln das DOM

Wo du DOM-APIs, Formatierung oder Fremd-Widgets brauchst, gehört der Code in ein Custom Binding – nicht ins View Model. `init` läuft einmal, `update` nach jeder Änderung, und alles, was du anmeldest, meldest du beim Entfernen wieder ab.

## Aufgabe

1. Öffne `start/bindings.ts`.
2. Lass `currency` den Wert in ganzen Cent mit `ko.unwrap` lesen und mit `formatCents` aus `exercises/shop.ts` als Euro anzeigen. So funktioniert das Binding mit Observables und mit festen Zahlen.
3. Melde in `clickOutside` einen Klick-Listener am `document` an. Ruf den Handler nur bei Klicks außerhalb des Elements auf – so schließt sich der Mini-Warenkorb des Werkstatt-Shops.
4. Entferne den Listener mit `ko.utils.domNodeDisposal.addDisposeCallback`.
5. Prüf: Was passiert ohne Dispose-Callback, wenn eine Komponente hundertmal ein- und ausgeblendet wird?

## Prüfen

```bash
npm run test:start -- exercises/09-custom-bindings
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
