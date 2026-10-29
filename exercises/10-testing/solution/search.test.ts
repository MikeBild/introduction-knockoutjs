import ko from 'knockout'
import { screen, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { mountSearch } from '../search.ts'

const setup = (items = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton']) => {
  const root = document.createElement('div')
  document.body.append(root)
  return { vm: mountSearch(root, items), user: userEvent.setup() }
}

const names = () => within(screen.getByRole('list')).queryAllByRole('listitem').map((li) => li.textContent)

describe('Suche', () => {
  it('zeigt ohne Suchbegriff alle Einträge als Liste', () => {
    setup()
    expect(names()).toEqual(['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'])
  })

  it('filtert beim Tippen ohne Rücksicht auf Groß- und Kleinschreibung', async () => {
    const { user } = setup()
    await user.type(screen.getByLabelText('Suche'), 'HOP')
    expect(names()).toEqual(['Grace Hopper'])
  })

  it('zeigt „Keine Treffer“, wenn nichts passt', async () => {
    const { user } = setup()
    expect(screen.queryByText('Keine Treffer')).toBeNull()
    await user.type(screen.getByLabelText('Suche'), 'xyz')
    expect(names()).toEqual([])
    expect(screen.getByText('Keine Treffer')).toBeTruthy()
  })

  it('aktualisiert mit deferUpdates erst nach ko.tasks.runEarly()', () => {
    ko.options.deferUpdates = true
    const { vm } = setup()
    vm.query('ada')
    expect(names()).toHaveLength(3)
    ko.tasks.runEarly()
    expect(names()).toEqual(['Ada Lovelace'])
    // setup.ts setzt deferUpdates nach jedem Test wieder auf false
  })
})
