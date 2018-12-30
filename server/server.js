const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body.text);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    console.log("Note added successfully", doc);
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
    console.log("Error adding note", err);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400);
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)){
    Todo.findById(id, (err, query) => {
      if (err){return res.status(400).send()}
      else{
        if (!query){ return res.status(404).send()}
        else(res.send(query))
      }
    })
  }else {
    return res.status(404).send();
  }
},(err) => {
  res.status(400).send(err)
  console.log("Could not fetch", err);
})

app.listen(3000, () => {
  console.log("Server Running on: 3000");
});

module.exports = {app}
