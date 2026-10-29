// Entfernt alles, was Knockout oder der Browser als Code ausführen würde, bevor HTML in einen gebundenen Bereich kommt
const isBindingAttribute = (name: string) =>
  name === 'data-bind' || name === 'params' || name.startsWith('on')

const isVirtualBinding = (comment: Comment) => /^\s*\/?ko(\s|$)/.test(comment.data)

export const stripBindings = (html: string): string => {
  // <template> parst das HTML, ohne Skripte auszuführen oder Bilder zu laden
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
