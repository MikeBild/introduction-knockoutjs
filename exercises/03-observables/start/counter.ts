import ko from 'knockout'

// TODO: count als Observable mit dem Startwert, increment erhöht um eins, reset setzt auf start zurück
export const createCounter = (start = 0) => {
  const count = ko.observable(start)
  return {
    count,
    increment: () => {},
    reset: () => {},
  }
}

// TODO: source.subscribe nutzen, jeden neuen Wert in values sammeln, dispose beendet die Subscription
export const recordChanges = <T>(source: ko.Subscribable<T>): { values: T[]; dispose(): void } => {
  void source
  const values: T[] = []
  return { values, dispose: () => {} }
}

// TODO: total hängt von price und quantity ab, taxRate liest du mit peek – ohne Abhängigkeit
export const createAuditedTotal = (
  price: ko.Observable<number>,
  quantity: ko.Observable<number>,
  taxRate: ko.Observable<number>,
) => {
  let evaluations = 0
  const total = ko.pureComputed(() => {
    evaluations += 1
    return price() * quantity() * (1 + taxRate())
  })
  return { total, evaluations: () => evaluations }
}
