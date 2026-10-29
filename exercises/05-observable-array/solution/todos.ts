import ko from 'knockout'

export type Todo = { text: ko.Observable<string>; done: ko.Observable<boolean> }

// Jeder Eintrag hat eigene Observables – das observableArray verfolgt nur die Liste
export const createTodo = (text: string): Todo => ({
  text: ko.observable(text),
  done: ko.observable(false),
})

export const createTodoList = (initial: string[] = []) => {
  const todos = ko.observableArray(initial.map(createTodo))
  const newText = ko.observable('')

  const add = () => {
    const text = newText().trim()
    if (!text) return
    todos.push(createTodo(text))
    newText('')
  }
  const remove = (todo: Todo) => {
    todos.remove(todo)
  }
  const removeCompleted = () => {
    todos.remove((todo) => todo.done())
  }
  const remaining = ko.pureComputed(() => todos().filter((todo) => !todo.done()).length)

  return { todos, newText, add, remove, removeCompleted, remaining }
}

export type TodoList = ReturnType<typeof createTodoList>
