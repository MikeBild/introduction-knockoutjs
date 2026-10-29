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
npm run dev          # Todo-App mit Vite starten (index.html, app/)
npm run build && npx vite preview   # gebaute App mit Content Security Policy (Übung 16)
```

Jede Übung hat einen Ordner `start/` (dein Arbeitsplatz) und `solution/` (Musterlösung). Die Testdatei liegt daneben und lädt je nach `TARGET` die eine oder die andere Variante.

Bewusst wenig Abhängigkeiten: Knockout 3.5, TypeScript, Vite und Vitest, für Tests dazu happy-dom und Testing Library. Keine weiteren Frameworks oder Plugins.

## Übungen

| Nr. | Übung | Thema |
| --- | --- | --- |
| 01 | [legacy-audit](exercises/01-legacy-audit) | Altlasten im Knockout-Code finden |
| 02 | [mvvm](exercises/02-mvvm) | View Model und View trennen |
| 03 | [observables](exercises/03-observables) | observable, subscribe, peek |
| 04 | [computed](exercises/04-computed) | pureComputed, schreibbar mit read und write |
| 05 | [observable-array](exercises/05-observable-array) | observableArray und arrayChange |
| 06 | [bindings](exercises/06-bindings) | Eingebaute Bindings für eine Todo-Liste |
| 07 | [components](exercises/07-components) | Komponenten mit params und dispose |
| 08 | [typescript-vite](exercises/08-typescript-vite) | Typen, ESM und Vite |
| 09 | [custom-bindings](exercises/09-custom-bindings) | Custom Bindings mit init, update und Disposal |
| 10 | [testing](exercises/10-testing) | Vitest, happy-dom und Testing Library |
| 11 | [performance](exercises/11-performance) | deferUpdates und rateLimit |
| 12 | [strangler](exercises/12-strangler) | Knockout als Custom Element, Migration Schritt für Schritt |
| 13 | [state-bridge](exercises/13-state-bridge) | Zustand per Store-Vertrag zwischen Knockout und Web Components teilen |
| 14 | [security](exercises/14-security) | Kein html-Binding mit Nutzereingaben |
| 15 | [binding-injection](exercises/15-binding-injection) | Eingeschleuste Bindings entschärfen |
| 16 | [csp](exercises/16-csp) | Content Security Policy, unsafe-eval und Trusted Types |

## Material von 2015

Der Ordner [`legacy/`](legacy) enthält das ursprüngliche Einführungsmaterial (Bower, globales `ko`, `ko.dependentObservable`, Mapping-Plugin). Es bleibt als Anschauungsobjekt für Übung 01 und für den Vergleich alt gegen neu.

## Lizenz

MIT, siehe [LICENSE](LICENSE).
