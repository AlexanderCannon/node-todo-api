// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

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
  // db.collection('Todos').insertOne(mockRecord, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err)
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne(mockUser, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //   console.log(res.ops[0]._id.getTimestamp());
  // })
  db.close();
});