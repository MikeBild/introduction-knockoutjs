import ko from 'knockout'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/element.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/element.ts`)
const { defineQuantityElement } = impl

beforeAll(() => defineQuantityElement())

// Testing Library does not search inside the Shadow DOM – we pass the container explicitly
const inside = (host: Element) => {
  const container = host.shadowRoot?.firstElementChild
  if (!(container instanceof HTMLElement)) throw new Error('kein gebundener Inhalt im Shadow Root')
  return within(container)
}
const shown = (host: Element) => inside(host).getByRole('status').textContent

describe('Knockout as a Custom Element', () => {
  it('renders with the initial value from the attribute', () => {
    const quantity = document.createElement('ko-quantity')
    quantity.setAttribute('start', '5')
    document.body.append(quantity)
    expect(shown(quantity)).toBe('5')
  })

  it('reports clicks to the outside as a quantity-change event and stays at 1 or more', async () => {
    const quantity = document.createElement('ko-quantity')
    const onChange = vi.fn()
    quantity.addEventListener('quantity-change', (event) => onChange((event as CustomEvent).detail))
    document.body.append(quantity)
    const user = userEvent.setup()
    await user.click(inside(quantity).getByRole('button', { name: 'Menge erhöhen' }))
    await user.click(inside(quantity).getByRole('button', { name: 'Menge verringern' }))
    await user.click(inside(quantity).getByRole('button', { name: 'Menge verringern' }))
    expect(onChange.mock.calls).toEqual([[2], [1], [1]])
    expect(shown(quantity)).toBe('1')
  })

  it('follows attribute changes', () => {
    const quantity = document.createElement('ko-quantity')
    document.body.append(quantity)
    quantity.setAttribute('start', '10')
    expect(shown(quantity)).toBe('10')
  })

  it('can be used from a Knockout page with attr and event bindings', async () => {
    document.body.innerHTML = `
      <ko-quantity data-bind="attr: { start: initial }, event: { 'quantity-change': onChange }"></ko-quantity>
      <p data-bind="text: 'Im Warenkorb: ' + chosen()"></p>`
    const chosen = ko.observable(0)
    const page = {
      initial: ko.observable(3),
      chosen,
      onChange: (_data: unknown, event: CustomEvent<number>) => chosen(event.detail),
    }
    ko.applyBindings(page, document.body)
    const quantity = document.querySelector('ko-quantity')
    if (!quantity) throw new Error('ko-quantity fehlt')
    expect(shown(quantity)).toBe('3')
    page.initial(7)
    await userEvent.setup().click(inside(quantity).getByRole('button', { name: 'Menge erhöhen' }))
    expect(document.querySelector('p')?.textContent).toBe('Im Warenkorb: 8')
  })

  it('cleans up bindings when the element is removed', () => {
    const quantity = document.createElement('ko-quantity')
    document.body.append(quantity)
    const container = quantity.shadowRoot?.firstElementChild
    if (!container) throw new Error('kein Inhalt')
    expect(ko.dataFor(container)).toBeDefined()
    quantity.remove()
    expect(ko.dataFor(container)).toBeUndefined()
    expect(quantity.shadowRoot?.childElementCount).toBe(0)
  })
})
