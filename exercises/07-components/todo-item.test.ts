import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'
import type * as Impl from './solution/todo-item.ts'
import { createTodoList } from './todos.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/todo-item.ts`)
const { registerTodoItem } = impl

beforeAll(() => registerTodoItem())

const setup = (initial: string[]) => {
  const root = document.createElement('ul')
  root.setAttribute('data-bind', 'foreach: todos')
  root.innerHTML = '<li><todo-item params="todo: $data, onRemove: $parent.remove"></todo-item></li>'
  document.body.append(root)
  const vm = createTodoList(initial)
  ko.applyBindings(vm, root)
  return { root, vm, user: userEvent.setup() }
}

describe('Komponente todo-item', () => {
  it('rendert je Todo eine Checkbox – Komponenten laden asynchron', async () => {
    setup(['A', 'B'])
    expect(await screen.findByRole('checkbox', { name: 'A' })).toBeTruthy()
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })

  it('markiert erledigt und zeigt den Hinweis', async () => {
    const { vm, user } = setup(['A'])
    await user.click(await screen.findByRole('checkbox', { name: 'A' }))
    expect(vm.todos()[0]?.done()).toBe(true)
    expect(screen.getByText('erledigt')).toBeTruthy()
  })

  it('ruft onRemove mit dem eigenen Todo auf', async () => {
    const { vm, user } = setup(['A', 'B'])
    await user.click(await screen.findByRole('button', { name: 'Löschen: B' }))
    expect(vm.todos().map((todo) => todo.text())).toEqual(['A'])
  })

  it('räumt beim Entfernen alle Subscriptions auf (dispose)', async () => {
    const { root, vm } = setup(['A'])
    await screen.findByRole('checkbox', { name: 'A' })
    const todo = vm.todos()[0]
    if (!todo) throw new Error('fehlender Todo')
    expect(todo.done.getSubscriptionsCount()).toBeGreaterThan(0)
    ko.removeNode(root)
    expect(todo.done.getSubscriptionsCount()).toBe(0)
  })
})
