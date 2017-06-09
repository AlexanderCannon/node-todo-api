// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const myIds = ['593a8b2c0c3ff536f89f1c18', '593a8b073ee5fb18d8c900a6']
const mockRecord = {
  text: "make me real",
  completed: false
}
const mockUser = {
  name: "Barry",
  age: 45,
  location: "London"
}

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Failed to connect to mongodb");
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find({ _id: new ObjectID(myIds[0]) }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log(err)
  });
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos: ${count}`)
  }, (err) => {
    console.log(err)
  });

  db.collection('Users').find({ name: "Barry" }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log(err)
  });
});