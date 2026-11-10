# View-Model Binding

* `npm install knockout`
* or `bower install knockout`
* Reference by `<script>` tag

`<script type="text/javascript" src="bower_components/knockout/dist/knockout.js"></script>`

## Binding View Models

```html
// HTML Binding
<span data-bind="text: personName"></span>

// View-Model
var myViewModel = {
  personName: 'Bob',
  personAge: 88,
};

// Apply
ko.applyBindings(myViewModel);
```

## Examples

* [JavaScript Library reference](examples/01-reference.html)
* [VM-Binding](examples/02-start.html)