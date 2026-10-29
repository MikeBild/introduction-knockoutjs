import { describe, expect, it } from 'vitest'
import { legacyMarkup, legacyTodosApp, modernModule } from './fixtures.ts'
import type * as Impl from './solution/audit.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/audit.ts`)
const { auditLegacy } = impl

const rulesOf = (source: string) => auditLegacy(source).map((finding) => finding.rule)

describe('auditLegacy', () => {
  it('findet ko.dependentObservable in der alten Todo-App mit Zeilennummer', () => {
    const findings = auditLegacy(legacyTodosApp).filter((f) => f.rule === 'dependent-observable')
    expect(findings).toEqual([
      { rule: 'dependent-observable', line: 31 },
      { rule: 'dependent-observable', line: 37 },
    ])
  })

  it('meldet das globale ko.applyBindings ohne ESM-Import', () => {
    expect(rulesOf(legacyTodosApp)).toContain('global-ko')
  })

  it('findet html-Binding, Inline-Function, jQuery-Template und Mapping-Plugin im Markup', () => {
    const rules = new Set(rulesOf(legacyMarkup))
    expect(rules).toEqual(
      new Set(['html-binding', 'inline-function', 'jquery-template', 'mapping-plugin', 'global-ko']),
    )
  })

  it('lässt ein modernes ESM-Modul ohne Befund', () => {
    expect(auditLegacy(modernModule)).toEqual([])
  })
})
