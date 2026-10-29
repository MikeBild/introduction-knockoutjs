import ko from 'knockout'

export type CustomerViewModel = {
  name: ko.Observable<string>
  email: ko.Observable<string>
  greeting: ko.PureComputed<string>
}

// View Model: Zustand und abgeleitete Werte, kein DOM
export const createCustomerViewModel = (customer: {
  name: string
  email: string
}): CustomerViewModel => {
  const name = ko.observable(customer.name)
  const email = ko.observable(customer.email)
  const greeting = ko.pureComputed(() => `Bestellung für ${name()}`)
  return { name, email, greeting }
}

// View: deklarative Bindings, keine Logik
export const customerTemplate = `
  <h2 data-bind="text: greeting"></h2>
  <label>Name <input data-bind="textInput: name" /></label>
  <label>E-Mail <input type="email" data-bind="textInput: email" /></label>
`

// Bindet genau einen Teilbaum und gibt das Aufräumen zurück
export const mountCustomer = (root: HTMLElement, vm: CustomerViewModel): (() => void) => {
  root.innerHTML = customerTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
