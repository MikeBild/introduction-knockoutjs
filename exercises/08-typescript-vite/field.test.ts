import type ko from 'knockout'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type * as Impl from './solution/field.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/field.ts`)
const { createField } = impl

const validEmail = (value: string) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Bitte eine gültige E-Mail')
const validQuantity = (value: number) =>
  Number.isInteger(value) && value >= 1 ? null : 'Mindestens 1 Stück'

describe('createField', () => {
  it('meldet einen Fehler für eine ungültige E-Mail', () => {
    const email = createField('', validEmail)
    expect(email.error()).toBe('Bitte eine gültige E-Mail')
    expect(email.isValid()).toBe(false)
    email.value('ada@example.org')
    expect(email.error()).toBeNull()
    expect(email.isValid()).toBe(true)
  })

  it('funktioniert mit jedem Type, etwa einer Menge', () => {
    const quantity = createField(0, validQuantity)
    expect(quantity.isValid()).toBe(false)
    quantity.value(3)
    expect(quantity.isValid()).toBe(true)
  })

  it('leitet die Types aus dem Validator ab', () => {
    const quantity = createField(1, validQuantity)
    expectTypeOf(quantity.value).toEqualTypeOf<ko.Observable<number>>()
    expectTypeOf(quantity.error).toEqualTypeOf<ko.PureComputed<string | null>>()
    expectTypeOf(quantity.isValid).toEqualTypeOf<ko.PureComputed<boolean>>()
    // @ts-expect-error – ein String passt nicht in ein Mengenfeld
    quantity.value('3')
  })
})
