import ko from 'knockout'
import { registerCartLine } from './cart-line.ts'
import { createShopViewModel } from './shop.ts'
import template from './shop.html?raw'
import './style.css'

// Kein globales ko, kein Script-Tag: Knockout kommt als ESM-Import über Vite
ko.options.deferUpdates = true
registerCartLine()

const root = document.querySelector<HTMLElement>('#app')
if (!root) throw new Error('#app fehlt in index.html')

root.innerHTML = template
ko.applyBindings(createShopViewModel(), root)
