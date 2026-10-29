import ko from 'knockout'

// Ein Observable ist eine Funktion: ohne Argument lesen, mit Argument schreiben
export const createQuantity = (start = 1) => {
  const quantity = ko.observable(Math.max(1, start))
  return {
    quantity,
    increment: () => quantity(quantity() + 1),
    decrement: () => quantity(Math.max(1, quantity() - 1)),
  }
}

// subscribe liefert eine Subscription, dispose beendet sie
export const recordChanges = <T>(source: ko.Subscribable<T>): { values: T[]; dispose(): void } => {
  const values: T[] = []
  const subscription = source.subscribe((value) => {
    values.push(value)
  })
  return { values, dispose: () => subscription.dispose() }
}

// peek liest einen Wert, ohne eine Abhängigkeit anzulegen
export const createAuditedTotal = (
  priceCents: ko.Observable<number>,
  quantity: ko.Observable<number>,
  taxRate: ko.Observable<number>,
) => {
  let evaluations = 0
  const totalCents = ko.pureComputed(() => {
    evaluations += 1
    return Math.round(priceCents() * quantity() * (1 + taxRate.peek()))
  })
  return { totalCents, evaluations: () => evaluations }
}
