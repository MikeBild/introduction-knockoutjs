*English · [Deutsch](README.de.md)*

# 15 · Defuse injected bindings

Even without the `html` binding, Knockout can run code that an attacker supplies: if the server renders user HTML into an area that Knockout binds afterwards, `ko.applyBindings` evaluates every `data-bind` inside it. A harmless-looking product review with `data-bind="text: (function(){ … })()"` thus turns into code. This is called Binding Injection.

## Task

1. Read `sanitize.test.ts`. The first test is the counter-check: without sanitizing, the injected code runs.
2. Open `start/sanitize.ts` and parse the HTML via a `<template>` element. That way no scripts run while parsing.
3. Remove `data-bind`, `params` and all `on*` attributes from every element.
4. Remove `<script>` elements and comments that start with `ko` or `/ko` – those are virtual bindings.
5. Think about your own project: where does user HTML end up in an area that Knockout binds? Better than any sanitizing is not binding such areas at all.

`stripBindings` does not replace a complete HTML sanitizer. It only removes what Knockout would execute. For third-party markup you additionally need an allowlist for elements and attributes.

## Check

```bash
npm run test:start -- exercises/15-binding-injection
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
