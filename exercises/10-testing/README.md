*English · [Deutsch](README.de.md)*

# 10 · Test ViewModels and bindings

This time the code is ready: `search.ts` contains the product search of the workshop shop with a result list. Searching for “schraub” finds Schraubenset and Akkuschrauber. You write the tests – with Vitest, happy-dom and Testing Library, the way users operate the UI.

## Task

1. Open `start/search.test.ts`. It contains four `it.todo`.
2. Turn every `it.todo` into a real test. Build the UI with `mountSearch`, find elements with `getByLabelText` and `getByRole`, type with `userEvent`.
3. Check the list via `within(screen.getByRole('list'))` instead of CSS selectors.
4. In the last test, switch on `ko.options.deferUpdates = true`. Show that the DOM is only correct after `ko.tasks.runEarly()`.
5. As a trial, change `search.ts` (for example remove `toLowerCase` in `createProductSearch`) and check whether your tests turn red.

## Check

```bash
npm run test:start -- exercises/10-testing
```

`npm run test:start` runs your tests from `start/`, `npm test` runs the sample tests from `solution/`. `exercises/setup.ts` cleans up the DOM, bindings and `deferUpdates` after every test.
