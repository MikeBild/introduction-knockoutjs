import ko from 'knockout'

// Framework-neutraler Vertrag: jede Welt – Knockout, Web Component, später etwas Neues – spricht nur diesen
export type Store<T> = {
  get(): T
  subscribe(listener: (value: T) => void): () => void
}

export type WritableStore<T> = Store<T> & { set(value: T): void }

// TODO: aktuellen Wert halten, Listener in einem Set sammeln.
//       set ignoriert gleiche Werte (Object.is) und ruft sonst alle Listener auf.
//       subscribe gibt eine Funktion zurück, die den Listener wieder entfernt.
export const createStore = <T>(initial: T): WritableStore<T> => {
  let current = initial
  return {
    get: () => current,
    set: (value) => {
      current = value
    },
    subscribe: () => () => {},
  }
}

// TODO: get liest den Wert ohne Abhängigkeit (peek), subscribe meldet nur Änderungen –
//       den Listener NICHT sofort aufrufen. Die Rückgabe beendet die Knockout-Subscription.
export const toStore = <T>(source: ko.Subscribable<T>): Store<T> => ({
  get: () => ko.unwrap(source),
  subscribe: () => () => {},
})

// TODO: Startwert über store.get, danach jede Änderung per store.subscribe übernehmen.
//       dispose meldet sich vom Store ab.
export const fromStore = <T>(store: Store<T>) => {
  const target = ko.observable(store.get()) as ko.Observable<T>
  return { value: ko.pureComputed(() => target()), dispose: () => {} }
}

// Beispiel: ein Warenkorb, den eine Knockout-Seite und eine Web Component gemeinsam nutzen
export const createSharedCart = () => {
  const store = createStore<readonly string[]>([])
  return { ...store, add: (item: string) => store.set([...store.get(), item]) }
}

export type SharedCart = ReturnType<typeof createSharedCart>

// Neue Welt ohne Knockout: eine native Web Component, die nur den Store-Vertrag kennt.
// Objekte wie den Store übergibst du als Property, nicht als Attribut.
export class CartBadge extends HTMLElement {
  #store: Store<readonly string[]> | null = null
  #unsubscribe: (() => void) | null = null

  get store() {
    return this.#store
  }

  set store(store: Store<readonly string[]> | null) {
    this.#store = store
    if (this.isConnected) this.#connect()
  }

  connectedCallback() {
    this.#connect()
  }

  disconnectedCallback() {
    this.#unsubscribe?.()
    this.#unsubscribe = null
  }

  #connect() {
    this.#unsubscribe?.()
    this.#unsubscribe = null
    const store = this.#store
    if (!store) return
    const render = (items: readonly string[]) => {
      this.textContent = `Warenkorb: ${items.length}`
    }
    render(store.get())
    this.#unsubscribe = store.subscribe(render)
  }
}

export const defineCartBadge = () => {
  if (!customElements.get('cart-badge')) customElements.define('cart-badge', CartBadge)
}
