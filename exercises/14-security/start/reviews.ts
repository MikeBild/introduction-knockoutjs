import ko from 'knockout'

// Product review in the workshop shop – body is user input
export type Review = { author: string; body: string }

// TODO: Close the gap – html: review.body renders user input as markup (Cross-Site Scripting).
//       Use the linkify binding instead.
export const reviewsTemplate = `
  <ul data-bind="foreach: { data: reviews, as: 'review' }">
    <li>
      <strong data-bind="text: review.author"></strong>
      <p data-bind="html: review.body"></p>
    </li>
  </ul>
`

// TODO: Split the text into text nodes and links. Links only for http: and https:,
//       with rel="noopener noreferrer". No innerHTML, no insertAdjacentHTML.
const linkify: ko.BindingHandler<ko.MaybeSubscribable<string>> = {
  update: (element: HTMLElement, valueAccessor) => {
    element.textContent = ko.unwrap(valueAccessor())
  },
}

export const registerLinkify = () => {
  ko.bindingHandlers['linkify'] = linkify
}
