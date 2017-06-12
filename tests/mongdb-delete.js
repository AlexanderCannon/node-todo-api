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

  // db.collection('Todos').deleteMany({text: "make me real"}).then((res) =>{
  //   console.log(res);
  // }, (err) => {
  //   console.log(err)
  // });

  // db.collection('Todos').deleteOne({text: "make me real"}).then((res) =>{
  //   console.log(res);
  // }, (err) => {
  //   console.log(err)
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) =>{
  //   console.log(res);
  // }, (err) => {
  //   console.log(err)
  // });

  // db.collection('Users').deleteMany({name: "Barry"}).then((res) =>{
  //   console.log(res);
  // }, (err) => {
  //   console.log(err)
  // });

  // db.collection('Users').findOneAndDelete({ _id: ObjectID("593a99d21efc58378c6fce92") }).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err)
  // });

});