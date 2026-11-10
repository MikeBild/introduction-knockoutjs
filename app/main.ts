import ko from 'knockout'
import { registerCartLine } from './cart-line.ts'
import { createShopViewModel } from './shop.ts'
import template from './shop.html?raw'
import './style.css'

// No global ko, no script tag: Knockout arrives as an ESM import via Vite
ko.options.deferUpdates = true
registerCartLine()

const root = document.querySelector<HTMLElement>('#app')
if (!root) throw new Error('#app fehlt in index.html. Ergänze dort <main id="app"></main>.')

root.innerHTML = template
ko.applyBindings(createShopViewModel(), root)
