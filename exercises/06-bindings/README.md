# 06 · Welche Bindings brauchst du wirklich?

Mit einer Handvoll eingebauter Bindings baust du die komplette Oberfläche des Werkstatt-Shops: Produktliste, Warenkorb, Summe und Bestellformular. Du brauchst `foreach` mit `as`, `text`, `click`, `enable`, `attr`, `visible`, `value`, `textInput` und `submit`. Das View Model ist fertig (`shop-view.ts`, der Warenkorb aus Übung 05 liegt als `cart.ts` daneben).

## Aufgabe

1. Öffne `start/cart-view.ts`.
2. Rendere die Produkte mit `foreach: { data: products, as: 'product' }`: Name, Preis über `$parent.formatCents(product.priceCents)` und einen Button „In den Warenkorb“ mit `click: $parent.add`. Ausverkaufte Produkte sperrst du mit `enable: product.stock > 0`.
3. Rendere den Warenkorb mit `foreach: { data: cart.items, as: 'item' }`. Bind die Menge an `value: item.quantityText`, denn das `value`-Binding schreibt Strings. Der Button „Entfernen“ ruft `$parent.cart.remove` auf.
4. Zeig „Dein Warenkorb ist leer. Leg oben ein Produkt hinein.“ nur bei leerem Warenkorb und darunter die Summe mit `formatCents(cart.totalCents())`.
5. Baue das Formular mit `submit: placeOrder`, einem Label „E-Mail“ und dem Button „Bestellen“ mit `enable: canOrder`.

Gib den Buttons per `attr` ein `aria-label` mit dem Produktnamen, etwa „In den Warenkorb: Schraubenset“. Tests und Screenreader finden sie so eindeutig.

## Prüfen

```bash
npm run test:start -- exercises/06-bindings
```

`npm run test:start` testet deinen Startpunkt in `start/`, `npm test` die Lösung in `solution/`.
