import ko from 'knockout'

export type PersonViewModel = {
  firstName: ko.Observable<string>
  lastName: ko.Observable<string>
  greeting: ko.PureComputed<string>
}

// TODO: firstName und lastName als Observables anlegen
// TODO: greeting als pureComputed: „Hallo Vorname Nachname“
export const createPersonViewModel = (person: {
  firstName: string
  lastName: string
}): PersonViewModel => {
  const firstName = ko.observable(person.firstName)
  const lastName = ko.observable(person.lastName)
  const greeting = ko.pureComputed(() => '')
  return { firstName, lastName, greeting }
}

// TODO: <h2> mit text: greeting, zwei Labels mit Inputs (textInput) für Vorname und Nachname
export const personTemplate = `
  <h2></h2>
`

// TODO: Template einsetzen, ko.applyBindings nur auf root, Cleanup mit ko.cleanNode zurückgeben
export const mountPerson = (root: HTMLElement, vm: PersonViewModel): (() => void) => {
  void vm
  root.innerHTML = personTemplate
  return () => {}
}
