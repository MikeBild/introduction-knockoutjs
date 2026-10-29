// Werkstatt-Shop: das durchgehende Beispiel aller Übungen. Geld immer in ganzen Cent.
export type Product = { id: string; name: string; priceCents: number; stock: number }

export const products: Product[] = [
  { id: 'p-screws', name: 'Schraubenset', priceCents: 1290, stock: 25 },
  { id: 'p-drill', name: 'Akkuschrauber', priceCents: 8990, stock: 5 },
  { id: 'p-bench', name: 'Werkbank', priceCents: 24900, stock: 0 },
  { id: 'p-gloves', name: 'Arbeitshandschuhe', priceCents: 790, stock: 40 },
]

const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

// Nur zur Anzeige wird aus Cent ein Euro-Betrag
export const formatCents = (cents: number): string => euro.format(cents / 100)
