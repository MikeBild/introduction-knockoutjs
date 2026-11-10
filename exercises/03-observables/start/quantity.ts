import ko from 'knockout'

// TODO: increment raises by one, decrement lowers by one – never below 1
export const createQuantity = (start = 1) => {
  const quantity = ko.observable(Math.max(1, start))
  return {
    quantity,
    increment: () => {},
    decrement: () => {},
  }
}

// TODO: Use source.subscribe, collect every new value in values, dispose ends the Subscription
export const recordChanges = <T>(source: ko.Subscribable<T>): { values: T[]; dispose(): void } => {
  void source
  const values: T[] = []
  return { values, dispose: () => {} }
}

// TODO: totalCents depends on priceCents and quantity, you read taxRate with peek – without a dependency
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
