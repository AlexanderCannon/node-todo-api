var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
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
    type: String
  }
});

module.exports = { User }