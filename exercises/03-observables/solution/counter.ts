import ko from 'knockout'

// Ein Observable ist eine Funktion: ohne Argument lesen, mit Argument schreiben
export const createCounter = (start = 0) => {
  const count = ko.observable(start)
  return {
    count,
    increment: () => count(count() + 1),
    reset: () => count(start),
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
  price: ko.Observable<number>,
  quantity: ko.Observable<number>,
  taxRate: ko.Observable<number>,
) => {
  let evaluations = 0
  const total = ko.pureComputed(() => {
    evaluations += 1
    return price() * quantity() * (1 + taxRate.peek())
  })
  return { total, evaluations: () => evaluations }
}
