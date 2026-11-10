import ko from 'knockout'

// Writable pureComputed: cents internally, euros with a decimal comma in the input field
export const createPriceInput = (initialCents: number) => {
  const priceCents = ko.observable(initialCents)
  const priceText = ko.pureComputed<string>({
    read: () => (priceCents() / 100).toFixed(2).replace('.', ','),
    write: (text) => {
      const normalized = text.trim().replace(',', '.')
      if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return
      priceCents(Math.round(Number(normalized) * 100))
    },
  })
  return { priceCents, priceText }
}
