import ko from 'knockout'

// Framework-neutral contract: every world – Knockout, Web Component, later something new – speaks only this
export type Store<T> = {
  get(): T
  subscribe(listener: (value: T) => void): () => void
}

export type WritableStore<T> = Store<T> & { set(value: T): void }

// TODO: Hold the current value, collect listeners in a Set.
//       set ignores equal values (Object.is) and otherwise calls all listeners.
//       subscribe returns a function that removes the listener again.
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

// TODO: get reads the value without a dependency (peek), subscribe reports changes only –
//       do NOT call the listener immediately. The return value ends the Knockout subscription.
export const toStore = <T>(source: ko.Subscribable<T>): Store<T> => ({
  get: () => ko.unwrap(source),
  subscribe: () => () => {},
})

// TODO: Initial value via store.get, then take over every change via store.subscribe.
//       dispose unsubscribes from the store.
export const fromStore = <T>(store: Store<T>) => {
  const target = ko.observable(store.get()) as ko.Observable<T>
  return { value: ko.pureComputed(() => target()), dispose: () => {} }
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
