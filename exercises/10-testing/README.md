# 10 · View Models und Bindings testen

Diesmal ist der Code fertig: `search.ts` enthält ein Suchfeld mit Ergebnisliste. Du schreibst die Tests – mit Vitest, happy-dom und Testing Library, so wie Nutzer die Oberfläche bedienen.

## Aufgabe

1. Öffne `start/search.test.ts`. Dort stehen vier `it.todo`.
2. Mach aus jedem `it.todo` einen echten Test. Bau die Oberfläche mit `mountSearch`, finde Elemente mit `getByLabelText` und `getByRole`, tippe mit `userEvent`.
3. Prüfe die Liste über `within(screen.getByRole('list'))` statt über CSS-Selektoren.
4. Schalte im letzten Test `ko.options.deferUpdates = true` ein. Zeig, dass das DOM erst nach `ko.tasks.runEarly()` stimmt.
5. Ändere zur Probe `search.ts` (etwa `toLowerCase` entfernen) und prüf, ob deine Tests rot werden.

## Prüfen

```bash
npm run test:start -- exercises/10-testing
```

`npm run test:start` führt deine Tests aus `start/` aus, `npm test` die Beispieltests aus `solution/`. `exercises/setup.ts` räumt nach jedem Test DOM, Bindings und `deferUpdates` auf.
