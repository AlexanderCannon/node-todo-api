const { ObjectID } = require('mongodb');
const { validObjectId,  invalidObjectId } = require('./server-user')
const { Todo } = require('./../../src/models/todo');

const mockTodoId = "593e6104f5e8463308ebde5f";
const mockTodoNotFounddId = new ObjectID();
const mockTodoInvalidId = "593e6104f5e8463308ebde5fs";
const mockTrueObjectId = "593fb71ceca29b39f84b3270";
const mockPatch = { completed: true, text: 'updated test' }

const mockTodos = [{
  _id: ObjectID(mockTodoId),
  text: "test todo 1",
  _creator: ObjectID(validObjectId)
}, {
  _id: ObjectID(mockTrueObjectId),
  text: "test todo 2",
  completed: true,
  completedAt: 1000,
  _creator: ObjectID(validObjectId)
}, {
  text: "test todo 3",
  _creator: ObjectID(invalidObjectId)
}];

const mockTodoReturn = {
  __v: 0,
  _id: '593e6104f5e8463308ebde5f',
  completed: false,
  completedAt: null,
  text: 'test todo 1'
};

const mockTodoTrue = {
  __v: 0,
  _id: '593e6104f5e8463308ebde5f',
  completed: true,
  text: 'test todo 1'
};

const populateTodos = ((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(mockTodos);
  }).then(() => done());
});

module.exports = { mockTodoId, mockTodoNotFounddId, mockTodoInvalidId, mockTrueObjectId, mockPatch, mockTodos, populateTodos, mockTodoReturn, mockTodoTrue };
