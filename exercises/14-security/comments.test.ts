import ko from 'knockout'
import { screen } from '@testing-library/dom'
import { beforeAll, describe, expect, it } from 'vitest'
import type * as Impl from './solution/comments.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/comments.ts`)
const { commentsTemplate, registerLinkify } = impl

beforeAll(() => registerLinkify())

const render = (...comments: Impl.Comment[]) => {
  document.body.innerHTML = commentsTemplate
  const vm = { comments: ko.observableArray(comments) }
  ko.applyBindings(vm, document.body)
  return vm
}

describe('Kommentare ohne Cross-Site Scripting', () => {
  it('zeigt Markup aus Nutzereingaben als Text', () => {
    render({ author: 'Mallory', body: '<img src=x onerror=alert(1)>' })
    expect(document.querySelector('img')).toBeNull()
    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeTruthy()
  })

  it('macht aus https-Adressen sichere Links', () => {
    render({ author: 'Ada', body: 'Siehe https://knockoutjs.com/documentation und danke' })
    const link = screen.getByRole<HTMLAnchorElement>('link')
    expect(link.href).toBe('https://knockoutjs.com/documentation')
    expect(link.rel).toBe('noopener noreferrer')
    expect(link.parentElement?.textContent).toBe('Siehe https://knockoutjs.com/documentation und danke')
  })

  it('macht aus javascript:-Adressen keinen Link', () => {
    render({ author: 'Mallory', body: 'Klick javascript:alert(document.cookie)' })
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('folgt Änderungen am Kommentar', () => {
    const vm = render({ author: 'Ada', body: 'erst Text' })
    vm.comments([{ author: 'Ada', body: 'dann <b>fett</b>?' }])
    expect(document.querySelector('b')).toBeNull()
    expect(screen.getByText('dann <b>fett</b>?')).toBeTruthy()
  })
})
