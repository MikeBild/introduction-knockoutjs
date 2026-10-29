import ko from 'knockout'

// Produktbewertung im Werkstatt-Shop – body ist Nutzereingabe
export type Review = { author: string; body: string }

// TODO: Die Lücke schließen – html: review.body rendert Nutzereingaben als Markup (Cross-Site Scripting).
//       Nimm stattdessen das linkify-Binding.
export const reviewsTemplate = `
  <ul data-bind="foreach: { data: reviews, as: 'review' }">
    <li>
      <strong data-bind="text: review.author"></strong>
      <p data-bind="html: review.body"></p>
    </li>
  </ul>
`

// TODO: Text in Textknoten und Links zerlegen. Links nur für http: und https:,
//       mit rel="noopener noreferrer". Kein innerHTML, kein insertAdjacentHTML.
const linkify: ko.BindingHandler<ko.MaybeSubscribable<string>> = {
  update: (element: HTMLElement, valueAccessor) => {
    element.textContent = ko.unwrap(valueAccessor())
  },
}

export const registerLinkify = () => {
  ko.bindingHandlers['linkify'] = linkify
}
