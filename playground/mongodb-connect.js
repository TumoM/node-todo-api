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

  // db.collection("Todos").insertOne({
  //   text: "First Todo",
  //   completed: false
  // }, (err, result) => {
  //   if (err){return console.log("Collection not added", err);}
  //   console.log(JSON.stringify(result.ops, undefined, 3));
  // })

      // db.collection("Users").insertOne({
      //   name: "Jacky Boy",
      //   age: 22,
      //   location: "Botswana"
      // }, (err, result) => {
      //   if (err){return console.log("Cannot add", err);}
      //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
      // })

  client.close();
});
