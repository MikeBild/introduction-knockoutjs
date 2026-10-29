import ko from 'knockout'

export type CustomerViewModel = {
  name: ko.Observable<string>
  email: ko.Observable<string>
  greeting: ko.PureComputed<string>
}

// TODO: greeting als pureComputed: „Bestellung für <Name>“
export const createCustomerViewModel = (customer: {
  name: string
  email: string
}): CustomerViewModel => {
  const name = ko.observable(customer.name)
  const email = ko.observable(customer.email)
  const greeting = ko.pureComputed(() => '')
  return { name, email, greeting }
}

// TODO: <h2> mit text: greeting, zwei Labels „Name“ und „E-Mail“ mit Inputs (textInput)
export const customerTemplate = `
  <h2></h2>
`

// TODO: Template einsetzen, ko.applyBindings nur auf root, Cleanup mit ko.cleanNode zurückgeben
export const mountCustomer = (root: HTMLElement, vm: CustomerViewModel): (() => void) => {
  void vm
  root.innerHTML = customerTemplate
  return () => {}
}
