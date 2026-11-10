import ko from 'knockout'

export type Attributes = Record<string, ko.Observable<string | null>>
type ViewModel = object & { dispose?: () => void }

export type KnockoutElementOptions = {
  template: string
  createViewModel: (host: HTMLElement, attributes: Attributes) => ViewModel
  observedAttributes?: string[]
}

export const defineKnockoutElement = (tagName: string, options: KnockoutElementOptions) => {
  if (customElements.get(tagName)) return
  const observed = options.observedAttributes ?? []

  class KnockoutElement extends HTMLElement {
    static observedAttributes = observed
    // One Observable per observed attribute
    private readonly attrs: Attributes = Object.fromEntries(
      observed.map((name) => [name, ko.observable<string | null>(null)]),
    )

    // TODO: Write the new attribute value into the matching Observable
    attributeChangedCallback(name: string, _old: string | null, value: string | null) {
      void name
      void value
    }

    // TODO: Create a Shadow Root (mode: 'open') with a <div> containing options.template inside,
    //       create the ViewModel with options.createViewModel(this, this.attrs) and bind it to the <div>.
    //       Why Shadow DOM? Otherwise an outer ko.applyBindings binds into your content.
    connectedCallback() {}

    // TODO: ko.cleanNode on the <div>, call dispose of the ViewModel, remove the content
    disconnectedCallback() {}
  }

  customElements.define(tagName, KnockoutElement)
}

// Example from the workshop shop: quantity picker with attribute start and event quantity-change
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
      // TODO: Take over changes to start into quantity and end the subscription in dispose
      // TODO: change sets the quantity (never below 1) and dispatches CustomEvent 'quantity-change'
      //       with detail: quantity(), bubbles and composed
      const change = (next: number) => {
        quantity(next)
        void host
      }
      return {
        quantity,
        increment: () => change(quantity() + 1),
        decrement: () => change(quantity() - 1),
      }
    },
  })
