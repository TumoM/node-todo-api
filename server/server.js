const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var schema = new mongoose.Schema({
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var Todo = mongoose.model("Todo", schema)

var newTodo = new Todo({
  text: "Cook dinner"
});

newTodo.save().then((result) => {
  console.log("Saved Todo: \n" + result);
}, (err) => {
  console.log("Cannot Save: ",err);
});
