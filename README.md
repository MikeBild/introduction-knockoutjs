# Übungen: Knockout

Übungs-Repo zum Workshop „KnockoutJS modernisieren und schrittweise migrieren“. Jede Übung hat einen Startpunkt, Tests und eine Lösung. Alle Übungen ab 02 bauen am selben Beispiel weiter, einem kleinen Werkstatt-Shop.

## Was du lernst

- MVVM (Model View ViewModel), Observables und Bindings sauber verstehen
- Knockout mit TypeScript, ES-Modulen und Vite betreiben, testen, beschleunigen
- Knockout-Code absichern und Schritt für Schritt migrieren

## Voraussetzungen

- **Node.js 26** – `nvm use` liest die Version aus [`.nvmrc`](.nvmrc).
- Git und ein Editor mit TypeScript-Unterstützung, z. B. VS Code

Bewusst wenig Abhängigkeiten: Knockout 3.5, TypeScript, Vite und Vitest, für Tests dazu happy-dom und Testing Library. Keine weiteren Frameworks oder Plugins.

## Einrichten

```bash
git clone https://github.com/MikeBild/introduction-knockoutjs.git
cd introduction-knockoutjs
nvm use
npm install
npm test             # alle Tests gegen die Lösungen in solution/
npm run typecheck    # TypeScript strict
```

## So arbeitest du mit einer Übung

Jede Übung hat einen Startpunkt in `start/` (hier arbeitest du) und eine Lösung in `solution/`. Die Testdatei liegt daneben und lädt je nach `TARGET` die eine oder die andere Variante.

```bash
npm run test:start   # alle Tests gegen deinen Code in start/
npm run test:start -- exercises/05-observable-array   # nur eine Übung
npm run dev          # Werkstatt-Shop mit Vite starten (index.html, app/)
npm run build && npx vite preview   # gebaute App mit Content Security Policy (Übung 16)
```

## Übungen

| Nr. | Übung | Thema |
| --- | --- | --- |
| 01 | [legacy-audit](exercises/01-legacy-audit) | Altlasten im Knockout-Code finden (alte Todo-App) |
| 02 | [mvvm](exercises/02-mvvm) | Kundendaten: ViewModel und View trennen |
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

## Der Werkstatt-Shop

Der Shop verkauft Werkstattbedarf: Kundendaten, Produkte, Warenkorb, Bestellung und Bewertungen. Gemeinsame Daten und Helfer stehen in [`exercises/shop.ts`](exercises/shop.ts): der Type `Product`, vier Beispielprodukte und `formatCents`. Geld steht überall in ganzen Cent (`priceCents`), erst die Anzeige macht daraus Euro.

## Stand Oktober 2026

- **Knockout 3.5.3** vom 25. März 2026 ist die aktuelle Version. Nach 3.5.1 (2019) kamen 2026 zwei Wartungs-Releases: 3.5.2 mit Bugfixes, Unterstützung für Trusted Types und genaueren Type-Definitionen, 3.5.3 mit Fixes für Strict Mode und Computed-Types.
- Neue Features kommen in Knockout 3.x kaum noch. Die Weiterentwicklung läuft in **TKO** (Knockout 4, `@tko/build.knockout` als kompatibler Build, `@tko/build.reference` als moderner Build), stabil seit April 2026.
- Viele Unternehmensanwendungen laufen weiter mit Knockout 3.5. Genau dafür ist dieses Repo gedacht.

## Workshop und Folien

- Workshop: [„KnockoutJS modernisieren und schrittweise migrieren“](https://workshops.mikebild.dev/w/knockout/remote/)
- Folien: [slides.mikebild.dev/introduction-knockoutjs](https://slides.mikebild.dev/introduction-knockoutjs.html)

## Archiv

Der Ordner [`legacy/`](legacy) enthält das ursprüngliche Einführungsmaterial von 2015 (Bower, globales `ko`, `ko.dependentObservable`, Mapping-Plugin) als Anschauungsobjekt für Übung 01 und für den Vergleich alt gegen neu.

## Lizenz

[MIT](LICENSE)
