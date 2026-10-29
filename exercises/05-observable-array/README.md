# 05 · observableArray verfolgt die Liste, nicht die Einträge

Ein `observableArray` meldet, wenn Einträge hinzukommen, wegfallen oder sich verschieben. Ob ein Eintrag erledigt ist, meldet es nicht – dafür braucht jeder Eintrag eigene Observables. Grundlage ist die Todo-App aus `legacy/examples/Todos`.

## Aufgabe

1. Öffne `start/todos.ts`.
2. Implementiere `add`: Text trimmen, leere Eingaben ignorieren, Todo anhängen, Eingabe leeren.
3. Implementiere `remove` und `removeCompleted` mit `todos.remove(...)`.
4. Lass `remaining` die offenen Todos zählen. Lies dafür in der Schleife `todo.done()`.
5. Vergleich mit der alten App: Warum braucht `ko.dependentObservable` dort ein `this` als zweites Argument?

## Prüfen

```bash
npm run test:start -- exercises/05-observable-array
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
