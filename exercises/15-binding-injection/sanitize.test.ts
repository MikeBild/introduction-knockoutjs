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

// Ein Kommentar, wie ihn ein Angreifer speichert: harmloses HTML, aber mit Knockout-Binding
const maliciousComment =
  '<p>Toller Artikel!</p><span data-bind="text: (function(){ window.pwned = true })()"></span>'

// Server rendert den Kommentar in die Seite, danach bindet Knockout den ganzen Bereich
const renderAndBind = (commentHtml: string) => {
  const container = document.createElement('section')
  container.innerHTML = `<h2 data-bind="text: title"></h2><div class="comment">${commentHtml}</div>`
  document.body.append(container)
  ko.applyBindings({ title: 'Kommentare' }, container)
  return container
}

describe('Binding Injection', () => {
  it('Gegenprobe: ohne Bereinigung führt Knockout das eingeschleuste Binding aus', () => {
    renderAndBind(maliciousComment)
    expect(flags.pwned).toBe(true)
  })

  it('führt nach stripBindings kein eingeschleustes Binding aus', () => {
    const container = renderAndBind(stripBindings(maliciousComment))
    expect(flags.pwned).toBeUndefined()
    expect(container.querySelector('h2')?.textContent).toBe('Kommentare')
    expect(container.querySelector('.comment p')?.textContent).toBe('Toller Artikel!')
  })

  it('entfernt virtuelle Bindings in Kommentaren', () => {
    const html = 'Hallo <!-- ko text: (function(){ window.pwned = true })() --><!-- /ko -->'
    renderAndBind(stripBindings(html))
    expect(flags.pwned).toBeUndefined()
  })

  it('entfernt params, Event-Handler-Attribute und Skripte, behält harmloses HTML', () => {
    const html =
      '<my-widget params="x: (function(){ return 1 })()"></my-widget>' +
      '<img src="a.png" alt="Bild" onerror="alert(1)"><script>alert(1)</script><b>fett</b>'
    const clean = stripBindings(html)
    expect(clean).toBe('<my-widget></my-widget><img src="a.png" alt="Bild"><b>fett</b>')
  })
})
