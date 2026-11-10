*English · [Deutsch](README.de.md)*

# 03 · How does Knockout notice that something changed?

An Observable is a function: call it without an argument to read the value, with an argument to write it. Whoever reads while a Computed or binding is evaluating is registered as a dependency automatically. The example is the quantity of a cart line item in the workshop shop.

## Task

1. Open `start/quantity.ts`.
2. Implement `increment` and `decrement` in `createQuantity`. The quantity never drops below 1.
3. Write `recordChanges`: collect every new value via `subscribe`; `dispose` ends the subscription.
4. Change `createAuditedTotal` so that the tax rate is read with `peek()`. A change to the tax rate then no longer triggers a recalculation. The total stays in whole cents.
5. Think about it: when is `peek` the right choice, and when does it hide a bug?

## Check

```bash
npm run test:start -- exercises/03-observables
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
