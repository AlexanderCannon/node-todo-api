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

  // db.collection('Todos').findOneAndUpdate(
  //   { _id: new ObjectID('593ad3afe83b911c5ca09bd1') },
  //   { $set: { completed: true } },
  //   { returnOriginal: false }
  // ).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err)
  // });

  db.collection('Users').findOneAndUpdate(
    { _id: new ObjectID("593a8ab8222ace2b84f3c159") },
    { $set: { name: 'Bertie' }, $inc: { age: 1 } },
    { returnOriginal: false }
  ).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err)
  });

});