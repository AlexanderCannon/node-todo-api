const { ObjectID } = require('mongodb');

const { mongoose } = require('./../../src/models/mongoose');
const { Todo } = require('./../../src/models/todo');
const { User } = require('./../../src/models/user');

const mockTodoId = "593e6104f5e8463308ebde5f";
const mockTodoNotFounddId = "493e6104f5e8463308ebde5f";
const mockTodoInvalidId = "593e6104f5e8463308ebde5fs";

const mockUserId = '593c571a290c622fbc1e4f7e';
const mockNotFoundUserId = '493c571a290c622fbc1e4f7e';
const mockInvalidUserId = '493c571a290c622fbc1e4f7es';

function findById(id, Model) {
  if (ObjectID.isValid(id)) {
    Model.findById(id).then((res) => {
      if (!res) {
        return console.log('object not found for ', id);
      }
      console.log("Find by ID", res);
    }).catch((e) => console.log(e));
  } else {
    console.log('Invalid ID');
  }
}

findById(mockUserId, User);
findById(mockNotFoundUserId, User);
findById(mockInvalidUserId, User);

findById(mockTodoId, Todo);
findById(mockTodoNotFounddId, Todo);
findById(mockTodoInvalidId, Todo);