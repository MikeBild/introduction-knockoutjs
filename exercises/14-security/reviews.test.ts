import ko from 'knockout'
import { screen } from '@testing-library/dom'
import { beforeAll, describe, expect, it } from 'vitest'
import type * as Impl from './solution/reviews.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/reviews.ts`)
const { reviewsTemplate, registerLinkify } = impl

beforeAll(() => registerLinkify())

const render = (...reviews: Impl.Review[]) => {
  document.body.innerHTML = reviewsTemplate
  const vm = { reviews: ko.observableArray(reviews) }
  ko.applyBindings(vm, document.body)
  return vm
}

describe('Product reviews without Cross-Site Scripting', () => {
  it('shows markup from reviews as text', () => {
    render({ author: 'Mallory', body: '<img src=x onerror=alert(1)>' })
    expect(document.querySelector('img')).toBeNull()
    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeTruthy()
  })

  it('turns https addresses into safe links', () => {
    render({ author: 'Ada', body: 'Passt zur Anleitung auf https://example.org/werkbank – top' })
    const link = screen.getByRole<HTMLAnchorElement>('link')
    expect(link.href).toBe('https://example.org/werkbank')
    expect(link.rel).toBe('noopener noreferrer')
    expect(link.parentElement?.textContent).toBe(
      'Passt zur Anleitung auf https://example.org/werkbank – top',
    )
  })

  it('does not turn javascript: addresses into a link', () => {
    render({ author: 'Mallory', body: 'Gutschein: javascript:alert(document.cookie)' })
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('follows changes to the reviews', () => {
    const vm = render({ author: 'Ada', body: 'Solides Schraubenset' })
    vm.reviews([{ author: 'Ada', body: 'Jetzt <b>fünf</b> Sterne?' }])
    expect(document.querySelector('b')).toBeNull()
    expect(screen.getByText('Jetzt <b>fünf</b> Sterne?')).toBeTruthy()
  })
})
