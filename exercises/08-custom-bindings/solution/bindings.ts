import ko from 'knockout'

const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

// update läuft beim Binden und nach jeder Änderung der gelesenen Observables
const currency: ko.BindingHandler<ko.MaybeSubscribable<number>> = {
  update: (element: HTMLElement, valueAccessor) => {
    element.textContent = euro.format(ko.unwrap(valueAccessor()))
  },
}

// init läuft einmal; was du dort anmeldest, meldest du im Dispose-Callback wieder ab
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
