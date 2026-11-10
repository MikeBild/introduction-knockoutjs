*English · [Deutsch](README.de.md)*

# 11 · Use deferUpdates and rateLimit deliberately

By default Knockout updates synchronously: every change runs through all computeds and bindings immediately. `deferUpdates` batches changes in a microtask, `rateLimit` throttles individual Observables – for example the product search of the workshop shop while the user is typing.

## Task

1. Open `start/search.ts`.
2. Throttle `query` with `extend({ rateLimit: { timeout: 300, method: 'notifyWhenChangesStop' } })`. The search then only loads once the input has been idle for 300 milliseconds.
3. In `enableDeferredUpdates`, switch on the option `ko.options.deferUpdates`.
4. Read the tests: they use `vi.useFakeTimers()` for `rateLimit` and `ko.tasks.runEarly()` for `deferUpdates`.
5. Think about your own project: where would `deferUpdates` help globally, and where do you need `rateLimit` for specific cases?

## Check

```bash
npm run test:start -- exercises/11-performance
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
