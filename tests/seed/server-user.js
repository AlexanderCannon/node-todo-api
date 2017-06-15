const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('./../../src/models/user');

const validObjectId = "5941847d5f095f026809dd0a";
const invalidObjectId = "594199a48a561d2fc8c63694";
const mockEmail = 'a.m.t.cannon@gmail.com';
const mockUniqueEmail = 'unique@example.com';
const mockinValidEmail = 'uniqueexample.com';
const mockValidPassword = '#thisPas4422swo3rdIsMe!ga102';
const mockInvalidPassword = 'pass';

const mockValidUser = { email: mockUniqueEmail, password: mockValidPassword, name: 'Jester' }
const mockInvalidPasswordUser = { email: mockUniqueEmail, password: mockInvalidPassword, name: 'Jester' }
const mockDuplicateEmailUser = { email: mockEmail, password: mockInvalidPassword, name: 'Jester' }
const mockInvalidEmailUser = { email: mockinValidEmail, password: mockInvalidPassword, name: 'Jester' }
const mockNoNameUser = { email: mockEmail, password: mockInvalidPassword }

const mockUsers = [{
  _id: new ObjectID(validObjectId),
  email: mockEmail,
  password: mockValidPassword,
  name: 'Alexander',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: validObjectId, access: 'auth' }, 'secretsaucewithsalt').toString()
  }]
}, {
  _id: new ObjectID(invalidObjectId),
  email: 'johnny@example.com',
  password: 'userT3oPassXoXo!',
  name: 'Johnny'
}];

const populateUsers = ((done) => {
  User.remove({}).then(() => {
    return User.insertMany(mockUsers);
  }).then(() => done());
});


module.exports = {
  validObjectId,
  mockUniqueEmail,
  mockInvalidPassword,
  mockValidUser,
  mockInvalidPasswordUser,
  mockDuplicateEmailUser,
  mockInvalidEmailUser,
  mockNoNameUser,
  mockUsers,
  mockValidPassword,
  populateUsers
};
