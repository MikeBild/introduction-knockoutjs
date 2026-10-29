import ko from 'knockout'
import { afterEach, describe, expect, it } from 'vitest'
import type * as Impl from './solution/sanitize.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/sanitize.ts`)
const { stripBindings } = impl

type Flags = { pwned?: boolean }
const flags = window as unknown as Flags

afterEach(() => {
  delete flags.pwned
})

// Eine Produktbewertung, wie sie ein Angreifer speichert: harmloses HTML, aber mit Knockout-Binding
const maliciousReview =
  '<p>Top Akkuschrauber!</p><span data-bind="text: (function(){ window.pwned = true })()"></span>'

// Server rendert die Bewertung in die Produktseite, danach bindet Knockout den ganzen Bereich
const renderAndBind = (reviewHtml: string) => {
  const container = document.createElement('section')
  container.innerHTML = `<h2 data-bind="text: title"></h2><div class="review">${reviewHtml}</div>`
  document.body.append(container)
  ko.applyBindings({ title: 'Bewertungen' }, container)
  return container
}

describe('Binding Injection', () => {
  it('Gegenprobe: ohne Bereinigung führt Knockout das eingeschleuste Binding aus', () => {
    renderAndBind(maliciousReview)
    expect(flags.pwned).toBe(true)
  })

  it('führt nach stripBindings kein eingeschleustes Binding aus', () => {
    const container = renderAndBind(stripBindings(maliciousReview))
    expect(flags.pwned).toBeUndefined()
    expect(container.querySelector('h2')?.textContent).toBe('Bewertungen')
    expect(container.querySelector('.review p')?.textContent).toBe('Top Akkuschrauber!')
  })

  it('entfernt virtuelle Bindings in HTML-Kommentaren', () => {
    const html = 'Fünf Sterne <!-- ko text: (function(){ window.pwned = true })() --><!-- /ko -->'
    renderAndBind(stripBindings(html))
    expect(flags.pwned).toBeUndefined()
  })

  it('entfernt params, Event-Handler-Attribute und Skripte, behält harmloses HTML', () => {
    const html =
      '<star-rating params="x: (function(){ return 1 })()"></star-rating>' +
      '<img src="werkbank.png" alt="Foto" onerror="alert(1)"><script>alert(1)</script><b>stabil</b>'
    const clean = stripBindings(html)
    expect(clean).toBe('<star-rating></star-rating><img src="werkbank.png" alt="Foto"><b>stabil</b>')
  })
})
