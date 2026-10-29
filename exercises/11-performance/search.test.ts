import ko from 'knockout'
import { describe, expect, it, vi } from 'vitest'
import { products, type Product } from '../shop.ts'
import type * as Impl from './solution/search.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/search.ts`)
const { createLiveSearch, enableDeferredUpdates } = impl

// Steht für einen Request an die Produkt-API
const loadProducts = (query: string): Product[] =>
  products.filter((product) => product.name.toLowerCase().includes(query))

describe('rateLimit', () => {
  it('lädt erst, wenn die Eingabe 300 ms ruht', () => {
    vi.useFakeTimers()
    const load = vi.fn(loadProducts)
    const search = createLiveSearch(load)
    const seen: string[][] = []
    const subscription = search.results.subscribe((value) => seen.push(value.map((p) => p.name)))
    expect(search.loads()).toBe(1)

    search.query('s')
    vi.advanceTimersByTime(100)
    search.query('sc')
    vi.advanceTimersByTime(100)
    search.query('schraub')
    vi.advanceTimersByTime(299)
    expect(search.loads()).toBe(1)

    vi.advanceTimersByTime(1)
    expect(search.loads()).toBe(2)
    expect(load).toHaveBeenLastCalledWith('schraub')
    expect(seen).toEqual([['Schraubenset', 'Akkuschrauber']])
    subscription.dispose()
  })
})

describe('deferUpdates', () => {
  it('rechnet die Warenkorbsumme nach mehreren Änderungen nur einmal neu', () => {
    enableDeferredUpdates()
    const priceCents = ko.observable(1290)
    const quantity = ko.observable(1)
    let evaluations = 0
    const totalCents = ko.pureComputed(() => {
      evaluations += 1
      return priceCents() * quantity()
    })
    const seen: number[] = []
    const subscription = totalCents.subscribe((value) => seen.push(value))
    evaluations = 0

    priceCents(8990)
    quantity(2)
    ko.tasks.runEarly()

    expect(evaluations).toBe(1)
    expect(seen).toEqual([17980])
    subscription.dispose()
  })
})
