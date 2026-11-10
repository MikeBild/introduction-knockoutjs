import ko from 'knockout'
import { formatCents } from '../../shop.ts'

// update runs on binding and after every change of the Observables it read; the value is whole cents
const currency: ko.BindingHandler<ko.MaybeSubscribable<number>> = {
  update: (element: HTMLElement, valueAccessor) => {
    element.textContent = formatCents(ko.unwrap(valueAccessor()))
  },
}

// init runs once; whatever you register there, you unregister in the dispose callback
const clickOutside: ko.BindingHandler<(event: MouseEvent) => void> = {
  init: (element: HTMLElement, valueAccessor) => {
    const handler = (event: MouseEvent) => {
      if (!element.contains(event.target as Node)) valueAccessor()(event)
    }
    document.addEventListener('click', handler)
    ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
      document.removeEventListener('click', handler)
    })
  },
}

export const registerBindings = () => {
  ko.bindingHandlers['currency'] = currency
  ko.bindingHandlers['clickOutside'] = clickOutside
}
