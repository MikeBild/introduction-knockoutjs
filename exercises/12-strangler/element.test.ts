import ko from 'knockout'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/element.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/element.ts`)
const { defineCounterElement } = impl

beforeAll(() => defineCounterElement())

// Testing Library sucht nicht im Shadow DOM – wir geben den Container ausdrücklich an
const inside = (host: Element) => {
  const container = host.shadowRoot?.firstElementChild
  if (!(container instanceof HTMLElement)) throw new Error('kein gebundener Inhalt im Shadow Root')
  return within(container)
}

describe('Knockout als Custom Element', () => {
  it('rendert mit dem Startwert aus dem Attribut', () => {
    const counter = document.createElement('ko-counter')
    counter.setAttribute('start', '5')
    document.body.append(counter)
    expect(inside(counter).getByRole('button').textContent).toBe('Zähler: 5')
  })

  it('meldet Klicks als count-change-Event nach außen', async () => {
    const counter = document.createElement('ko-counter')
    const onChange = vi.fn()
    counter.addEventListener('count-change', (event) => onChange((event as CustomEvent).detail))
    document.body.append(counter)
    await userEvent.setup().click(inside(counter).getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('folgt Attributänderungen', () => {
    const counter = document.createElement('ko-counter')
    document.body.append(counter)
    counter.setAttribute('start', '10')
    expect(inside(counter).getByRole('button').textContent).toBe('Zähler: 10')
  })

  it('lässt sich aus einer Knockout-Seite mit attr- und event-Binding nutzen', async () => {
    document.body.innerHTML = `
      <ko-counter data-bind="attr: { start: initial }, event: { 'count-change': onChange }"></ko-counter>
      <p data-bind="text: 'Zuletzt: ' + last()"></p>`
    const last = ko.observable(0)
    const page = {
      initial: ko.observable(3),
      last,
      onChange: (_data: unknown, event: CustomEvent<number>) => last(event.detail),
    }
    ko.applyBindings(page, document.body)
    const counter = document.querySelector('ko-counter')
    if (!counter) throw new Error('ko-counter fehlt')
    expect(inside(counter).getByRole('button').textContent).toBe('Zähler: 3')
    page.initial(7)
    await userEvent.setup().click(inside(counter).getByRole('button'))
    expect(document.querySelector('p')?.textContent).toBe('Zuletzt: 8')
  })

  it('räumt Bindings auf, wenn das Element entfernt wird', () => {
    const counter = document.createElement('ko-counter')
    document.body.append(counter)
    const container = counter.shadowRoot?.firstElementChild
    if (!container) throw new Error('kein Inhalt')
    expect(ko.dataFor(container)).toBeDefined()
    counter.remove()
    expect(ko.dataFor(container)).toBeUndefined()
    expect(counter.shadowRoot?.childElementCount).toBe(0)
  })
})
