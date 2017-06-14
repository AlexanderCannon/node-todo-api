const _ = require('lodash');
const jwt = require('jsonwebtoken');

const mongoose = require('./models/mongoose-helper');
const { User } = require('./models/user');

function getAll(req, res) { mongoose.getAll(req, res, User) }
function findById(req, res) { mongoose.findById(req, res, User) }
function removeById(req, res) { mongoose.removeById(req, res, User) }
function updateById(req, res) { mongoose.updateById(req, res, User) }

function saveNew(req, res) {
  let body = _.pick(req.body, ['email', 'password', 'name']);
  user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken()
  })
    .then((token) => {
      res.header('x-auth', token).status(201).send(user)
    })
    .catch((e) => res.status(400).send(e));
}

module.exports = {
  getAll,
  findById,
  removeById,
  updateById,
  saveNew,
  updateById
}