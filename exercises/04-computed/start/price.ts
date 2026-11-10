import ko from 'knockout'

// TODO: priceText as a writable ko.pureComputed({ read, write })
// read: cents as euro text with a decimal comma, e.g. 1290 → “12,90”
// write: convert “12,90” and “12.90” into cents (Math.round), ignore invalid input
export const createPriceInput = (initialCents: number) => {
  const priceCents = ko.observable(initialCents)
  const priceText = ko.pureComputed<string>({
    read: () => String(priceCents()),
    write: (text) => {
      void text
    },
  })
  return { priceCents, priceText }
}
