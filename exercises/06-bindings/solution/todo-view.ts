import ko from 'knockout'
import type { TodoList } from '../todos.ts'

// Nur eingebaute Bindings, kein eigener DOM-Code
export const todoTemplate = `
  <form data-bind="submit: add">
    <label>Neue Aufgabe <input data-bind="textInput: newText" /></label>
    <button type="submit">Hinzufügen</button>
  </form>
  <ul data-bind="foreach: todos">
    <li data-bind="css: { done: done }">
      <label>
        <input type="checkbox" data-bind="checked: done" />
        <span data-bind="text: text"></span>
      </label>
      <button type="button" data-bind="click: $parent.remove, attr: { 'aria-label': 'Löschen: ' + text() }">
        Löschen
      </button>
    </li>
  </ul>
  <!-- ko if: todos().length > 0 -->
  <p>Noch <span data-bind="text: remaining"></span> offen</p>
  <!-- /ko -->
  <button type="button" data-bind="click: removeCompleted, enable: remaining() < todos().length">
    Erledigte entfernen
  </button>
`

export const mountTodos = (root: HTMLElement, vm: TodoList): (() => void) => {
  root.innerHTML = todoTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
