*English · [Deutsch](README.de.md)*

# 01 · Find outdated patterns in Knockout code

Before you modernize, you need an inventory of the code. In this exercise you write a small audit that finds typical patterns from Knockout code written between 2010 and 2015 – for example in the old Todo app in `archive/examples/Todos/js/app.js`.

## Task

1. Open `start/audit.ts` and read the rules in the type `Rule`.
2. Create a pattern for each rule: `ko.dependentObservable(`, `data-bind` with `html:`, `data-bind` with `function (`, global `ko.applyBindings(`, jQuery templates (`text/x-jquery-tmpl`, `.tmpl(`) and the mapping plugin (`ko.mapping`).
3. Return `{ rule, line }` for each match; lines count from 1.
4. Do not report `global-ko` when the file loads Knockout via `import ko from 'knockout'`.
5. Run the audit over `fixtures.ts` and note what you would replace first.

## Check

```bash
npm run test:start -- exercises/01-legacy-audit
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
