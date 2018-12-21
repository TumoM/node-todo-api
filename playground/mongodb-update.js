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

  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID("5c1cf70edfa5052401d677b8")},
  //  {$set: {completed: true}}, {returnOriginal: false}
  // ).then((result) =>{
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // })

    db.collection('Users').findOneAndUpdate({name: "Tumo Jack Smith II"},
      {$set: {
        name: "Smith Tumo Word"
      }, $inc: {age:1}
    }, {returnOriginal: false}).then((result) => {
      console.log(result);
    })
  client.close();
});
