import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/bindings.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/bindings.ts`)
const { registerBindings } = impl

beforeAll(() => registerBindings())

describe('Custom Bindings', () => {
  it('formatiert Beträge als Euro und folgt Änderungen', () => {
    document.body.innerHTML = '<output data-bind="currency: total"></output>'
    const total = ko.observable(1234.5)
    ko.applyBindings({ total }, document.body)
    const output = screen.getByRole('status')
    expect(output.textContent).toBe('1.234,50 €')
    total(9.99)
    expect(output.textContent).toBe('9,99 €')
  })

  it('akzeptiert auch einfache Zahlen', () => {
    document.body.innerHTML = '<output data-bind="currency: 5"></output>'
    ko.applyBindings({}, document.body)
    expect(screen.getByRole('status').textContent).toBe('5,00 €')
  })

  it('meldet nur Klicks außerhalb des Elements', async () => {
    document.body.innerHTML = `
      <div data-bind="clickOutside: close"><button>Innen</button></div>
      <button>Außen</button>`
    const close = vi.fn()
    ko.applyBindings({ close }, document.body)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Innen' }))
    expect(close).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Außen' }))
    expect(close).toHaveBeenCalledTimes(1)
  })

  it('entfernt den Listener, wenn Knockout das Element entfernt', async () => {
    document.body.innerHTML = `
      <section><div id="menu" data-bind="clickOutside: close">Menü</div></section>
      <button>Außen</button>`
    const close = vi.fn()
    const section = document.querySelector('section')
    if (!section) throw new Error('section fehlt')
    ko.applyBindings({ close }, section)
    const menu = document.getElementById('menu')
    if (!menu) throw new Error('menu fehlt')
    ko.removeNode(menu)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Außen' }))
    expect(close).not.toHaveBeenCalled()
  })
})
