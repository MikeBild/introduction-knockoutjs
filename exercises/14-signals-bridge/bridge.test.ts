import { computed, signal } from '@preact/signals-core'
import ko from 'knockout'
import { Subject, debounceTime } from 'rxjs'
import { describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/bridge.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/bridge.ts`)
const { fromKo, toKo, koToSignal, signalToKo } = impl

describe('Knockout und RxJS', () => {
  it('fromKo sendet den aktuellen Wert und jede Änderung', () => {
    const name = ko.observable('Ada')
    const values: string[] = []
    const subscription = fromKo(name).subscribe((value) => values.push(value))
    name('Grace')
    expect(values).toEqual(['Ada', 'Grace'])
    subscription.unsubscribe()
    expect(name.getSubscriptionsCount()).toBe(0)
  })

  it('fromKo erlaubt RxJS-Operatoren auf Knockout-Werten', () => {
    vi.useFakeTimers()
    const query = ko.observable('')
    const seen: string[] = []
    const subscription = fromKo(query)
      .pipe(debounceTime(300))
      .subscribe((value) => seen.push(value))
    query('k')
    query('ko')
    vi.advanceTimersByTime(300)
    expect(seen).toEqual(['ko'])
    subscription.unsubscribe()
  })

  it('toKo macht aus einem Stream ein lesbares Observable', () => {
    const source$ = new Subject<number>()
    const bridge = toKo(source$, 0)
    source$.next(42)
    expect(bridge.value()).toBe(42)
    expect(ko.isWritableObservable(bridge.value)).toBe(false)
    bridge.dispose()
    source$.next(7)
    expect(bridge.value()).toBe(42)
    expect(source$.observed).toBe(false)
  })
})

describe('Knockout und Signals', () => {
  it('koToSignal hält ein Signal aktuell, auch für computed', () => {
    const count = ko.observable(1)
    const bridge = koToSignal(count)
    const double = computed(() => bridge.signal.value * 2)
    count(5)
    expect(double.value).toBe(10)
    bridge.dispose()
    count(6)
    expect(bridge.signal.value).toBe(5)
  })

  it('signalToKo treibt Knockout-Bindings aus einem Signal', () => {
    const count = signal(1)
    const bridge = signalToKo(count)
    document.body.innerHTML = '<output data-bind="text: count"></output>'
    ko.applyBindings({ count: bridge.value }, document.body)
    count.value = 3
    expect(document.querySelector('output')?.textContent).toBe('3')
    bridge.dispose()
    count.value = 4
    expect(document.querySelector('output')?.textContent).toBe('3')
  })
})
