import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/customer.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/customer.ts`)
const { createCustomerViewModel, mountCustomer } = impl

const setup = () => {
  const root = document.createElement('section')
  document.body.append(root)
  const vm = createCustomerViewModel({ name: 'Ada', email: 'ada@example.org' })
  const unmount = mountCustomer(root, vm)
  return { root, vm, unmount }
}

describe('Kunde im MVVM', () => {
  it('berechnet die Überschrift im ViewModel ohne DOM', () => {
    const vm = createCustomerViewModel({ name: 'Grace', email: 'grace@example.org' })
    expect(vm.greeting()).toBe('Bestellung für Grace')
    vm.name('Grace Hopper')
    expect(vm.greeting()).toBe('Bestellung für Grace Hopper')
  })

  it('zeigt die Überschrift', () => {
    setup()
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Bestellung für Ada')
  })

  it('aktualisiert ViewModel und Überschrift bei jeder Eingabe', async () => {
    const { vm } = setup()
    const user = userEvent.setup()
    const name = screen.getByLabelText('Name')
    await user.clear(name)
    await user.type(name, 'Margaret')
    await user.clear(screen.getByLabelText('E-Mail'))
    await user.type(screen.getByLabelText('E-Mail'), 'margaret@example.org')
    expect(vm.name()).toBe('Margaret')
    expect(vm.email()).toBe('margaret@example.org')
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Bestellung für Margaret')
  })

  it('löst die Bindings beim Aufräumen', () => {
    const { root, vm, unmount } = setup()
    unmount()
    vm.name('Hedy')
    expect(root.querySelector('h2')?.textContent).toBe('Bestellung für Ada')
    expect(ko.dataFor(root)).toBeUndefined()
  })
})
