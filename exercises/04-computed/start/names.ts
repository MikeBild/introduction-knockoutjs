import ko from 'knockout'

// TODO: fullName als schreibbares ko.pureComputed({ read, write })
// read: „Vorname Nachname“ ohne Leerzeichen am Rand
// write: am letzten Leerzeichen teilen, ohne Leerzeichen alles in den Vornamen
export const createNameViewModel = (firstName = '', lastName = '') => {
  const first = ko.observable(firstName)
  const last = ko.observable(lastName)
  const fullName = ko.pureComputed<string>({
    read: () => first(),
    write: (value) => {
      void value
    },
  })
  return { firstName: first, lastName: last, fullName }
}
