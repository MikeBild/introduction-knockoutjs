*English · [Deutsch](README.de.md)*

# 16 · Content Security Policy and Trusted Types

A Content Security Policy, CSP for short, limits where a page loads and runs code from. Knockout 3.5 has a peculiarity here: the binding parser translates every `data-bind` expression with `new Function`. Without `'unsafe-eval'` in `script-src`, Knockout 3.5 therefore binds nothing at all. The CSP still protects against third-party scripts, but not against injected bindings – for that you need exercises 14 and 15. A CSP-friendly parser without `eval` only arrives with TKO (Knockout 4).

Trusted Types go one step further: with `require-trusted-types-for 'script'`, the browser only accepts values for `innerHTML` that a policy has produced. Knockout 3.5.2 and newer pass such values through in the `html` binding.

## Task

1. Open `start/csp.ts` and build the header string in `buildCsp` from the directives in the comment.
2. Implement `createHtmlPolicy`: if `globalThis.trustedTypes` exists, create the policy `knockout-html`. Otherwise return `{ createHTML: sanitize }`. happy-dom has no Trusted Types, so you need the fallback.
3. Read the test for the `html` binding: only what has passed through the policy ends up in the DOM.
4. Build the app and start the preview with CSP:

   ```bash
   npm run build
   npx vite preview
   ```

   `vite.config.ts` sets the header from `buildCsp({ allowEval: true })`. Open the app and check the header `Content-Security-Policy` in the DevTools under Network.
5. Trial: set `allowEval: false` in `vite.config.ts`, rebuild and load the preview. The console reports a CSP violation, the product list stays empty. Then switch it back.

## Check

```bash
npm run test:start -- exercises/16-csp
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
