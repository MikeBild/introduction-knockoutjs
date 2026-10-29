import ko from 'knockout'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/counter.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/counter.ts`)
const { createCounter, recordChanges, createAuditedTotal } = impl

describe('Observables', () => {
  it('zählt hoch und setzt zurück', () => {
    const counter = createCounter(5)
    counter.increment()
    counter.increment()
    expect(counter.count()).toBe(7)
    counter.reset()
    expect(counter.count()).toBe(5)
  })

  it('meldet jeden neuen Wert, aber gleiche Primitive nur einmal', () => {
    const counter = createCounter()
    const recording = recordChanges(counter.count)
    counter.increment()
    counter.count(1)
    counter.increment()
    expect(recording.values).toEqual([1, 2])
  })

  it('meldet nach dispose nichts mehr', () => {
    const counter = createCounter()
    const recording = recordChanges(counter.count)
    counter.increment()
    recording.dispose()
    counter.increment()
    expect(recording.values).toEqual([1])
    expect(counter.count.getSubscriptionsCount()).toBe(0)
  })

  it('rechnet bei Preis und Menge neu, beim Steuersatz nicht', () => {
    const price = ko.observable(10)
    const quantity = ko.observable(2)
    const taxRate = ko.observable(0.19)
    const audited = createAuditedTotal(price, quantity, taxRate)
    const recording = recordChanges(audited.total)
    expect(audited.total()).toBeCloseTo(23.8)
    quantity(3)
    expect(recording.values.at(-1)).toBeCloseTo(35.7)
    const before = audited.evaluations()
    taxRate(0.07)
    expect(audited.evaluations()).toBe(before)
    recording.dispose()
  })
})
