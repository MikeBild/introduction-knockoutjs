// legacy/examples/Todos/js/app.js aus dem Material von 2015 (unverändert)
export const legacyTodosApp = `// MODEL
var Todo = function (text) {
    this.content = ko.observable(text);
    this.order = ko.observable();
    this.done = ko.observable(false);
}

// VIEWMODEL
var viewModel = {
    todos: ko.observableArray(),
    current: ko.observable(),
    add: function (data, event) {
        if (event.keyCode === 13) {
            var newTodo = new Todo(this.current());
            this.todos.push(newTodo);
            console.log(newTodo)
            this.current('');
        }
    },

    remove: function (event) {
        viewModel.todos.remove(this);
    },

    removeCompleted: function (event) {
        viewModel.todos.removeAll(viewModel.done());
    }
};

// DEPENDENT OBSERVABLES
viewModel.remaining = ko.dependentObservable(function () {
    return this.todos().filter(function (el) {
        return el.done() === false;
    });
}, viewModel),

viewModel.done = ko.dependentObservable(function () {
  return this.todos().filter(function (el) {
      return el.done() === true;
  });
}, viewModel),


ko.applyBindings(viewModel);`

export const legacyMarkup = `<script src="bower_components/knockout/dist/knockout.js"></script>
<script src="bower_components/knockout-mapping/knockout.mapping.js"></script>
<div data-bind="html: description"></div>
<button data-bind="click: function () { remove($data) }">Löschen</button>
<script type="text/x-jquery-tmpl" id="todo-template"><li>\${content}</li></script>
<script>var vm = ko.mapping.fromJS(data); ko.applyBindings(vm);</script>`

export const modernModule = `import ko from 'knockout'
const vm = { name: ko.observable('Ada') }
ko.applyBindings(vm, document.getElementById('app'))`
