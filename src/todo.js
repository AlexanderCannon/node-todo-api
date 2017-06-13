const _ = require('lodash');

const mongoose = require('./models/mongoose-helper');
let { Todo } = require('./models/todo');

function getAll(req, res) { mongoose.getAll(req, res, Todo) }
function findById(req, res) { mongoose.findById(req, res, Todo) }
function removeById(req, res) { mongoose.removeById(req, res, Todo) }
function updateById(req, res) { mongoose.updateById(req, res, Todo) }
function saveNew(req, res) { mongoose.saveNew(req, res, Todo) }

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