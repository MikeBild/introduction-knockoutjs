# 15 · Eingeschleuste Bindings entschärfen

Auch ohne `html`-Binding kann Knockout Code ausführen, den ein Angreifer liefert: Rendert der Server Nutzer-HTML in einen Bereich, den Knockout danach bindet, wertet `ko.applyBindings` jedes `data-bind` darin aus. Ein harmlos aussehender Kommentar mit `data-bind="text: (function(){ … })()"` wird so zu Code. Das heißt Binding Injection.

## Aufgabe

1. Lies `sanitize.test.ts`. Der erste Test ist die Gegenprobe: Ohne Bereinigung läuft der eingeschleuste Code.
2. Öffne `start/sanitize.ts` und parse das HTML über ein `<template>`-Element. So laufen dabei keine Skripte.
3. Entferne an allen Elementen `data-bind`, `params` und alle `on*`-Attribute.
4. Entferne `<script>`-Elemente und Kommentare, die mit `ko` oder `/ko` beginnen – das sind virtuelle Bindings.
5. Überleg für dein Projekt: Wo landet Nutzer-HTML in einem Bereich, den Knockout bindet? Besser als jede Bereinigung ist, solche Bereiche gar nicht zu binden.

`stripBindings` ersetzt keinen vollständigen HTML-Sanitizer. Es entfernt nur, was Knockout ausführen würde. Für fremdes Markup brauchst du zusätzlich eine Allowlist für Elemente und Attribute.

## Prüfen

```bash
npm run test:start -- exercises/15-binding-injection
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
