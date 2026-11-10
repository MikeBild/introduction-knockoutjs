*English · [Deutsch](README.de.md)*

# 12 · Migrate step by step instead of rewriting

With the Strangler pattern you replace an application piece by piece. The boundary between old and new consists of Custom Elements: attributes in, events out. That way Knockout code runs on any page that speaks HTML, and a new Web Component runs inside a Knockout page.

## Task

1. Open `start/element.ts`.
2. In `attributeChangedCallback`, write the new value into the matching Observable.
3. In `connectedCallback`, create a Shadow Root, put the template into a `<div>` and bind the ViewModel with `ko.applyBindings` to this `<div>` only.
4. Clean up in `disconnectedCallback`: `ko.cleanNode`, `dispose` of the ViewModel, remove the content.
5. Complete `ko-quantity`, the quantity picker of the workshop shop: take over the attribute `start`, change the quantity on “+” and “−” (never below 1) and dispatch a `CustomEvent('quantity-change')` with `bubbles` and `composed`.

The fourth test shows the other direction: a Knockout page uses the element with the `attr` and `event` bindings – that is exactly how you integrate any new Web Component.

## Check

```bash
npm run test:start -- exercises/12-strangler
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
