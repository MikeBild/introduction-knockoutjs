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

describe('Product search', () => {
  it('shows all products as a list without a search term', () => {
    setup()
    expect(names()).toEqual(['Schraubenset', 'Akkuschrauber', 'Werkbank', 'Arbeitshandschuhe'])
  })

  it('filters while typing regardless of upper and lower case', async () => {
    const { user } = setup()
    await user.type(screen.getByLabelText('Suche'), 'SCHRAUB')
    expect(names()).toEqual(['Schraubenset', 'Akkuschrauber'])
  })

  it('shows a hint when no product matches', async () => {
    const { user } = setup()
    expect(screen.queryByText(/^Kein Produkt passt/)).toBeNull()
    await user.type(screen.getByLabelText('Suche'), 'Hammer')
    expect(names()).toEqual([])
    expect(screen.getByText('Kein Produkt passt zu deiner Suche. Versuch einen anderen Begriff.')).toBeTruthy()
  })

  it('updates with deferUpdates only after ko.tasks.runEarly()', () => {
    ko.options.deferUpdates = true
    const { vm } = setup()
    vm.query('werk')
    expect(names()).toHaveLength(4)
    ko.tasks.runEarly()
    expect(names()).toEqual(['Werkbank'])
    // setup.ts resets deferUpdates to false after every test
  })
})
