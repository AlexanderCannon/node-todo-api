const _ = require('lodash');
const { ObjectID } = require('mongodb');

const mongoose = require('./models/mongoose-helper');
let { Todo } = require('./models/todo');

function getAll(req, res) {
  Todo.find({ _creator: req.user.id }).then((result) => {
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}

function findById(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send();
  }
  Todo.findOne({
    _id: req.params.id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  }).catch((e) => {
    return res.status(404).send();
  });
}

function removeById(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID ${req.params.id} appears to be invalid`);
  }
  Todo.findOneAndRemove({
    _id: req.params.id,
    _creator: req.user._id
  }).then((result) => {
    if (!result) {
      return res.status(404).send(`Could not find document with id ${req.params.id}`)
    }
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}

function updateById(req, res) { mongoose.updateById(req, res, Todo) }

function saveNew(req, res) {
  todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  mongoose.saveNew(req, res, todo)
}

function updateById(req, res) {
  req.body = _.pick(req.body, ['text', 'completed']);
  if (req.body.completed) {
    req.body.completedAt = new Date().getTime();
  } else {
    req.body.completed = false;
    req.body.completedAt = null;
  }
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID ${req.params.id} appears to be invalid`);
  }
  Todo.findOneAndUpdate({
    _id: req.params.id,
    _creator: req.user._id
  },
    { $set: req.body },
    { new: true }
  ).then((response) => {
    if (!response) {
      return res.status(404).send(`Could not find document with id ${req.params.id}`);
    }
    res.send({ response });
  }).catch((e) => res.status(400).send(e));
};

module.exports = {
  getAll,
  findById,
  removeById,
  updateById,
  saveNew,
  updateById
}