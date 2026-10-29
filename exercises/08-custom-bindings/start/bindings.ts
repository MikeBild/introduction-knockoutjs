import ko from 'knockout'

// TODO: update-Funktion: Wert mit ko.unwrap lesen und als Euro formatieren
//       (Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }))
const currency: ko.BindingHandler<ko.MaybeSubscribable<number>> = {
  update: (element: HTMLElement, valueAccessor) => {
    element.textContent = String(ko.unwrap(valueAccessor()))
  },
}

// TODO: init-Funktion: Klick-Listener am document, ruft den Handler nur bei Klicks außerhalb von element
// TODO: Listener mit ko.utils.domNodeDisposal.addDisposeCallback wieder entfernen
const clickOutside: ko.BindingHandler<(event: MouseEvent) => void> = {
  init: (element: HTMLElement, valueAccessor) => {
    void element
    void valueAccessor
  },
}

export const registerBindings = () => {
  ko.bindingHandlers['currency'] = currency
  ko.bindingHandlers['clickOutside'] = clickOutside
}
