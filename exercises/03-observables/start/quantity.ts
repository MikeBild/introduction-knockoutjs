import ko from 'knockout'

// TODO: increment erhöht um eins, decrement senkt um eins – nie unter 1
export const createQuantity = (start = 1) => {
  const quantity = ko.observable(Math.max(1, start))
  return {
    quantity,
    increment: () => {},
    decrement: () => {},
  }
}

// TODO: source.subscribe nutzen, jeden neuen Wert in values sammeln, dispose beendet die Subscription
export const recordChanges = <T>(source: ko.Subscribable<T>): { values: T[]; dispose(): void } => {
  void source
  const values: T[] = []
  return { values, dispose: () => {} }
}

// TODO: totalCents hängt von priceCents und quantity ab, taxRate liest du mit peek – ohne Abhängigkeit
export const createAuditedTotal = (
  priceCents: ko.Observable<number>,
  quantity: ko.Observable<number>,
  taxRate: ko.Observable<number>,
) => {
  let evaluations = 0
  const totalCents = ko.pureComputed(() => {
    evaluations += 1
    return Math.round(priceCents() * quantity() * (1 + taxRate()))
  })
  return { totalCents, evaluations: () => evaluations }
}
