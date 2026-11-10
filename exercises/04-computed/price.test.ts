import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/price.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/price.ts`)
const { createPriceInput } = impl

describe('Writable pureComputed for prices', () => {
  it('shows cents as euro text with a decimal comma', () => {
    const price = createPriceInput(1290)
    expect(price.priceText()).toBe('12,90')
    price.priceCents(8990)
    expect(price.priceText()).toBe('89,90')
    expect(ko.isPureComputed(price.priceText)).toBe(true)
  })

  it('converts input with comma or period into whole cents', () => {
    const price = createPriceInput(0)
    price.priceText('12,90')
    expect(price.priceCents()).toBe(1290)
    price.priceText('0.1')
    expect(price.priceCents()).toBe(10)
    price.priceText('249')
    expect(price.priceCents()).toBe(24900)
  })

  it('ignores invalid input', () => {
    const price = createPriceInput(1290)
    price.priceText('zwölf')
    price.priceText('-3,00')
    price.priceText('1,999')
    expect(price.priceCents()).toBe(1290)
  })

  it('works as a two-way binding', async () => {
    document.body.innerHTML = `
      <label>Preis <input data-bind="value: priceText" /></label>
      <output data-bind="text: priceCents"></output>`
    const price = createPriceInput(1290)
    ko.applyBindings(price, document.body)
    const user = userEvent.setup()
    const input = screen.getByLabelText('Preis')
    await user.clear(input)
    await user.type(input, '9,99')
    await user.tab()
    expect(price.priceCents()).toBe(999)
    expect(screen.getByRole('status').textContent).toBe('999')
  })
})
