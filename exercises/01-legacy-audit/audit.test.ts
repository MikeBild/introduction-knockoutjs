import { describe, expect, it } from 'vitest'
import { legacyMarkup, legacyTodosApp, modernModule } from './fixtures.ts'
import type * as Impl from './solution/audit.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/audit.ts`)
const { auditLegacy } = impl

const rulesOf = (source: string) => auditLegacy(source).map((finding) => finding.rule)

describe('auditLegacy', () => {
  it('finds ko.dependentObservable in the old Todo app with line number', () => {
    const findings = auditLegacy(legacyTodosApp).filter((f) => f.rule === 'dependent-observable')
    expect(findings).toEqual([
      { rule: 'dependent-observable', line: 31 },
      { rule: 'dependent-observable', line: 37 },
    ])
  })

  it('reports the global ko.applyBindings without ESM import', () => {
    expect(rulesOf(legacyTodosApp)).toContain('global-ko')
  })

  it('finds html binding, inline function, jQuery template and mapping plugin in the markup', () => {
    const rules = new Set(rulesOf(legacyMarkup))
    expect(rules).toEqual(
      new Set(['html-binding', 'inline-function', 'jquery-template', 'mapping-plugin', 'global-ko']),
    )
  })

  it('leaves a modern ESM module without findings', () => {
    expect(auditLegacy(modernModule)).toEqual([])
  })
})
