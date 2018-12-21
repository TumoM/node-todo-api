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

  // db.collection('Todos').find({
  //     _id: new ObjectID("5c1cf0f5dfa5052401d676f4")
  //   }).toArray().then((docs) => {
  //   console.log("Todos:");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch records", err);
  // });
  // db.collection('Todos').find().count().then((count) => {
  //   console.log("Todos count: " + count);
  // }, (err) => {
  //   console.log("Unable to fetch records", err);
  // });

  db.collection('Users').find({name: "Jacky Boy"}).toArray().then((docs) => {
    console.log("Users: ");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch records", err);
  });

  client.close();
});
