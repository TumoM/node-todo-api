// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

var user = {name: "Tumo", age: 25};
var {name} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log("Unabble to connect to MongoDB server", err);
  }
  console.log("Success!!! Connected to MongoDB");
  const db = client.db("TodoApp")

  db.collection('Todos').deleteMany({text: "Eat Dinner"}).then((result) => {
    console.log(`----------------- \n deleteMany`);
    console.log(result.result);
  })

  db.collection("Todos").deleteOne({text: "Eat Lunch x2"}).then((result) => {
    console.log(`----------------- \n deleteOne`);
    console.log(result.result);
    console.log(`-----------------`);

  })

  db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
    console.log(`----------------- \n findOneAndDelete:`);
    console.log(result);
    console.log(`-----------------`);

  })
  client.close();
});
