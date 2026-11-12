*English · [Deutsch](README.de.md)*

# Exercises: Knockout

Exercise repository for the workshop “Modernize KnockoutJS and migrate step by step”. Each exercise has a starting point, tests and a reference solution. All exercises from 02 onward build on the same example, a small workshop shop.

## What you learn

- Understand MVVM (Model View ViewModel), Observables and Bindings properly
- Run Knockout with TypeScript, ES modules and Vite, test it, speed it up
- Secure Knockout code and migrate it step by step

## Prerequisites

- **Node.js 26** – `nvm use` reads the version from [`.nvmrc`](.nvmrc).
- Git and an editor with TypeScript support, e.g. VS Code

Deliberately few dependencies: Knockout 3.5, TypeScript, Vite and Vitest, plus happy-dom and Testing Library for tests. No further frameworks or plugins.

## Setup

```bash
git clone https://github.com/MikeBild/introduction-knockoutjs.git
cd introduction-knockoutjs
nvm use
npm install
npm test             # all tests against the reference solutions in solution/
npm run typecheck    # TypeScript strict
```

## How to work on an exercise

Each exercise has a starting point in `start/` (this is where you work) and a reference solution in `solution/`. The test file sits next to them and loads one variant or the other depending on `TARGET`.

```bash
npm run test:start   # all tests against your code in start/
npm run test:start -- exercises/05-observable-array   # one exercise only
npm run dev          # start the workshop shop with Vite (index.html, app/)
npm run build && npx vite preview   # built app with Content Security Policy (exercise 16)
```

## Exercises

| No. | Exercise | Topic |
| --- | --- | --- |
| 01 | [legacy-audit](exercises/01-legacy-audit) | Find outdated patterns in Knockout code (the old Todo app) |
| 02 | [mvvm](exercises/02-mvvm) | Customer data: separate ViewModel and View |
| 03 | [observables](exercises/03-observables) | Quantity and total: observable, subscribe, peek |
| 04 | [computed](exercises/04-computed) | Price field: pureComputed with read and write |
| 05 | [observable-array](exercises/05-observable-array) | Cart with observableArray |
| 06 | [bindings](exercises/06-bindings) | Shop UI with built-in bindings |
| 07 | [components](exercises/07-components) | Cart line as a component with params and dispose |
| 08 | [typescript-vite](exercises/08-typescript-vite) | Types, ESM and Vite, the shop as an app |
| 09 | [custom-bindings](exercises/09-custom-bindings) | Custom bindings for prices and the mini cart |
| 10 | [testing](exercises/10-testing) | Test the product search with Vitest, happy-dom and Testing Library |
| 11 | [performance](exercises/11-performance) | Live search with rateLimit, totals with deferUpdates |
| 12 | [strangler](exercises/12-strangler) | Quantity picker as a Custom Element, migration step by step |
| 13 | [state-bridge](exercises/13-state-bridge) | Share the cart between Knockout and Web Components via a store contract |
| 14 | [security](exercises/14-security) | Show reviews without the html binding |
| 15 | [binding-injection](exercises/15-binding-injection) | Defuse injected bindings |
| 16 | [csp](exercises/16-csp) | Content Security Policy, unsafe-eval and Trusted Types |

## The workshop shop

The shop sells workshop supplies: customer data, products, cart, order and reviews. Shared data and helpers live in [`exercises/shop.ts`](exercises/shop.ts): the type `Product`, four sample products and `formatCents`. Money is stored in whole cents everywhere (`priceCents`); only the display turns it into euros.

## Status as of October 2026

- **Knockout 3.5.3** from March 25, 2026 is the current version. After 3.5.1 (2019), two maintenance releases followed in 2026: 3.5.2 with bug fixes, support for Trusted Types and more precise type definitions, 3.5.3 with fixes for strict mode and computed types.
- Knockout 3.x hardly gets new features anymore. Development continues in **TKO** (Knockout 4, `@tko/build.knockout` as the compatible build, `@tko/build.reference` as the modern build), stable since April 2026.
- Many enterprise applications keep running on Knockout 3.5. This repository is made exactly for them.

## Workshop and slides

- Workshop (held in German): [“Modernize KnockoutJS and migrate step by step”](https://workshops.mikebild.dev/w/knockout/remote/)
- Slides: [slides.mikebild.dev/introduction-knockoutjs.en](https://slides.mikebild.dev/introduction-knockoutjs.en.html)
- PDF: [introduction-knockoutjs.en.pdf](https://objects.upraft.mikebild.info/site-media/mikebild/decks/introduction-knockoutjs/introduction-knockoutjs.en.pdf)
- Video: [introduction-knockoutjs.en.mp4](https://objects.upraft.mikebild.info/site-media/mikebild/decks/introduction-knockoutjs/introduction-knockoutjs.en.mp4)

## Archive

The folder [`archive/`](archive) contains the original introduction material from 2015 (Bower, global `ko`, `ko.dependentObservable`, mapping plugin) as a showcase for exercise 01 and for comparing old and new.

## License

[MIT](LICENSE)
