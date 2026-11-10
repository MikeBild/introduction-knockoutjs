*English · [Deutsch](README.de.md)*

# 04 · pureComputed instead of computed

A `pureComputed` only evaluates while someone is listening and sleeps otherwise. That makes it the default choice for derived values. With `read` and `write` it becomes writable – like the example in `archive/5-decomposing.md`, here for a price field in the workshop shop: whole cents internally, euros with a decimal comma in the input field.

## Task

1. Open `start/price.ts`.
2. Let `read` return the price as text: `1290` becomes “12,90”.
3. Let `write` convert input such as “12,90” or “12.90” into cents. Round with `Math.round` so that no fractional numbers end up in the state.
4. Ignore invalid input such as “zwölf”, negative values or more than two decimal places.
5. Go through every `ko.computed` in your own project in your head: does it need Side Effects? If not, it becomes a `pureComputed`.

## Check

```bash
npm run test:start -- exercises/04-computed
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
