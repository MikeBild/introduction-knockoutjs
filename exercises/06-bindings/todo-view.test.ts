import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type * as Impl from './solution/todo-view.ts'
import { createTodoList } from './todos.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/todo-view.ts`)
const { mountTodos } = impl

const setup = (initial: string[] = []) => {
  const root = document.createElement('main')
  document.body.append(root)
  const vm = createTodoList(initial)
  mountTodos(root, vm)
  return { vm, user: userEvent.setup() }
}

describe('Eingebaute Bindings', () => {
  it('fügt per Formular einen Todo hinzu', async () => {
    const { vm, user } = setup()
    await user.type(screen.getByLabelText('Neue Aufgabe'), 'Milch kaufen')
    await user.click(screen.getByRole('button', { name: 'Hinzufügen' }))
    expect(screen.getByRole('checkbox', { name: 'Milch kaufen' })).toBeTruthy()
    expect(vm.newText()).toBe('')
  })

  it('zeigt offene Todos nur, wenn es welche gibt', async () => {
    const { user } = setup(['A', 'B'])
    expect(screen.getByText(/offen/).textContent).toBe('Noch 2 offen')
    await user.click(screen.getByRole('checkbox', { name: 'A' }))
    expect(screen.getByText(/offen/).textContent).toBe('Noch 1 offen')
    expect(screen.getByRole('checkbox', { name: 'A' }).closest('li')?.className).toContain('done')
  })

  it('löscht genau den angeklickten Todo', async () => {
    const { vm, user } = setup(['A', 'B'])
    await user.click(screen.getByRole('button', { name: 'Löschen: A' }))
    expect(vm.todos().map((todo) => todo.text())).toEqual(['B'])
    expect(screen.queryByRole('checkbox', { name: 'A' })).toBeNull()
  })

  it('aktiviert „Erledigte entfernen“ erst, wenn etwas erledigt ist', async () => {
    const { user } = setup(['A', 'B'])
    const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Erledigte entfernen' })
    expect(button.disabled).toBe(true)
    await user.click(screen.getByRole('checkbox', { name: 'B' }))
    expect(button.disabled).toBe(false)
    await user.click(button)
    expect(screen.queryByRole('checkbox', { name: 'B' })).toBeNull()
  })

  it('blendet den Zähler bei leerer Liste aus', () => {
    setup()
    expect(screen.queryByText(/offen/)).toBeNull()
  })
})
