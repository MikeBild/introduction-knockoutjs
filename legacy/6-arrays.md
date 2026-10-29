# Arrays

* `observableArray`
* Tracks which objects are in the array, not the state of those objects
* Operations like "normal" arrays `pop, push, shift, unshift, reverse, sort, splice`
* Additional operations `remove, removeAll`
* extend with extender (e.g. notify, rateLimiter)

```html
<input type="text" data-bind="value: name" />
<button data-bind="click: add">Add</button>
<ul data-bind="foreach: todos">
  <li>
    <input type="checkbox" data-bind="checked: isDone" />
    <span data-bind="text: name"></span>
  </li>
</ul>

var AppViewModel = function(){
  this.name = ko.observable('');
  this.add = function(){
    this.todos.push({
      name: ko.observable(this.name()),
      isDone: ko.observable(false),
    })
  };
  this.todos = ko.observableArray([
    { name: ko.observable('clean up'),
    isDone: ko.observable(true)}
  ]);
};

ko.applyBindings(new AppViewModel());
```

## Examples

* [Observable Array](examples/06-arrays.html)