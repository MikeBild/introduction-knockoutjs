# Computed Observable

* Tracks and resolve dependencies between changes
* Automatically update when one or more other observable changes
* extend with extender (e.g. notify, rateLimiter)

```html
<input type="text" data-bind="value: firstName" />
<input type="text" data-bind="value: lastName" />
<span data-bind="text:fullName"></span>

var AppViewModel = function(){
  this.firstName = ko.observable('');
  this.lastName = ko.observable('');
  this.fullName = ko.computed(function () {
    return this.firstName() + ' ' + this.lastName();
  }, this);
};

ko.applyBindings(new AppViewModel());
```

## Extender

```javascript
myViewModel.fullName.extend({ notify: 'always' });
myViewModel.fullName.extend({ rateLimit: 50 });
```

## Examples

* [Computed Observable](examples/04-computed.html)