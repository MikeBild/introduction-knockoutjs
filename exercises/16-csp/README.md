# 16 · Content Security Policy und Trusted Types

Eine Content Security Policy, kurz CSP, begrenzt, woher eine Seite Code lädt und ausführt. Knockout 3.5 hat dabei eine Eigenheit: Der Binding-Parser übersetzt jeden `data-bind`-Ausdruck mit `new Function`. Ohne `'unsafe-eval'` in `script-src` bindet Knockout 3.5 deshalb gar nichts. Ehrlich gesagt: Die CSP schützt dann weiter vor fremden Skripten, aber nicht vor eingeschleusten Bindings – dafür brauchst du die Übungen 14 und 15. Einen CSP-freundlichen Parser ohne `eval` hat erst TKO (Knockout 4).

Trusted Types gehen einen Schritt weiter: Mit `require-trusted-types-for 'script'` nimmt der Browser für `innerHTML` nur noch Werte an, die eine Policy erzeugt hat. Knockout 3.5.2 und neuer reichen solche Werte im `html`-Binding durch.

## Aufgabe

1. Öffne `start/csp.ts` und baue in `buildCsp` den Header-String aus den Direktiven im Kommentar.
2. Implementiere `createHtmlPolicy`: Gibt es `globalThis.trustedTypes`, erzeugst du die Policy `knockout-html`. Sonst gibst du `{ createHTML: sanitize }` zurück. happy-dom kennt keine Trusted Types, deshalb brauchst du den Fallback.
3. Lies den Test zum `html`-Binding: Nur was durch die Policy gelaufen ist, landet im DOM.
4. Bau die App und starte die Vorschau mit CSP:

   ```bash
   npm run build
   npx vite preview
   ```

   `vite.config.ts` setzt den Header aus `buildCsp({ allowEval: true })`. Öffne die App und prüf in den DevTools unter Network den Header `Content-Security-Policy`.
5. Probe: Setz in `vite.config.ts` `allowEval: false`, bau neu und lade die Vorschau. Die Konsole meldet einen CSP-Verstoß, die Produktliste bleibt leer. Danach wieder zurückstellen.

## Prüfen

```bash
npm run test:start -- exercises/16-csp
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
