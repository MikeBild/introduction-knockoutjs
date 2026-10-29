import ko from 'knockout'

// TODO: priceText als schreibbares ko.pureComputed({ read, write })
// read: Cent als Euro-Text mit Komma, z. B. 1290 → „12,90“
// write: „12,90“ und „12.90“ in Cent umrechnen (Math.round), ungültige Eingaben ignorieren
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
