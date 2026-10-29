import ko from 'knockout'
import { describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/search.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/search.ts`)
const { createLiveSearch, enableDeferredUpdates } = impl

const names = ['Ada', 'Grace', 'Margaret', 'Hedy']
const filterNames = (query: string) => names.filter((name) => name.toLowerCase().includes(query))

describe('rateLimit', () => {
  it('lädt erst, wenn die Eingabe 300 ms ruht', () => {
    vi.useFakeTimers()
    const load = vi.fn(filterNames)
    const search = createLiveSearch(load)
    const seen: string[][] = []
    const subscription = search.results.subscribe((value) => seen.push(value))
    expect(search.loads()).toBe(1)

    search.query('m')
    vi.advanceTimersByTime(100)
    search.query('ma')
    vi.advanceTimersByTime(100)
    search.query('mar')
    vi.advanceTimersByTime(299)
    expect(search.loads()).toBe(1)

    vi.advanceTimersByTime(1)
    expect(search.loads()).toBe(2)
    expect(load).toHaveBeenLastCalledWith('mar')
    expect(seen).toEqual([['Margaret']])
    subscription.dispose()
  })
})

describe('deferUpdates', () => {
  it('rechnet nach mehreren Änderungen nur einmal neu', () => {
    enableDeferredUpdates()
    const first = ko.observable('Ada')
    const last = ko.observable('Lovelace')
    let evaluations = 0
    const full = ko.pureComputed(() => {
      evaluations += 1
      return `${first()} ${last()}`
    })
    const seen: string[] = []
    const subscription = full.subscribe((value) => seen.push(value))
    evaluations = 0

    first('Grace')
    last('Hopper')
    ko.tasks.runEarly()

    expect(evaluations).toBe(1)
    expect(seen).toEqual(['Grace Hopper'])
    subscription.dispose()
  })
})
