*English · [Deutsch](README.de.md)*

# 07 · Components instead of nested templates

A Knockout component bundles a template and a ViewModel under one tag name. Data arrives via `params`, cleanup belongs in `dispose`. The example is a cart line in the workshop shop (`cart.ts` is the cart from exercise 05).

## Task

1. Open `start/cart-line.ts`.
2. Compute `lineTotalCents` as a `pureComputed`: quantity times `priceCents`.
3. In the constructor, subscribe to `item.quantity` and set `changedAt` on every change. Remember the subscription and end it in `dispose`.
4. Implement `remove` (calls `onRemove` with its own line item) and write the template: name, quantity field, line total, the hint “geändert” and the button “Entfernen”.
5. Register the component in `registerCartLine` exactly once as `cart-line`, with the class as `viewModel`.

Important: Knockout calls `viewModel` with `new`. An Arrow Function therefore fails – use a class or `{ createViewModel }`. Components load asynchronously; in tests you wait with `findBy…`.

## Check

```bash
npm run test:start -- exercises/07-components
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
