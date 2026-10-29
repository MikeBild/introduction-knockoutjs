import ko from 'knockout'

export type Attributes = Record<string, ko.Observable<string | null>>
type ViewModel = object & { dispose?: () => void }

export type KnockoutElementOptions = {
  template: string
  createViewModel: (host: HTMLElement, attributes: Attributes) => ViewModel
  observedAttributes?: string[]
}

// Hüllt Knockout in ein Custom Element: jede Seite – React, Svelte, statisches HTML – kann es nutzen.
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

// Beispiel: ein Zähler mit Attribut start und Event count-change
export const defineCounterElement = () =>
  defineKnockoutElement('ko-counter', {
    observedAttributes: ['start'],
    template: `<button type="button" data-bind="click: increment, text: 'Zähler: ' + count()"></button>`,
    createViewModel: (host, attributes) => {
      const start = attributes['start'] ?? ko.observable<string | null>(null)
      const count = ko.observable(Number(start() ?? 0))
      const subscription = start.subscribe((value) => count(Number(value ?? 0)))
      return {
        count,
        increment: () => {
          count(count() + 1)
          host.dispatchEvent(
            new CustomEvent('count-change', { detail: count(), bubbles: true, composed: true }),
          )
        },
        dispose: () => subscription.dispose(),
      }
    },
  })
