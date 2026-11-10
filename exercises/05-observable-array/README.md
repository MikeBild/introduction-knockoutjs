*English · [Deutsch](README.de.md)*

# 05 · observableArray tracks the list, not the entries

An `observableArray` reports when entries are added, removed or moved. It does not report when the quantity of a line item changes – for that, every line item needs an Observable of its own. The example is the cart of the workshop shop (`exercises/shop.ts`), money always in whole cents.

## Task

1. Open `start/cart.ts`.
2. Implement `add`: if the product is already in the cart, increase the quantity, otherwise create a line item with quantity 1.
3. Implement `remove` and `clear` with `items.remove(...)` and `items.removeAll()`.
4. Let `totalCents` sum up quantity times `priceCents` and let `itemCount` count all quantities. To do so, read `item.quantity()` inside the loop.
5. Compare with the old Todo app in `archive/examples/Todos`: why does `ko.dependentObservable` need a `this` as its second argument there?

## Check

```bash
npm run test:start -- exercises/05-observable-array
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
