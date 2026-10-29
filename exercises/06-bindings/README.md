# 06 · Welche Bindings brauchst du wirklich?

Mit einer Handvoll eingebauter Bindings baust du die komplette Todo-Oberfläche: `submit`, `textInput`, `foreach`, `checked`, `css`, `click`, `attr`, `if` und `enable`. Das View Model kommt fertig aus `todos.ts` (die Lösung aus Übung 05).

## Aufgabe

1. Öffne `start/todo-view.ts`.
2. Baue das Formular mit `submit: add` und einem Label „Neue Aufgabe“ mit `textInput: newText`.
3. Rendere die Liste mit `foreach: todos`. Jede Zeile bekommt `css: { done: done }`, eine Checkbox mit `checked: done` und einen Löschen-Button mit `click: $parent.remove`.
4. Gib dem Löschen-Button per `attr` ein `aria-label` wie „Löschen: Milch kaufen“.
5. Zeig „Noch N offen“ nur, wenn es Todos gibt, und aktiviere „Erledigte entfernen“ nur, wenn etwas erledigt ist.

## Prüfen

```bash
npm run test:start -- exercises/06-bindings
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
