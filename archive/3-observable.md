# KO Observable

* Model properties as __observables__
* notify subscribers about changes
* automatically detect dependencies

## Binding Observable

```javascript
// KO-View-Model
var myViewModel = {
  personName: ko.observable('Bob'),
  personAge: ko.observable(88),
};
ko.applyBindings(myViewModel);

// read
var name = myViewModel.personName();

// write
myViewModel.personName('Mary');

//fluent
myViewModel.personName('Max').personAge(50);
```

## Examples

* [Basic Observable](examples/03-binding.html)