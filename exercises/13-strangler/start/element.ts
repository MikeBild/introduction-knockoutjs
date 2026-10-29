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

export const defineCounterElement = () =>
  defineKnockoutElement('ko-counter', {
    observedAttributes: ['start'],
    template: `<button type="button" data-bind="click: increment, text: 'Zähler: ' + count()"></button>`,
    createViewModel: (host, attributes) => {
      const start = attributes['start'] ?? ko.observable<string | null>(null)
      const count = ko.observable(Number(start() ?? 0))
      // TODO: Änderungen an start in count übernehmen und die Subscription in dispose beenden
      return {
        count,
        increment: () => {
          count(count() + 1)
          // TODO: CustomEvent 'count-change' mit detail: count(), bubbles und composed auslösen
          void host
        },
      }
    },
  })
