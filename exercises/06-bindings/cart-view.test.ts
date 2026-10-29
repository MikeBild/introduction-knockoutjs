import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/cart-view.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/cart-view.ts`)
const { createShopViewModel, mountShop } = impl

const setup = () => {
  const root = document.createElement('main')
  document.body.append(root)
  const vm = createShopViewModel()
  mountShop(root, vm)
  return { vm, user: userEvent.setup() }
}

/** Text des Elements, auf das aria-describedby zeigt – also der Grund für die Sperre */
const description = (button: HTMLElement) => {
  const id = button.getAttribute('aria-describedby')
  return id ? document.getElementById(id)?.textContent?.trim() : undefined
}

const sum = () => screen.getByText(/^Summe:/).textContent?.replace(/\s+/g, ' ')

describe('Werkstatt-Shop mit eingebauten Bindings', () => {
  it('zeigt Produkte mit Preis und sperrt ausverkaufte mit Hinweis', () => {
    setup()
    expect(screen.getByText(/^12,90\s€$/)).toBeTruthy()
    const werkbank = screen.getByRole<HTMLButtonElement>('button', { name: 'In den Warenkorb: Werkbank' })
    expect(werkbank.disabled).toBe(true)
    expect(description(werkbank)).toBe('Ausverkauft')
    expect(screen.getByRole('button', { name: 'In den Warenkorb: Schraubenset' }).hasAttribute('aria-describedby')).toBe(false)
    expect(screen.getByText('Dein Warenkorb ist leer. Leg oben ein Produkt hinein.')).toBeTruthy()
  })

  it('legt Produkte in den Warenkorb und rechnet die Summe', async () => {
    const { vm, user } = setup()
    await user.click(screen.getByRole('button', { name: 'In den Warenkorb: Schraubenset' }))
    await user.click(screen.getByRole('button', { name: 'In den Warenkorb: Schraubenset' }))
    await user.click(screen.getByRole('button', { name: 'In den Warenkorb: Akkuschrauber' }))
    expect(vm.cart.totalCents()).toBe(2 * 1290 + 8990)
    expect(sum()).toBe('Summe: 115,70 €')
    expect(screen.getByText('Dein Warenkorb ist leer. Leg oben ein Produkt hinein.').style.display).toBe('none')
  })

  it('übernimmt eine getippte Menge als Zahl und zählt danach weiter', async () => {
    const { vm, user } = setup()
    const add = screen.getByRole('button', { name: 'In den Warenkorb: Arbeitshandschuhe' })
    await user.click(add)
    const quantity = screen.getByLabelText('Menge')
    await user.clear(quantity)
    await user.type(quantity, '3')
    await user.tab()
    expect(vm.cart.items()[0]?.quantity()).toBe(3)
    await user.click(add)
    expect(vm.cart.items()[0]?.quantity()).toBe(4)
    expect(sum()).toBe('Summe: 31,60 €')
  })

  it('entfernt genau die angeklickte Position', async () => {
    const { vm, user } = setup()
    await user.click(screen.getByRole('button', { name: 'In den Warenkorb: Schraubenset' }))
    await user.click(screen.getByRole('button', { name: 'In den Warenkorb: Akkuschrauber' }))
    await user.click(screen.getByRole('button', { name: 'Entfernen: Schraubenset' }))
    expect(vm.cart.items().map((item) => item.product.name)).toEqual(['Akkuschrauber'])
  })

  it('aktiviert „Bestellen“ erst mit Warenkorb und E-Mail und nennt bis dahin den Grund', async () => {
    const { vm, user } = setup()
    const order = screen.getByRole<HTMLButtonElement>('button', { name: 'Bestellen' })
    expect(order.disabled).toBe(true)
    expect(description(order)).toBe('Leg zuerst ein Produkt in den Warenkorb.')
    await user.click(screen.getByRole('button', { name: 'In den Warenkorb: Schraubenset' }))
    expect(description(order)).toBe('Gib deine E-Mail-Adresse ein, dann kannst du bestellen.')
    await user.type(screen.getByLabelText('E-Mail'), 'ada@example.org')
    expect(order.disabled).toBe(false)
    expect(description(order)).toBe('')
    await user.click(order)
    expect(vm.placed()).toBe(true)
  })
})
