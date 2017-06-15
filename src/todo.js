const _ = require('lodash');

const mongoose = require('./models/mongoose-helper');
let { Todo } = require('./models/todo');

function getAll(req, res) {
  Todo.find({ _creator: req.user.id }).then((result) => {
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}
function findById(req, res) { mongoose.findById(req, res, Todo) }
function removeById(req, res) { mongoose.removeById(req, res, Todo) }
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
  mongoose.updateById(req, res, Todo)
};

module.exports = {
  getAll,
  findById,
  removeById,
  updateById,
  saveNew,
  updateById
}