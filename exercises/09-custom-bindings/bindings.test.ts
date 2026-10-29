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
  it('formatiert Cent als Euro und folgt Änderungen', () => {
    document.body.innerHTML = '<output data-bind="currency: totalCents"></output>'
    const totalCents = ko.observable(123450)
    ko.applyBindings({ totalCents }, document.body)
    const output = screen.getByRole('status')
    expect(output.textContent).toBe('1.234,50 €')
    totalCents(999)
    expect(output.textContent).toBe('9,99 €')
  })

  it('akzeptiert auch feste Werte in Cent', () => {
    document.body.innerHTML = '<output data-bind="currency: 1290"></output>'
    ko.applyBindings({}, document.body)
    expect(screen.getByRole('status').textContent).toBe('12,90 €')
  })

  it('schließt den Mini-Warenkorb nur bei Klicks außerhalb', async () => {
    document.body.innerHTML = `
      <aside data-bind="visible: open, clickOutside: close">
        <p>Warenkorb</p><button>Zur Kasse</button>
      </aside>
      <button>Weiter einkaufen</button>`
    const open = ko.observable(true)
    const close = vi.fn(() => open(false))
    ko.applyBindings({ open, close }, document.body)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Zur Kasse' }))
    expect(close).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Weiter einkaufen' }))
    expect(close).toHaveBeenCalledTimes(1)
    expect(open()).toBe(false)
  })

  it('entfernt den Listener, wenn Knockout das Element entfernt', async () => {
    document.body.innerHTML = `
      <section><aside id="mini-cart" data-bind="clickOutside: close">Warenkorb</aside></section>
      <button>Weiter einkaufen</button>`
    const close = vi.fn()
    const section = document.querySelector('section')
    if (!section) throw new Error('section fehlt')
    ko.applyBindings({ close }, section)
    const miniCart = document.getElementById('mini-cart')
    if (!miniCart) throw new Error('mini-cart fehlt')
    ko.removeNode(miniCart)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Weiter einkaufen' }))
    expect(close).not.toHaveBeenCalled()
  })
})
