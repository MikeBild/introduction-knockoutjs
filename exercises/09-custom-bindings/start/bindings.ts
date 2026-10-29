import ko from 'knockout'
import { formatCents } from '../../shop.ts'

// TODO: update-Funktion: Wert (ganze Cent) mit ko.unwrap lesen und mit formatCents anzeigen
const currency: ko.BindingHandler<ko.MaybeSubscribable<number>> = {
  update: (element: HTMLElement, valueAccessor) => {
    void formatCents
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
