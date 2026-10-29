import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/person.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/person.ts`)
const { createPersonViewModel, mountPerson } = impl

const setup = () => {
  const root = document.createElement('section')
  document.body.append(root)
  const vm = createPersonViewModel({ firstName: 'Ada', lastName: 'Lovelace' })
  const unmount = mountPerson(root, vm)
  return { root, vm, unmount }
}

describe('Person MVVM', () => {
  it('berechnet die Begrüßung im View Model ohne DOM', () => {
    const vm = createPersonViewModel({ firstName: 'Grace', lastName: 'Hopper' })
    expect(vm.greeting()).toBe('Hallo Grace Hopper')
    vm.firstName('Admiral')
    expect(vm.greeting()).toBe('Hallo Admiral Hopper')
  })

  it('zeigt die Begrüßung als Überschrift', () => {
    setup()
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Hallo Ada Lovelace')
  })

  it('aktualisiert View Model und Überschrift bei jeder Eingabe', async () => {
    const { vm } = setup()
    const user = userEvent.setup()
    const input = screen.getByLabelText('Vorname')
    await user.clear(input)
    await user.type(input, 'Augusta')
    expect(vm.firstName()).toBe('Augusta')
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Hallo Augusta Lovelace')
  })

  it('löst die Bindings beim Aufräumen', () => {
    const { root, vm, unmount } = setup()
    unmount()
    vm.lastName('Byron')
    expect(root.querySelector('h2')?.textContent).toBe('Hallo Ada Lovelace')
    expect(ko.dataFor(root)).toBeUndefined()
  })
})
