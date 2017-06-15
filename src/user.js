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
  userRecord = new User(body);

  userRecord.save().then(() => {
    return userRecord.generateAuthToken()
  })
    .then((token) => {
      res.header('x-auth', token).status(201).send(userRecord)
    })
    .catch((e) => res.status(400).send(e));
}

function findByToken(req, res) {
  res.send(req.user);
}
function logIn(req, res) {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then((userRecord) => {
      userRecord.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(userRecord)
      })
    }).catch((e) => {
      res.status(401).send(e)
    });
}

module.exports = {
  getAll,
  findById,
  removeById,
  updateById,
  saveNew,
  updateById,
  findByToken,
  logIn
}