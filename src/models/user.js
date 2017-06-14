const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: [{
      validator: value => validator.isEmail(value),
      message: "{VALUE} doesn't appear to be a valid email"
    }],
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function (value) {
  var user = this
  userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString() }, 'secretsaucewithsalt').toString();
  var tokens = user.tokens;
  tokens.push({ access, token });
  user.tokens = tokens;
  return user.save().then(() => {
    return token
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = { User }