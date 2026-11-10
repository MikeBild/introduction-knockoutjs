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

// A product review as an attacker stores it: harmless HTML, but with a Knockout binding
const maliciousReview =
  '<p>Top Akkuschrauber!</p><span data-bind="text: (function(){ window.pwned = true })()"></span>'

// The server renders the review into the product page, then Knockout binds the whole area
const renderAndBind = (reviewHtml: string) => {
  const container = document.createElement('section')
  container.innerHTML = `<h2 data-bind="text: title"></h2><div class="review">${reviewHtml}</div>`
  document.body.append(container)
  ko.applyBindings({ title: 'Bewertungen' }, container)
  return container
}

describe('Binding Injection', () => {
  it('counter-check: without sanitizing, Knockout runs the injected binding', () => {
    renderAndBind(maliciousReview)
    expect(flags.pwned).toBe(true)
  })

  it('runs no injected binding after stripBindings', () => {
    const container = renderAndBind(stripBindings(maliciousReview))
    expect(flags.pwned).toBeUndefined()
    expect(container.querySelector('h2')?.textContent).toBe('Bewertungen')
    expect(container.querySelector('.review p')?.textContent).toBe('Top Akkuschrauber!')
  })

  it('removes virtual bindings in HTML comments', () => {
    const html = 'Fünf Sterne <!-- ko text: (function(){ window.pwned = true })() --><!-- /ko -->'
    renderAndBind(stripBindings(html))
    expect(flags.pwned).toBeUndefined()
  })

  it('removes params, event handler attributes and scripts, keeps harmless HTML', () => {
    const html =
      '<star-rating params="x: (function(){ return 1 })()"></star-rating>' +
      '<img src="werkbank.png" alt="Foto" onerror="alert(1)"><script>alert(1)</script><b>stabil</b>'
    const clean = stripBindings(html)
    expect(clean).toBe('<star-rating></star-rating><img src="werkbank.png" alt="Foto"><b>stabil</b>')
  })
})
