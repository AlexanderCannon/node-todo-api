var mongoose = require('mongoose');

const dbUrl = "mongodb://localhost:27017/Todo"

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

function saveNew(req, res, model) {
  var model = new model({
    text: req.body.text
  });
  model.save().then((doc) => {
    res.status(201).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
}
function getAll(req, res, model) {
  model.find().then((todos) => {
    res.status(200).send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
}

module.exports = { mongoose, saveNew, getAll };