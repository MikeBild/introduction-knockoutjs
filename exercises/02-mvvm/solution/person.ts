import ko from 'knockout'

export type PersonViewModel = {
  firstName: ko.Observable<string>
  lastName: ko.Observable<string>
  greeting: ko.PureComputed<string>
}

// View Model: Zustand und abgeleitete Werte, kein DOM
export const createPersonViewModel = (person: {
  firstName: string
  lastName: string
}): PersonViewModel => {
  const firstName = ko.observable(person.firstName)
  const lastName = ko.observable(person.lastName)
  const greeting = ko.pureComputed(() => `Hallo ${firstName()} ${lastName()}`.trim())
  return { firstName, lastName, greeting }
}

// View: deklarative Bindings, keine Logik
export const personTemplate = `
  <h2 data-bind="text: greeting"></h2>
  <label>Vorname <input data-bind="textInput: firstName" /></label>
  <label>Nachname <input data-bind="textInput: lastName" /></label>
`

// Bindet genau einen Teilbaum und gibt das Aufräumen zurück
export const mountPerson = (root: HTMLElement, vm: PersonViewModel): (() => void) => {
  root.innerHTML = personTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
