require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = (process.env.PORT || 3000);
console.log(`USING PORT: ${port} \n ------------ \n DEBUG`);

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    console.log("Note added successfully", doc);
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
    console.log("Error adding note", err);
  });
});

app.get('/todos' , authenticate, (req, res) => {
  Todo.find(
    {
      _creator: req.user._id
    }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)){
    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }, (err, query) => {
      if (err){return res.status(400).send();}
      else{
        if (!query){ return res.status(404).send();}
        else{res.send(query);}
      }
    });
  }else {
    return res.status(404).send();
  }
},(err) => {
  res.status(400).send(err);
  console.log("Could not fetch", err);
});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findOneAndDelete({
      _id: id,
      _creator: req.user._id
    }).then((query) => {
        if (!query){
          return res.status(404).send();
        }

        res.send(query);
    }).catch((e) => {
      res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return req.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._creator
  }, {$set: body}, {new: true}
  ).then((query) => {
    if(!query){
      return res.status(404).send();
    }

    res.send({todo: query});
}).catch((e) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    var tempToken = null;
    tempToken = user.generateAuthToken();
    return tempToken;
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  });

});

app.get("/users/me", authenticate,(req, res) => {
  res.send(req.user);
});

 app.post("/users/login", (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);

   User.findByCreds(body.email, body.password).then((user) => {
     user.generateAuthToken().then((token) => {
       res.header('x-auth', token).send(user);
     });
   }).catch((e) => {
     res.status(400).send();
   });
 });

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = {app};
