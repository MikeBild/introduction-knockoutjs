# Knockout modernisiert

Übungen zum Workshop „Knockout modernisiert“ auf [workshops.mikebild.dev](https://workshops.mikebild.dev): MVVM und Observables sauber verstehen, Knockout mit TypeScript, ESM und Vite betreiben, testen, schnell und sicher halten – und Schritt für Schritt migrieren.

## Stand Oktober 2026

- **Knockout 3.5.3** vom 25. März 2026 ist die aktuelle Version. Nach 3.5.1 (2019) kamen 2026 zwei Wartungs-Releases: 3.5.2 mit Bugfixes, Trusted-Types-Support und genaueren Type-Definitionen, 3.5.3 mit Fixes für Strict Mode und Computed-Types.
- Neue Features kommen in Knockout 3.x kaum noch. Die Weiterentwicklung läuft in **TKO** (Knockout 4, `@tko/build.knockout` als kompatibler Build, `@tko/build.reference` als moderner Build), stabil seit April 2026.
- Viele Unternehmensanwendungen laufen weiter mit Knockout 3.5. Genau dafür ist dieses Repo gedacht.

## Voraussetzungen

- Node.js 26 (siehe `.nvmrc`)
- Git und ein Editor mit TypeScript-Support, z. B. VS Code

```bash
npm install
npm test             # alle Tests gegen die Musterlösungen in solution/
npm run test:start   # alle Tests gegen deine Lösungen in start/
npm run test:start -- exercises/05-observable-array   # nur eine Übung
npm run typecheck    # TypeScript strict
npm run dev          # Werkstatt-Shop mit Vite starten (index.html, app/)
npm run build && npx vite preview   # gebaute App mit Content Security Policy (Übung 16)
```

Jede Übung hat einen Ordner `start/` (dein Arbeitsplatz) und `solution/` (Musterlösung). Die Testdatei liegt daneben und lädt je nach `TARGET` die eine oder die andere Variante.

Bewusst wenig Abhängigkeiten: Knockout 3.5, TypeScript, Vite und Vitest, für Tests dazu happy-dom und Testing Library. Keine weiteren Frameworks oder Plugins.

## Durchgehendes Beispiel: der Werkstatt-Shop

Alle Übungen ab 02 bauen an einem kleinen Shop für Werkstattbedarf: Kundendaten, Produkte, Warenkorb, Bestellung und Bewertungen. Gemeinsame Daten und Helfer stehen in [`exercises/shop.ts`](exercises/shop.ts): der Type `Product`, vier Beispielprodukte und `formatCents`. Geld steht überall in ganzen Cent (`priceCents`), erst die Anzeige macht daraus Euro.

## Übungen

| Nr. | Übung | Thema |
| --- | --- | --- |
| 01 | [legacy-audit](exercises/01-legacy-audit) | Altlasten im Knockout-Code finden (alte Todo-App) |
| 02 | [mvvm](exercises/02-mvvm) | Kundendaten: View Model und View trennen |
| 03 | [observables](exercises/03-observables) | Menge und Summe: observable, subscribe, peek |
| 04 | [computed](exercises/04-computed) | Preisfeld: pureComputed mit read und write |
| 05 | [observable-array](exercises/05-observable-array) | Warenkorb mit observableArray |
| 06 | [bindings](exercises/06-bindings) | Shop-Oberfläche mit eingebauten Bindings |
| 07 | [components](exercises/07-components) | Warenkorb-Zeile als Komponente mit params und dispose |
| 08 | [typescript-vite](exercises/08-typescript-vite) | Typen, ESM und Vite, der Shop als App |
| 09 | [custom-bindings](exercises/09-custom-bindings) | Custom Bindings für Preise und Mini-Warenkorb |
| 10 | [testing](exercises/10-testing) | Produktsuche testen mit Vitest, happy-dom und Testing Library |
| 11 | [performance](exercises/11-performance) | Live-Suche mit rateLimit, Summen mit deferUpdates |
| 12 | [strangler](exercises/12-strangler) | Mengenwahl als Custom Element, Migration Schritt für Schritt |
| 13 | [state-bridge](exercises/13-state-bridge) | Warenkorb per Store-Vertrag zwischen Knockout und Web Components teilen |
| 14 | [security](exercises/14-security) | Bewertungen ohne html-Binding anzeigen |
| 15 | [binding-injection](exercises/15-binding-injection) | Eingeschleuste Bindings entschärfen |
| 16 | [csp](exercises/16-csp) | Content Security Policy, unsafe-eval und Trusted Types |

## Material von 2015

Der Ordner [`legacy/`](legacy) enthält das ursprüngliche Einführungsmaterial (Bower, globales `ko`, `ko.dependentObservable`, Mapping-Plugin). Es bleibt als Anschauungsobjekt für Übung 01 und für den Vergleich alt gegen neu.

## Lizenz

MIT, siehe [LICENSE](LICENSE).
