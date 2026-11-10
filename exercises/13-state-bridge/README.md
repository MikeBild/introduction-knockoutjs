*English · [Deutsch](README.de.md)*

# 13 · Share state between the old and the new world

During a migration, Knockout pages and new Web Components need the same state, for example a cart. Instead of maintaining it twice, you agree on a small, framework-neutral contract: `get()` and `subscribe(listener)`, which returns an unsubscribe function. No library, just TypeScript.

## Task

1. Open `start/bridge.ts`.
2. Implement `createStore`: current value, listeners in a `Set`, `set` ignores equal values.
3. Implement `toStore`: `get` reads via `peek` without creating a dependency, `subscribe` reports changes only and returns a function that ends the Knockout subscription.
4. Implement `fromStore`: initial value via `get`, then every change. To the outside you only expose a `pureComputed`; `dispose` unsubscribes.
5. Read `CartBadge`: the Web Component receives the store as a property and unsubscribes in `disconnectedCallback`. Bridges that never unsubscribe are the most common memory leaks of a migration.

## Check

```bash
npm run test:start -- exercises/13-state-bridge
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
