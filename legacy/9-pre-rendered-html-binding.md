# Pre-rendered HTML to KO-View-Model Binding

* Maps pre-rendered HTML to KO View-Mdoel
* [Knockout pre-rendered binding handlers](https://github.com/ErikSchierboom/knockout-pre-rendered)

```html
<span data-bind="init, text: name">Michael Jordan</span>
function AppViewModel() {
  this.name = ko.observable();
}

ko.applyBindings(new AppViewModel());
```