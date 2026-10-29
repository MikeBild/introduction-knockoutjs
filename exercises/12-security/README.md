# 12 · Kein html-Binding mit Nutzereingaben

Das `html`-Binding setzt `innerHTML`. Landet dort eine Nutzereingabe, ist das Cross-Site Scripting, kurz XSS. In dieser Übung schließt du die Lücke und baust Links trotzdem – ohne Markup aus Strings.

## Aufgabe

1. Öffne `start/comments.ts` und finde die Lücke im Template.
2. Ersetze `html: body` durch das Custom Binding `linkify: body`.
3. Implementiere `linkify`: Zerlege den Text, erzeuge Textknoten und `<a>`-Elemente mit `document.createElement`. Erlaube nur `http:` und `https:` und setze `rel="noopener noreferrer"`.
4. Nutze nirgends `innerHTML` oder `insertAdjacentHTML`.
5. Notiere für dein Projekt: Wo steht heute `html:` in einem `data-bind`, und woher kommt der Wert?

Hintergrund: Der Binding-Parser von Knockout 3.5 erzeugt Funktionen aus `data-bind`-Ausdrücken. Eine Content Security Policy braucht deshalb `'unsafe-eval'` – oder du stellst auf den CSP-freundlichen Parser von TKO um.

## Prüfen

```bash
npm run test:start -- exercises/12-security
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
