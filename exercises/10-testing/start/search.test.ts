import { describe, it } from 'vitest'

// Schreib die Tests aus der README. Vorlage für den Aufbau:
//
//   const root = document.createElement('div')
//   document.body.append(root)
//   const vm = mountSearch(root, ['Ada', 'Grace', 'Margaret'])
//   const user = userEvent.setup()
//   await user.type(screen.getByLabelText('Suche'), 'gr')
//
// Aufräumen übernimmt exercises/setup.ts nach jedem Test.

describe('Suche', () => {
  it.todo('zeigt ohne Suchbegriff alle Einträge als Liste')
  it.todo('filtert beim Tippen ohne Rücksicht auf Groß- und Kleinschreibung')
  it.todo('zeigt „Keine Treffer“, wenn nichts passt')
  it.todo('aktualisiert mit deferUpdates erst nach ko.tasks.runEarly()')
})
