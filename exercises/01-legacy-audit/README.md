# 01 · Altlasten im Knockout-Code finden

Bevor du modernisierst, brauchst du eine Bestandsaufnahme. In dieser Übung schreibst du einen kleinen Audit, der typische Muster aus Knockout-Code von 2010 bis 2015 findet – zum Beispiel aus der alten Todo-App in `legacy/examples/Todos/js/app.js`.

## Aufgabe

1. Öffne `start/audit.ts` und lies die Regeln im Type `Rule`.
2. Lege für jede Regel ein Muster an: `ko.dependentObservable(`, `data-bind` mit `html:`, `data-bind` mit `function (`, globales `ko.applyBindings(`, jQuery-Templates (`text/x-jquery-tmpl`, `.tmpl(`) und das Mapping-Plugin (`ko.mapping`).
3. Gib je Treffer `{ rule, line }` zurück, die Zeilen zählen ab 1.
4. Melde `global-ko` nicht, wenn die Datei Knockout per `import ko from 'knockout'` lädt.
5. Lass den Audit über `fixtures.ts` laufen und notiere, was du zuerst ersetzen würdest.

## Prüfen

```bash
npm run test:start -- exercises/01-legacy-audit
```

`npm run test:start` führt die Tests gegen deinen Ordner `start/` aus. Ohne `:start` laufen sie gegen die Musterlösung in `solution/`.
