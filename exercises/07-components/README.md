# 07 · Komponenten statt verschachtelter Templates

Eine Knockout-Komponente bündelt Template und View Model unter einem Tag-Namen. Daten kommen über `params`, Aufräumarbeit gehört in `dispose`. Beispiel ist eine Warenkorb-Zeile im Werkstatt-Shop (`cart.ts` ist der Warenkorb aus Übung 05).

## Aufgabe

1. Öffne `start/cart-line.ts`.
2. Berechne `lineTotalCents` als `pureComputed`: Menge mal `priceCents`.
3. Abonniere im Konstruktor `item.quantity` und setze bei jeder Änderung `changedAt`. Merk dir die Subscription und beende sie in `dispose`.
4. Implementiere `remove` (ruft `onRemove` mit der eigenen Position auf) und schreib das Template: Name, Mengenfeld, Positionssumme, Hinweis „geändert“ und Button „Entfernen“.
5. Registriere die Komponente in `registerCartLine` genau einmal als `cart-line`, mit der Klasse als `viewModel`.

Wichtig: Knockout ruft `viewModel` mit `new` auf. Eine Arrow Function scheitert deshalb – nimm eine Klasse oder `{ createViewModel }`. Komponenten laden asynchron, in Tests wartest du mit `findBy…`.

## Prüfen

```bash
npm run test:start -- exercises/07-components
```

`npm run test:start` testet deinen Startpunkt in `start/`, `npm test` die Lösung in `solution/`.
