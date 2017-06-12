var mongoose = require('mongoose');

const dbUrl = "mongodb://localhost:27017/Todo"

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

function saveNew(req, res, model) {
  var model = new model({
    text: req.body.text
  });
  model.save().then((doc) => {
    res.send(doc).status(200);
  }, (e) => {
    res.send(e).status(400);
  });
}

module.exports = { mongoose, saveNew };