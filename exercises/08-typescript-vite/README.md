# 08 · Knockout mit TypeScript, ESM und Vite

Knockout 3.5 bringt eigene Type-Definitionen mit. Mit `import ko from 'knockout'`, TypeScript strict und Vite verschwinden Script-Tags, Bower und das globale `ko`. Beispiele sind die Formularfelder des Werkstatt-Shops: E-Mail und Menge.

## Aufgabe

1. Öffne `start/field.ts` und ersetze die `any`-Types durch `ko.Observable<T>` und `ko.PureComputed<…>`.
2. Implementiere `createField`: `value` als Observable, `error` als `pureComputed` aus dem Validator, `isValid` als `pureComputed`.
3. Lass `npm run typecheck` laufen. Der Test prüft mit `expectTypeOf`, dass die Types stimmen.
4. Starte den Werkstatt-Shop mit `npm run dev`. Er liegt in `index.html` und `app/` (`main.ts`, `shop.ts`, `cart-line.ts`) und lädt das Template `app/shop.html` per `?raw`-Import.
5. Lies `tsconfig.json`: `strict`, `noUncheckedIndexedAccess` und `verbatimModuleSyntax` sind an. Was davon würde in deinem Projekt heute die meisten Fehler melden?

## Prüfen

```bash
npm run test:start -- exercises/08-typescript-vite
npm run typecheck
```

`npm run test:start` testet deinen Startpunkt in `start/`, `npm test` die Lösung in `solution/`.
