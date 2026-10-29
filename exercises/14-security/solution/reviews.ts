import ko from 'knockout'

// Produktbewertung im Werkstatt-Shop – body ist Nutzereingabe
export type Review = { author: string; body: string }

// Nutzereingaben nie mit html binden: text escaped, linkify baut DOM-Knoten selbst
export const reviewsTemplate = `
  <ul data-bind="foreach: { data: reviews, as: 'review' }">
    <li>
      <strong data-bind="text: review.author"></strong>
      <p data-bind="linkify: review.body"></p>
    </li>
  </ul>
`

const urlPattern = /(https?:\/\/[^\s<>"']+)/g

const isSafeUrl = (candidate: string) => {
  try {
    const url = new URL(candidate)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

// Textknoten plus Links nur für http und https – nie innerHTML
const linkify: ko.BindingHandler<ko.MaybeSubscribable<string>> = {
  update: (element: HTMLElement, valueAccessor) => {
    const text = ko.unwrap(valueAccessor())
    const nodes = text.split(urlPattern).map((part, index) => {
      if (index % 2 === 0 || !isSafeUrl(part)) return document.createTextNode(part)
      const link = document.createElement('a')
      link.href = part
      link.textContent = part
      link.rel = 'noopener noreferrer'
      return link
    })
    element.replaceChildren(...nodes)
  },
}

export const registerLinkify = () => {
  ko.bindingHandlers['linkify'] = linkify
}
