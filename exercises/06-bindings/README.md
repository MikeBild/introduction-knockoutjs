*English · [Deutsch](README.de.md)*

# 06 · Which bindings do you really need?

With a handful of built-in bindings you build the complete UI of the workshop shop: product list, cart, total and order form. You need `foreach` with `as`, `text`, `click`, `enable`, `attr`, `visible`, `value`, `textInput` and `submit`. The ViewModel is ready (`shop-view.ts`; the cart from exercise 05 sits next to it as `cart.ts`). The UI text stays German – the tests check the exact strings.

## Task

1. Open `start/cart-view.ts`.
2. Render the products with `foreach: { data: products, as: 'product' }`: name, price via `$parent.formatCents(product.priceCents)` and a button “In den Warenkorb” with `click: $parent.add`. Disable sold-out products with `enable: product.stock > 0`. Next to it goes “Ausverkauft” (a `<small>` with the ID `sold-out-<id>`), and the button points to it via `aria-describedby`. That way a screen reader also learns why the button is disabled.
3. Render the cart with `foreach: { data: cart.items, as: 'item' }`. Bind the quantity to `value: item.quantityText`, because the `value` binding writes strings. The button “Entfernen” calls `$parent.cart.remove`.
4. Show “Dein Warenkorb ist leer. Leg oben ein Produkt hinein.” only when the cart is empty, and below it the total with `formatCents(cart.totalCents())`.
5. Build the form with `submit: placeOrder`, a label “E-Mail” and the button “Bestellen” with `enable: canOrder`. While it is disabled, a `<small id="order-hint">` with `text: orderHint` names the reason, and the button points to it via `aria-describedby="order-hint"`.

Give the buttons an `aria-label` with the product name via `attr`, for example “In den Warenkorb: Schraubenset”. Tests and screen readers can then find them unambiguously.

## Check

```bash
npm run test:start -- exercises/06-bindings
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
