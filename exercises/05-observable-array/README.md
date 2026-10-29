# 05 · observableArray verfolgt die Liste, nicht die Einträge

Ein `observableArray` meldet, wenn Einträge hinzukommen, wegfallen oder sich verschieben. Ob sich die Menge einer Position ändert, meldet es nicht – dafür braucht jede Position ein eigenes Observable. Beispiel ist der Warenkorb des Werkstatt-Shops (`exercises/shop.ts`), Geld immer in ganzen Cent.

## Aufgabe

1. Öffne `start/cart.ts`.
2. Implementiere `add`: Liegt das Produkt schon im Warenkorb, erhöhst du die Menge, sonst legst du eine Position mit Menge 1 an.
3. Implementiere `remove` und `clear` mit `items.remove(...)` und `items.removeAll()`.
4. Lass `totalCents` die Summe aus Menge mal `priceCents` bilden und `itemCount` alle Mengen zählen. Lies dafür in der Schleife `item.quantity()`.
5. Vergleich mit der alten Todo-App in `legacy/examples/Todos`: Warum braucht `ko.dependentObservable` dort ein `this` als zweites Argument?

## Prüfen

```bash
npm run test:start -- exercises/05-observable-array
```

`npm run test:start` testet deinen Ordner `start/`, `npm test` die Musterlösung.
