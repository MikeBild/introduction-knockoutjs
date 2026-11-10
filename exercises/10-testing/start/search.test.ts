import { describe, it } from 'vitest'

// Write the tests from the README. Template for the structure:
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
// exercises/setup.ts takes care of cleanup after every test.

describe('Product search', () => {
  it.todo('shows all products as a list without a search term')
  it.todo('filters while typing regardless of upper and lower case')
  it.todo('shows a hint when no product matches')
  it.todo('updates with deferUpdates only after ko.tasks.runEarly()')
})
