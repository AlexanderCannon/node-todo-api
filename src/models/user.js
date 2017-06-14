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
  var User = this
  userObject = User.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var User = this;
  var access = 'auth';
  var token = jwt.sign({ _id: User._id.toHexString() }, 'secretsaucewithsalt').toString();
  var tokens = User.tokens;
  tokens.push({ access, token });
  User.tokens = tokens;
  return User.save().then(() => {
    return token
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'secretsaucewithsalt');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var User = mongoose.model('User', UserSchema);

module.exports = { User }