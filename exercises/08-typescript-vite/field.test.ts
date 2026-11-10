import type ko from 'knockout'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type * as Impl from './solution/field.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/field.ts`)
const { createField } = impl

const validEmail = (value: string) =>
  /^\S+@\S+\.\S+$/.test(value) ? null : 'Gib eine E-Mail-Adresse wie name@firma.de ein.'
const validQuantity = (value: number) =>
  Number.isInteger(value) && value >= 1 ? null : 'Gib eine ganze Menge ab 1 ein.'

describe('createField', () => {
  it('reports an error for an invalid email', () => {
    const email = createField('', validEmail)
    expect(email.error()).toBe('Gib eine E-Mail-Adresse wie name@firma.de ein.')
    expect(email.isValid()).toBe(false)
    email.value('ada@example.org')
    expect(email.error()).toBeNull()
    expect(email.isValid()).toBe(true)
  })

  it('works with any type, such as a quantity', () => {
    const quantity = createField(0, validQuantity)
    expect(quantity.isValid()).toBe(false)
    quantity.value(3)
    expect(quantity.isValid()).toBe(true)
  })

  it('derives the types from the validator', () => {
    const quantity = createField(1, validQuantity)
    expectTypeOf(quantity.value).toEqualTypeOf<ko.Observable<number>>()
    expectTypeOf(quantity.error).toEqualTypeOf<ko.PureComputed<string | null>>()
    expectTypeOf(quantity.isValid).toEqualTypeOf<ko.PureComputed<boolean>>()
    // @ts-expect-error – a string does not fit into a quantity field
    quantity.value('3')
  })
})
