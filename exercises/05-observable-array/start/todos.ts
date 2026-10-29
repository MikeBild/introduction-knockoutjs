import ko from 'knockout'

export type Todo = { text: ko.Observable<string>; done: ko.Observable<boolean> }

// TODO: text und done als Observables, done startet mit false
export const createTodo = (text: string): Todo => ({
  text: ko.observable(text),
  done: ko.observable(false),
})

export const createTodoList = (initial: string[] = []) => {
  const todos = ko.observableArray(initial.map(createTodo))
  const newText = ko.observable('')

  // TODO: newText trimmen, leere Eingaben ignorieren, neuen Todo anhängen, newText leeren
  const add = () => {}
  // TODO: genau diesen Todo entfernen (todos.remove)
  const remove = (todo: Todo) => {
    void todo
  }
  // TODO: alle erledigten Todos entfernen (todos.remove mit Prädikat)
  const removeCompleted = () => {}
  // TODO: Anzahl der offenen Todos – hängt von der Liste UND von jedem done ab
  const remaining = ko.pureComputed(() => todos().length)

  return { todos, newText, add, remove, removeCompleted, remaining }
}

export type TodoList = ReturnType<typeof createTodoList>
