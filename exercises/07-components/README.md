# 07 · Komponenten statt verschachtelter Templates

Eine Knockout-Komponente bündelt Template und View Model unter einem Tag-Namen. Daten kommen über `params`, Aufräumarbeit gehört in `dispose`.

## Aufgabe

1. Öffne `start/todo-item.ts`.
2. Abonniere im Konstruktor `todo.done` und setze `doneAt`. Merk dir die Subscription.
3. Implementiere `remove` (ruft `onRemove` mit dem eigenen Todo auf) und `dispose` (beendet die Subscription).
4. Schreib das Template: Checkbox mit Text, „erledigt“ nur bei `doneAt`, Löschen-Button mit `aria-label`.
5. Registriere die Komponente in `registerTodoItem` genau einmal als `todo-item`, mit der Klasse als `viewModel`.

Wichtig: Knockout ruft `viewModel` mit `new` auf. Eine Arrow Function scheitert deshalb – nimm eine Klasse oder `{ createViewModel }`. Komponenten laden asynchron, in Tests wartest du mit `findBy…`.

## Prüfen

```bash
npm run test:start -- exercises/07-components
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
