import { describe, it } from 'vitest'

// Schreib die Tests aus der README. Vorlage für den Aufbau:
//
//   import { products } from '../../shop.ts'
//   import { mountSearch } from '../search.ts'
//
//   const root = document.createElement('div')
//   document.body.append(root)
//   const vm = mountSearch(root, products)
//   const user = userEvent.setup()
//   await user.type(screen.getByLabelText('Suche'), 'schraub')
//
// Aufräumen übernimmt exercises/setup.ts nach jedem Test.

describe('Produktsuche', () => {
  it.todo('zeigt ohne Suchbegriff alle Produkte als Liste')
  it.todo('filtert beim Tippen ohne Rücksicht auf Groß- und Kleinschreibung')
  it.todo('zeigt „Keine Treffer“, wenn nichts passt')
  it.todo('aktualisiert mit deferUpdates erst nach ko.tasks.runEarly()')
})
