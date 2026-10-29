import ko from 'knockout'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/todos.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/todos.ts`)
const { createTodoList } = impl

describe('observableArray', () => {
  it('fügt getrimmten Text hinzu und leert die Eingabe', () => {
    const list = createTodoList()
    list.newText('  Milch kaufen ')
    list.add()
    expect(list.todos().map((todo) => todo.text())).toEqual(['Milch kaufen'])
    expect(list.newText()).toBe('')
  })

  it('ignoriert leere Eingaben', () => {
    const list = createTodoList()
    list.newText('   ')
    list.add()
    expect(list.todos()).toHaveLength(0)
  })

  it('zählt offene Todos neu, wenn sich ein Eintrag ändert', () => {
    const list = createTodoList(['A', 'B', 'C'])
    expect(list.remaining()).toBe(3)
    list.todos()[1]?.done(true)
    expect(list.remaining()).toBe(2)
  })

  it('entfernt einzelne und erledigte Todos', () => {
    const list = createTodoList(['A', 'B', 'C'])
    const [a, b] = list.todos()
    if (!a || !b) throw new Error('fehlende Todos')
    list.remove(a)
    b.done(true)
    list.removeCompleted()
    expect(list.todos().map((todo) => todo.text())).toEqual(['C'])
  })

  it('meldet Änderungen als arrayChange', () => {
    const list = createTodoList(['A'])
    const changes: ko.utils.ArrayChange[] = []
    const subscription = list.todos.subscribe(
      (batch: ko.utils.ArrayChange[]) => changes.push(...batch),
      null,
      'arrayChange',
    )
    list.newText('B')
    list.add()
    subscription.dispose()
    expect(changes.map((change) => change.status)).toEqual(['added'])
  })
})
