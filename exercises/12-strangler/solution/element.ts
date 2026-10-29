import ko from 'knockout'

export type Attributes = Record<string, ko.Observable<string | null>>
type ViewModel = object & { dispose?: () => void }

export type KnockoutElementOptions = {
  template: string
  createViewModel: (host: HTMLElement, attributes: Attributes) => ViewModel
  observedAttributes?: string[]
}

// Hüllt Knockout in ein Custom Element: jede Seite, die HTML ausliefert, kann es nutzen.
// Shadow DOM verhindert, dass ein äußeres ko.applyBindings in den Inhalt hineinbindet.
export const defineKnockoutElement = (tagName: string, options: KnockoutElementOptions) => {
  if (customElements.get(tagName)) return
  const observed = options.observedAttributes ?? []

  class KnockoutElement extends HTMLElement {
    static observedAttributes = observed
    private readonly attrs: Attributes = Object.fromEntries(
      observed.map((name) => [name, ko.observable<string | null>(null)]),
    )
    private root: HTMLElement | null = null
    private viewModel: ViewModel | null = null

    attributeChangedCallback(name: string, _old: string | null, value: string | null) {
      this.attrs[name]?.(value)
    }

    connectedCallback() {
      if (this.root) return
      const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' })
      this.root = document.createElement('div')
      this.root.innerHTML = options.template
      shadow.replaceChildren(this.root)
      this.viewModel = options.createViewModel(this, this.attrs)
      ko.applyBindings(this.viewModel, this.root)
    }

    disconnectedCallback() {
      if (!this.root) return
      ko.cleanNode(this.root)
      this.viewModel?.dispose?.()
      this.root.remove()
      this.root = null
      this.viewModel = null
    }
  }

  customElements.define(tagName, KnockoutElement)
}


// Beispiel aus dem Werkstatt-Shop: Mengenwahl mit Attribut start und Event quantity-change
export const defineQuantityElement = () =>
  defineKnockoutElement('ko-quantity', {
    observedAttributes: ['start'],
    template: `
      <button type="button" aria-label="Menge verringern" data-bind="click: decrement">−</button>
      <output data-bind="text: quantity"></output>
      <button type="button" aria-label="Menge erhöhen" data-bind="click: increment">+</button>`,
    createViewModel: (host, attributes) => {
      const start = attributes['start'] ?? ko.observable<string | null>(null)
      const toQuantity = (value: string | null) => Math.max(1, Math.trunc(Number(value ?? 1)) || 1)
      const quantity = ko.observable(toQuantity(start()))
      const subscription = start.subscribe((value) => quantity(toQuantity(value)))
      const change = (next: number) => {
        quantity(Math.max(1, next))
        host.dispatchEvent(
          new CustomEvent('quantity-change', { detail: quantity(), bubbles: true, composed: true }),
        )
      }
      return {
        quantity,
        increment: () => change(quantity() + 1),
        decrement: () => change(quantity() - 1),
        dispose: () => subscription.dispose(),
      }
    },
  })
