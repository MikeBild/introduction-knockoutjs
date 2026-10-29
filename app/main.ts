import ko from 'knockout'
import { registerTodoItem } from '../exercises/07-components/solution/todo-item.ts'
import { createTodoList } from '../exercises/07-components/todos.ts'
import './style.css'
import template from './todo-app.html?raw'

// Kein globales ko, kein Script-Tag: Knockout kommt als ESM-Import über Vite
ko.options.deferUpdates = true
registerTodoItem()

const root = document.querySelector<HTMLElement>('#app')
if (!root) throw new Error('#app fehlt in index.html')

root.innerHTML = template
ko.applyBindings(createTodoList(['Knockout auf 3.5.3 heben', 'Tests mit Vitest schreiben']), root)
