import ko from 'knockout'
import { formatCents } from '../../shop.ts'

// TODO: update function: read the value (whole cents) with ko.unwrap and display it with formatCents
const currency: ko.BindingHandler<ko.MaybeSubscribable<number>> = {
  update: (element: HTMLElement, valueAccessor) => {
    void formatCents
    element.textContent = String(ko.unwrap(valueAccessor()))
  },
}

// TODO: init function: click listener on document, calls the handler only on clicks outside element
// TODO: Remove the listener again with ko.utils.domNodeDisposal.addDisposeCallback
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
