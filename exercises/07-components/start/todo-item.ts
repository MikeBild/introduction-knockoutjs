import ko from 'knockout'
import type { Todo } from '../todos.ts'

export type TodoItemParams = { todo: Todo; onRemove: (todo: Todo) => void }

// Achtung: Knockout ruft viewModel mit new auf – eine Arrow Function funktioniert hier nicht.
export class TodoItemViewModel {
  readonly todo: Todo
  readonly doneAt = ko.observable<Date | null>(null)
  private readonly onRemove: (todo: Todo) => void

  constructor(params: TodoItemParams) {
    this.todo = params.todo
    this.onRemove = params.onRemove
    // TODO: todo.done abonnieren und doneAt setzen (new Date() bei true, null bei false)
    //       Die Subscription in einem Feld merken.
  }

  // TODO: onRemove mit dem eigenen Todo aufrufen
  remove = () => {}

  // TODO: Subscription aufräumen
  dispose() {}
}

// TODO: Checkbox (checked: todo.done) mit Text, „erledigt“ nur bei doneAt,
//       Button mit click: remove und aria-label „Löschen: <Text>“
const template = `
  <span data-bind="text: todo.text"></span>
`

// TODO: Komponente 'todo-item' nur einmal registrieren (ko.components.isRegistered)
export const registerTodoItem = () => {
  void template
}
