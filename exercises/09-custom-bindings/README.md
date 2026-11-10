*English · [Deutsch](README.de.md)*

# 09 · Custom bindings encapsulate the DOM

Wherever you need DOM APIs, formatting or third-party widgets, the code belongs in a custom binding – not in the ViewModel. `init` runs once, `update` after every change, and everything you register, you unregister on removal.

## Task

1. Open `start/bindings.ts`.
2. Let `currency` read the value in whole cents with `ko.unwrap` and display it as euros with `formatCents` from `exercises/shop.ts`. That way the binding works with Observables and with plain numbers.
3. In `clickOutside`, register a click listener on the `document`. Call the handler only for clicks outside the element – that is how the mini cart of the workshop shop closes.
4. Remove the listener with `ko.utils.domNodeDisposal.addDisposeCallback`.
5. Check: what happens without a dispose callback when a component is shown and hidden a hundred times?

## Check

```bash
npm run test:start -- exercises/09-custom-bindings
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
