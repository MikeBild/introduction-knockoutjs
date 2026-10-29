# 02 · View Model und View sauber trennen

Model View ViewModel, kurz MVVM, trennt Zustand und Darstellung. Das View Model kennt kein DOM, die View enthält keine Logik, die Bindings verbinden beide. Beispiel ist die Kundenangabe im Werkstatt-Shop.

## Aufgabe

1. Öffne `start/customer.ts`.
2. Lege in `createCustomerViewModel` die `greeting` als `ko.pureComputed` an: „Bestellung für <Name>“.
3. Schreib `customerTemplate`: eine `<h2>` mit `text: greeting` und zwei `<label>` „Name“ und „E-Mail“ mit `<input>` und `textInput`.
4. Binde in `mountCustomer` nur den übergebenen Teilbaum mit `ko.applyBindings(vm, root)` – nie das ganze Dokument.
5. Gib eine Funktion zurück, die mit `ko.cleanNode(root)` aufräumt.

## Prüfen

```bash
npm run test:start -- exercises/02-mvvm
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
