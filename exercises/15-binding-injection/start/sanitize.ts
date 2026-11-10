// TODO: Parse the HTML via a <template> element (template.innerHTML = html)
// TODO: Walk over elements and comments in template.content with document.createTreeWalker
// TODO: Remove data-bind, params and all on* attributes from every element
// TODO: Remove script elements and comments that start with “ko ” or “/ko” (virtual bindings)
// TODO: Return template.innerHTML
export const stripBindings = (html: string): string => html
