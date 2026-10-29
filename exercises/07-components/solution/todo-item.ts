import ko from 'knockout'
import type { Todo } from '../todos.ts'

export type TodoItemParams = { todo: Todo; onRemove: (todo: Todo) => void }

// Klasse als viewModel: Knockout ruft new mit den params auf und später dispose
export class TodoItemViewModel {
  readonly todo: Todo
  readonly doneAt = ko.observable<Date | null>(null)
  private readonly onRemove: (todo: Todo) => void
  private readonly subscription: ko.Subscription

  constructor(params: TodoItemParams) {
    this.todo = params.todo
    this.onRemove = params.onRemove
    this.subscription = this.todo.done.subscribe((done) => this.doneAt(done ? new Date() : null))
  }

  remove = () => this.onRemove(this.todo)

  // Läuft, wenn Knockout das Element entfernt – sonst hält die Subscription die Komponente fest
  dispose() {
    this.subscription.dispose()
  }
}

const template = `
  <label>
    <input type="checkbox" data-bind="checked: todo.done" />
    <span data-bind="text: todo.text"></span>
  </label>
  <small data-bind="if: doneAt">erledigt</small>
  <button type="button" data-bind="click: remove, attr: { 'aria-label': 'Löschen: ' + todo.text() }">
    Löschen
  </button>
`

export const registerTodoItem = () => {
  if (ko.components.isRegistered('todo-item')) return
  ko.components.register('todo-item', { viewModel: TodoItemViewModel, template })
}
