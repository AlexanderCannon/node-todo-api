const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const dbUrl = process.env.MONGODB_URI

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

function saveNew(req, res, Model) {
  Model.save().then((doc) => {
    res.status(201).send(doc);
  }, (e) => res.status(400).send(e));
}

function getAll(req, res, Model) {
  Model.find().then((result) => {
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}

function findById(req, res, Model) {
  doFindByID(req.params.id, Model)
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

function removeById(req, res, Model) {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID ${req.params.id} appears to be invalid`);
  }
  Model.findByIdAndRemove(req.params.id).then((result) => {
    if (!result) {
      return res.status(404).send(`Could not find document with id ${req.params.id}`)
    }
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}

function updateById(req, res, Model) {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID ${req.params.id} appears to be invalid`);
  }
  Model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then((response) => {
    if (!response) {
      return res.status(404).send(`Could not find document with id ${req.params.id}`);
    }
    res.send({ response });
  }).catch((e) => res.status(400).send(e));
}

module.exports = {
  mongoose,
  saveNew,
  getAll,
  findById,
  removeById,
  updateById
};
