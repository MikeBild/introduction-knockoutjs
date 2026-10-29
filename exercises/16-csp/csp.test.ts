import ko from 'knockout'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/csp.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/csp.ts`)
const { buildCsp, createHtmlPolicy } = impl

// Kleiner Allowlist-Sanitizer für den Test: nur b, i, em, strong, p – ohne Attribute
const allowed = new Set(['b', 'i', 'em', 'strong', 'p'])
const sanitizeBasic = (html: string) => {
  const template = document.createElement('template')
  template.innerHTML = html
  for (const element of [...template.content.querySelectorAll('*')]) {
    if (!allowed.has(element.localName)) element.remove()
    else for (const { name } of [...element.attributes]) element.removeAttribute(name)
  }
  return template.innerHTML
}

describe('buildCsp', () => {
  it('erlaubt Knockout 3.5 nur mit unsafe-eval', () => {
    expect(buildCsp({ allowEval: true })).toBe(
      "default-src 'self'; script-src 'self' 'unsafe-eval'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    )
  })

  it('verbietet eval ohne allowEval und ergänzt Trusted Types und Reporting', () => {
    expect(buildCsp({ allowEval: false, trustedTypes: true, reportTo: 'csp' })).toBe(
      "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; " +
        "require-trusted-types-for 'script'; report-to csp",
    )
  })
})

describe('createHtmlPolicy', () => {
  afterEach(() => {
    delete (globalThis as { trustedTypes?: unknown }).trustedTypes
  })

  it('zeigt im html-Binding nur bereinigtes HTML', () => {
    const policy = createHtmlPolicy(sanitizeBasic)
    document.body.innerHTML = '<div data-bind="html: body"></div>'
    const body = ko.observable(policy.createHTML('<b>fett</b><img src=x onerror="alert(1)">'))
    ko.applyBindings({ body }, document.body)
    const div = document.querySelector('div')
    expect(div?.querySelector('b')?.textContent).toBe('fett')
    expect(div?.querySelector('img')).toBeNull()
  })

  it('nutzt die Trusted-Types-API des Browsers, wenn es sie gibt', () => {
    const createPolicy = vi.fn((_name: string, rules: { createHTML: (html: string) => string }) => rules)
    ;(globalThis as { trustedTypes?: unknown }).trustedTypes = { createPolicy }
    const policy = createHtmlPolicy(sanitizeBasic)
    expect(createPolicy).toHaveBeenCalledWith('knockout-html', expect.anything())
    expect(policy.createHTML('<i>ok</i><script>x</script>')).toBe('<i>ok</i>')
  })
})
