const mongoose = require('mongoose');
const { ObjectID } = require('mongodb')

const dbUrl = "mongodb://localhost:27017/Todo"

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

function saveNew(req, res, Model) {
  Model = new Model({
    text: req.body.text
  });
  Model.save().then((doc) => {
    res.status(201).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
}
function getAll(req, res, Model) {
  Model.find().then((todos) => {
    res.status(200).send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
}

function findById(req, res, Model) {
  const id = req.params.id;
  doFindByID(id, Model)
    .then((response) => res.status(response.status).send(response.message));
}

function doFindByID(id, Model) {
  return new Promise((resolve, reject) => {
    if (ObjectID.isValid(id)) {
      Model.findById(id).then((data) => {
        if (!data) {
          return resolve({ message: `ID not found ${id}`, status: 404 })
        }
        return resolve({ message: data, status: 200 })
      });
    } else {
      return resolve({ message: `Badly formatted ID: ${id}`, status: 400 });
    }
  });
}

module.exports = {
  mongoose,
  saveNew,
  getAll,
  findById
};