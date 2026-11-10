*English · [Deutsch](README.de.md)*

# 08 · Knockout with TypeScript, ESM and Vite

Knockout 3.5 ships its own type definitions. With `import ko from 'knockout'`, TypeScript strict and Vite, script tags, Bower and the global `ko` disappear. The examples are the form fields of the workshop shop: email and quantity.

## Task

1. Open `start/field.ts` and replace the `any` types with `ko.Observable<T>` and `ko.PureComputed<…>`.
2. Implement `createField`: `value` as an Observable, `error` as a `pureComputed` from the validator, `isValid` as a `pureComputed`.
3. Run `npm run typecheck`. The test checks with `expectTypeOf` that the types are right.
4. Start the workshop shop with `npm run dev`. It lives in `index.html` and `app/` (`main.ts`, `shop.ts`, `cart-line.ts`) and loads the template `app/shop.html` via a `?raw` import.
5. Read `tsconfig.json`: `strict`, `noUncheckedIndexedAccess` and `verbatimModuleSyntax` are on. Which of them would report the most errors in your project today?

## Check

```bash
npm run test:start -- exercises/08-typescript-vite
npm run typecheck
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
