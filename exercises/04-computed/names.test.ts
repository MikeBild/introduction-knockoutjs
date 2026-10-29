import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/names.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/names.ts`)
const { createNameViewModel } = impl

describe('Schreibbares pureComputed', () => {
  it('liest den vollen Namen', () => {
    const vm = createNameViewModel('Ada', 'Lovelace')
    expect(vm.fullName()).toBe('Ada Lovelace')
    expect(ko.isPureComputed(vm.fullName)).toBe(true)
  })

  it('teilt beim Schreiben am letzten Leerzeichen', () => {
    const vm = createNameViewModel()
    vm.fullName('Augusta Ada King')
    expect(vm.firstName()).toBe('Augusta Ada')
    expect(vm.lastName()).toBe('King')
  })

  it('schreibt einen Namen ohne Leerzeichen in den Vornamen', () => {
    const vm = createNameViewModel('Ada', 'Lovelace')
    vm.fullName('Grace')
    expect(vm.firstName()).toBe('Grace')
    expect(vm.lastName()).toBe('')
  })

  it('funktioniert als Zwei-Wege-Binding', async () => {
    document.body.innerHTML = `
      <label>Name <input data-bind="value: fullName" /></label>
      <output data-bind="text: lastName"></output>`
    const vm = createNameViewModel('Ada', 'Lovelace')
    ko.applyBindings(vm, document.body)
    const user = userEvent.setup()
    const input = screen.getByLabelText('Name')
    await user.clear(input)
    await user.type(input, 'Grace Hopper')
    await user.tab()
    expect(vm.lastName()).toBe('Hopper')
    expect(screen.getByRole('status').textContent).toBe('Hopper')
  })
})
