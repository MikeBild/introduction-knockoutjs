import { signal, type ReadonlySignal } from '@preact/signals-core'
import ko from 'knockout'
import { Observable } from 'rxjs'

// TODO: new Observable: aktuellen Wert sofort senden (ko.unwrap), dann source.subscribe,
//       beim Unsubscribe die Knockout-Subscription mit dispose beenden
export const fromKo = <T>(source: ko.Subscribable<T>): Observable<T> =>
  new Observable<T>(() => {
    void source
  })

// TODO: Werte aus source$ in ein ko.observable schreiben, nach außen ein pureComputed zurückgeben
export const toKo = <T>(source$: Observable<T>, initial: T) => {
  void source$
  const target = ko.observable(initial) as ko.Observable<T>
  return { value: ko.pureComputed(() => target()), dispose: () => {} }
}

// TODO: signal mit dem aktuellen Wert anlegen und bei jeder Knockout-Änderung aktualisieren
export const koToSignal = <T>(source: ko.Subscribable<T>) => {
  const target = signal<T>(ko.unwrap(source))
  return { signal: target as ReadonlySignal<T>, dispose: () => {} }
}

// TODO: mit effect() aus @preact/signals-core das Signal lesen und in das Observable schreiben,
//       dispose stoppt den effect
export const signalToKo = <T>(source: ReadonlySignal<T>) => {
  const target = ko.observable(source.peek()) as ko.Observable<T>
  return { value: ko.pureComputed(() => target()), dispose: () => {} }
}
