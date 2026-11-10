*English · [Deutsch](README.de.md)*

# 02 · Separate ViewModel and View cleanly

Model View ViewModel, MVVM for short, separates state from presentation. The ViewModel knows nothing about the DOM, the View contains no logic, and the bindings connect the two. The example is the customer details in the workshop shop.

## Task

1. Open `start/customer.ts`.
2. In `createCustomerViewModel`, create `greeting` as a `ko.pureComputed`: “Bestellung für <Name>” (the UI text is German, the tests expect it).
3. Write `customerTemplate`: an `<h2>` with `text: greeting` and two `<label>` elements “Name” and “E-Mail”, each with an `<input>` and `textInput`.
4. In `mountCustomer`, bind only the subtree you are given with `ko.applyBindings(vm, root)` – never the whole document.
5. Return a function that cleans up with `ko.cleanNode(root)`.

## Check

```bash
npm run test:start -- exercises/02-mvvm
```

`npm run test:start` tests your starting point in `start/`, `npm test` tests the reference solution in `solution/`.
