// Removes everything that Knockout or the browser would run as code before HTML enters a bound area
const isBindingAttribute = (name: string) =>
  name === 'data-bind' || name === 'params' || name.startsWith('on')

const isVirtualBinding = (comment: Comment) => /^\s*\/?ko(\s|$)/.test(comment.data)

export const stripBindings = (html: string): string => {
  // <template> parses the HTML without running scripts or loading images
  const template = document.createElement('template')
  template.innerHTML = html

  const walker = document.createTreeWalker(
    template.content,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
  )
  const toRemove: Node[] = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node instanceof Comment) {
      if (isVirtualBinding(node)) toRemove.push(node)
    } else if (node instanceof Element) {
      if (node.localName === 'script') toRemove.push(node)
      for (const { name } of [...node.attributes]) {
        if (isBindingAttribute(name.toLowerCase())) node.removeAttribute(name)
      }
    }
  }
  for (const node of toRemove) node.parentNode?.removeChild(node)
  return template.innerHTML
}
