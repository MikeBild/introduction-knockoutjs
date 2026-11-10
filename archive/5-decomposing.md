# Decomposing

* normally observables are __read-only__
* writable observable are "powerful" __computed__ observables

## Use cases

* Selecting/deselecting all items
* Value converter
* Filtering and validating user input

```html
<input type="text" data-bind="value: firstName" />
<input type="text" data-bind="value: lastName" />
<input type="text" data-bind="value: fullName" />

var AppViewModel = function(){
  this.firstName = ko.observable('');
  this.lastName = ko.observable('');
  this.fullName = ko.computed({
    read: function(){
      return this.firstName() + ' ' + this.lastName();
    },
    write: function(value){
      var spacePosition = value.lastIndexOf(' '); if(spacePosition > 0){
      this.firstName(value.substring(0, spacePosition));
      this.lastName(value.substring(spacePosition+1)); }
    }, owner: this
  });
};
ko.applyBindings(new AppViewModel());
```

## Examples

* [Decomposing Observable](examples/05-decomposing.html)