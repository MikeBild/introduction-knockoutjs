import { effect, signal, type ReadonlySignal } from '@preact/signals-core'
import ko from 'knockout'
import { Observable } from 'rxjs'

// Knockout → RxJS: aktueller Wert sofort, danach jede Änderung; unsubscribe beendet die KO-Subscription
export const fromKo = <T>(source: ko.Subscribable<T>): Observable<T> =>
  new Observable<T>((subscriber) => {
    subscriber.next(ko.unwrap(source))
    const subscription = source.subscribe((value) => subscriber.next(value))
    return () => subscription.dispose()
  })

// RxJS → Knockout: Werte landen in einem Observable, nach außen nur lesbar
export const toKo = <T>(source$: Observable<T>, initial: T) => {
  const target = ko.observable(initial) as ko.Observable<T>
  const subscription = source$.subscribe((value) => target(value))
  return { value: ko.pureComputed(() => target()), dispose: () => subscription.unsubscribe() }
}

// Knockout → Signal
export const koToSignal = <T>(source: ko.Subscribable<T>) => {
  const target = signal<T>(ko.unwrap(source))
  const subscription = source.subscribe((value) => {
    target.value = value
  })
  return { signal: target as ReadonlySignal<T>, dispose: () => subscription.dispose() }
}

// Signal → Knockout: effect liest das Signal und schreibt bei jeder Änderung
export const signalToKo = <T>(source: ReadonlySignal<T>) => {
  const target = ko.observable(source.peek()) as ko.Observable<T>
  const stop = effect(() => {
    target(source.value)
  })
  return { value: ko.pureComputed(() => target()), dispose: stop }
}
