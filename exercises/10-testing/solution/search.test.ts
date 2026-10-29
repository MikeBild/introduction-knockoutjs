import ko from 'knockout'
import { screen, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { products } from '../../shop.ts'
import { mountSearch } from '../search.ts'

const setup = () => {
  const root = document.createElement('div')
  document.body.append(root)
  return { vm: mountSearch(root, products), user: userEvent.setup() }
}

const names = () =>
  within(screen.getByRole('list'))
    .queryAllByRole('listitem')
    .map((li) => li.textContent)

describe('Produktsuche', () => {
  it('zeigt ohne Suchbegriff alle Produkte als Liste', () => {
    setup()
    expect(names()).toEqual(['Schraubenset', 'Akkuschrauber', 'Werkbank', 'Arbeitshandschuhe'])
  })

  it('filtert beim Tippen ohne Rücksicht auf Groß- und Kleinschreibung', async () => {
    const { user } = setup()
    await user.type(screen.getByLabelText('Suche'), 'SCHRAUB')
    expect(names()).toEqual(['Schraubenset', 'Akkuschrauber'])
  })

  it('zeigt „Keine Treffer“, wenn nichts passt', async () => {
    const { user } = setup()
    expect(screen.queryByText('Keine Treffer')).toBeNull()
    await user.type(screen.getByLabelText('Suche'), 'Hammer')
    expect(names()).toEqual([])
    expect(screen.getByText('Keine Treffer')).toBeTruthy()
  })

  it('aktualisiert mit deferUpdates erst nach ko.tasks.runEarly()', () => {
    ko.options.deferUpdates = true
    const { vm } = setup()
    vm.query('werk')
    expect(names()).toHaveLength(4)
    ko.tasks.runEarly()
    expect(names()).toEqual(['Werkbank'])
    // setup.ts setzt deferUpdates nach jedem Test wieder auf false
  })
})
