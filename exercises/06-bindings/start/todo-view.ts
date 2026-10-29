import ko from 'knockout'
import type { TodoList } from '../todos.ts'

// TODO: form mit submit: add, Label „Neue Aufgabe“ mit textInput: newText, Button „Hinzufügen“
// TODO: ul mit foreach: todos; je li css: { done: done }, Checkbox mit checked: done und Text,
//       Button mit click: $parent.remove und aria-label „Löschen: <Text>“ (attr-Binding)
// TODO: „Noch N offen“ nur zeigen, wenn es Todos gibt (if-Binding, gern als <!-- ko if -->)
// TODO: Button „Erledigte entfernen“ mit click: removeCompleted, nur aktiv, wenn etwas erledigt ist
export const todoTemplate = `
  <ul></ul>
`

export const mountTodos = (root: HTMLElement, vm: TodoList): (() => void) => {
  root.innerHTML = todoTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
