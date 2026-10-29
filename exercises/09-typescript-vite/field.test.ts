import type ko from 'knockout'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type * as Impl from './solution/field.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/field.ts`)
const { createField } = impl

const required = (value: string) => (value.trim() ? null : 'Pflichtfeld')
const adult = (value: number) => (value >= 18 ? null : 'Mindestens 18')

describe('createField', () => {
  it('meldet einen Fehler für leere Pflichtfelder', () => {
    const name = createField('', required)
    expect(name.error()).toBe('Pflichtfeld')
    expect(name.isValid()).toBe(false)
    name.value('Ada')
    expect(name.error()).toBeNull()
    expect(name.isValid()).toBe(true)
  })

  it('funktioniert mit jedem Type', () => {
    const age = createField(17, adult)
    expect(age.isValid()).toBe(false)
    age.value(42)
    expect(age.isValid()).toBe(true)
  })

  it('leitet die Types aus dem Startwert ab', () => {
    const age = createField(17, adult)
    expectTypeOf(age.value).toEqualTypeOf<ko.Observable<number>>()
    expectTypeOf(age.error).toEqualTypeOf<ko.PureComputed<string | null>>()
    expectTypeOf(age.isValid).toEqualTypeOf<ko.PureComputed<boolean>>()
    // @ts-expect-error – ein String passt nicht in ein Zahlenfeld
    age.value('42')
  })
})
