import ko from 'knockout'

// Framework-neutral contract: every world – Knockout, Web Component, later something new – speaks only this
export type Store<T> = {
  get(): T
  subscribe(listener: (value: T) => void): () => void
}

export type WritableStore<T> = Store<T> & { set(value: T): void }

// Simple store without a library: current value plus a set of listeners
export const createStore = <T>(initial: T): WritableStore<T> => {
  let current = initial
  const listeners = new Set<(value: T) => void>()
  return {
    get: () => current,
    set: (value) => {
      if (Object.is(value, current)) return
      current = value
      for (const listener of [...listeners]) listener(value)
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

// Knockout → Store: get reads without a dependency, subscribe reports changes only
export const toStore = <T>(source: ko.Subscribable<T>): Store<T> => ({
  get: () => (ko.isObservable(source) ? source.peek() : ko.unwrap(source)),
  subscribe: (listener) => {
    const subscription = source.subscribe(listener)
    return () => subscription.dispose()
  },
})

// Store → Knockout: initial value via get, then every change; read-only to the outside
export const fromStore = <T>(store: Store<T>) => {
  const target = ko.observable(store.get()) as ko.Observable<T>
  const unsubscribe = store.subscribe((value) => target(value))
  return { value: ko.pureComputed(() => target()), dispose: unsubscribe }
}

// Example: a cart that a Knockout page and a Web Component share
export const createSharedCart = () => {
  const store = createStore<readonly string[]>([])
  return { ...store, add: (item: string) => store.set([...store.get(), item]) }
}

export type SharedCart = ReturnType<typeof createSharedCart>

// New world without Knockout: a native Web Component that only knows the store contract.
// You pass objects like the store as a property, not as an attribute.
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
