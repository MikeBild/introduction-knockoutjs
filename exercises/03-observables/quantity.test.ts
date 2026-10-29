import ko from 'knockout'
import { describe, expect, it } from 'vitest'
import { products } from '../shop.ts'
import type * as Impl from './solution/quantity.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/quantity.ts`)
const { createQuantity, recordChanges, createAuditedTotal } = impl

describe('Observables', () => {
  it('erhöht die Menge und senkt sie nie unter 1', () => {
    const item = createQuantity(2)
    item.increment()
    expect(item.quantity()).toBe(3)
    item.decrement()
    item.decrement()
    item.decrement()
    expect(item.quantity()).toBe(1)
  })

  it('meldet jeden neuen Wert, aber gleiche Primitive nur einmal', () => {
    const item = createQuantity()
    const recording = recordChanges(item.quantity)
    item.increment()
    item.quantity(2)
    item.increment()
    expect(recording.values).toEqual([2, 3])
  })

  it('meldet nach dispose nichts mehr', () => {
    const item = createQuantity()
    const recording = recordChanges(item.quantity)
    item.increment()
    recording.dispose()
    item.increment()
    expect(recording.values).toEqual([2])
    expect(item.quantity.getSubscriptionsCount()).toBe(0)
  })

  it('rechnet bei Preis und Menge neu, beim Steuersatz nicht', () => {
    const priceCents = ko.observable(products[0]?.priceCents ?? 1290)
    const quantity = ko.observable(2)
    const taxRate = ko.observable(0.19)
    const audited = createAuditedTotal(priceCents, quantity, taxRate)
    const recording = recordChanges(audited.totalCents)
    expect(audited.totalCents()).toBe(3070)
    quantity(3)
    expect(recording.values.at(-1)).toBe(4605)
    const before = audited.evaluations()
    taxRate(0.07)
    expect(audited.evaluations()).toBe(before)
    recording.dispose()
  })
})
