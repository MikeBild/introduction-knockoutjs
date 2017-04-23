// MODEL
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

  
ko.applyBindings(viewModel);