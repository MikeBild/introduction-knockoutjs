import ko from 'knockout'

export type Comment = { author: string; body: string }

// TODO: Die Lücke schließen – html: body rendert Nutzereingaben als Markup (Cross-Site Scripting).
//       Nimm stattdessen das linkify-Binding.
export const commentsTemplate = `
  <ul data-bind="foreach: comments">
    <li>
      <strong data-bind="text: author"></strong>
      <p data-bind="html: body"></p>
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
