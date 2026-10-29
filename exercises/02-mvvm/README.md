# 02 · View Model und View sauber trennen

Model View ViewModel, kurz MVVM, trennt Zustand und Darstellung. Das View Model kennt kein DOM, die View enthält keine Logik, die Bindings verbinden beide.

## Aufgabe

1. Öffne `start/person.ts`.
2. Lege in `createPersonViewModel` die `greeting` als `ko.pureComputed` an: „Hallo Vorname Nachname“.
3. Schreib `personTemplate`: eine `<h2>` mit `text: greeting` und zwei `<label>` mit `<input>` und `textInput` für Vorname und Nachname.
4. Binde in `mountPerson` nur den übergebenen Teilbaum mit `ko.applyBindings(vm, root)` – nie das ganze Dokument.
5. Gib eine Funktion zurück, die mit `ko.cleanNode(root)` aufräumt.

## Prüfen

```bash
npm run test:start -- exercises/02-mvvm
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
