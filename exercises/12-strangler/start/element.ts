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
    // Je beobachtetem Attribut ein Observable
    private readonly attrs: Attributes = Object.fromEntries(
      observed.map((name) => [name, ko.observable<string | null>(null)]),
    )

    // TODO: neuen Attributwert in das passende Observable schreiben
    attributeChangedCallback(name: string, _old: string | null, value: string | null) {
      void name
      void value
    }

    // TODO: Shadow Root anlegen (mode: 'open'), darin ein <div> mit options.template,
    //       View Model mit options.createViewModel(this, this.attrs) erzeugen und auf das <div> binden.
    //       Warum Shadow DOM? Ein äußeres ko.applyBindings bindet sonst in deinen Inhalt hinein.
    connectedCallback() {}

    // TODO: ko.cleanNode auf das <div>, dispose des View Models aufrufen, Inhalt entfernen
    disconnectedCallback() {}
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
      // TODO: Änderungen an start in quantity übernehmen und die Subscription in dispose beenden
      // TODO: change setzt die Menge (nie unter 1) und löst CustomEvent 'quantity-change'
      //       mit detail: quantity(), bubbles und composed aus
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
