*English · [Deutsch](README.de.md)*

# 14 · No html binding with user input

The `html` binding sets `innerHTML`. If user input ends up there – for example a product review in the workshop shop – that is Cross-Site Scripting, XSS for short. In this exercise you close the gap and still build links – without markup from strings.

## Task

1. Open `start/reviews.ts` and find the gap in the template.
2. Replace `html: review.body` with the custom binding `linkify: review.body`.
3. Implement `linkify`: split the text, create text nodes and `<a>` elements with `document.createElement`. Allow only `http:` and `https:` and set `rel="noopener noreferrer"`.
4. Do not use `innerHTML` or `insertAdjacentHTML` anywhere.
5. Note for your own project: where does `html:` appear in a `data-bind` today, and where does the value come from?

Background: the binding parser of Knockout 3.5 creates functions from `data-bind` expressions. A Content Security Policy therefore needs `'unsafe-eval'`. More on this in exercise 15 (injected bindings) and exercise 16 (CSP and Trusted Types).

## Check

```bash
npm run test:start -- exercises/14-security
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
