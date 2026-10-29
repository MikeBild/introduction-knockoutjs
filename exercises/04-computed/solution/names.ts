import ko from 'knockout'

// Schreibbares pureComputed: read leitet ab, write zerlegt die Eingabe wieder
export const createNameViewModel = (firstName = '', lastName = '') => {
  const first = ko.observable(firstName)
  const last = ko.observable(lastName)
  const fullName = ko.pureComputed<string>({
    read: () => `${first()} ${last()}`.trim(),
    write: (value) => {
      const trimmed = value.trim()
      const space = trimmed.lastIndexOf(' ')
      if (space > 0) {
        first(trimmed.slice(0, space))
        last(trimmed.slice(space + 1))
      } else {
        first(trimmed)
        last('')
      }
    },
  })
  return { firstName: first, lastName: last, fullName }
}
