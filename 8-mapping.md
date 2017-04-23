# Mapping Plugin

## Setup

* `https://github.com/SteveSanderson/knockout.mapping/tree/master/build/output`


```html
<script type="text/javascript" src="bower_components/knockout-mapping/knockout.mapping.js"></script>

<span data-bind="text: name"></span>
<ul data-bind="foreach: children">
  <li data-bind="text: name"></li>
</ul>


var data = {
  name: 'Scott',
  children: [
    { id : 1, name : 'Alice' }
  ],
};
var data = ko.mapping.toJSON(data);
var AppViewModel = ko.mapping.fromJSON(data);
ko.applyBindings(AppViewModel);
```

## Examples

* [Mapping](examples/10-mapping.html)
* [Mapping](examples/11-mapping.html)
* [Mapping](examples/12-mapping.html)