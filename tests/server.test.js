const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../src/models/todo');
const { User } = require('./../src/models/user');
const {
  mockTodoId,
  mockTodoNotFounddId,
  mockTodoInvalidId, mockTrueObjectId,
  mockPatch,
  mockTodos,
  populateTodos,
  mockTodoReturn,
  mockTodoTrue
     } = require('./seed/server-todo');
const {
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
} = require('./seed/server-user.js');

describe('POST/todos', () => {
  beforeEach(populateTodos);
  it('should create a new todo', (done) => {
    let text = 'Todo test text';
    request(app)
      .post('/todo')
      .send({ text })
      .expect(201)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(4);
          expect(todos[3].text).toBe(text);
          done();
        })
          .catch((e) => done(e));
      })
  });

  it('should not create a todo with invaid body data', (done) => {
    request(app)
      .post('/todo')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        })
          .catch((e) => done(e));
      });
  });
});

describe('GET /todo', () => {
  beforeEach(populateTodos);
  it('should get all todos', (done) => {
    request(app)
      .get('/todo')
      .expect(200)
      .expect((res) => expect(res.body.length).toBe(3))
      .end(done);
  });
});

describe('GET /todo/:id', () => {
  beforeEach(populateTodos);
  it('should get a todo by ID', (done) => {
    request(app)
      .get(`/todo/${mockTodoId}`)
      .expect(200)
      .expect((res) => expect(res.body).toContain(mockTodoReturn))
      .end(done);
  });

  it('should get a 404 for a not found ID', (done) => {
    request(app)
      .get(`/todo/${mockTodoNotFounddId}`)
      .expect(404)
      .expect((res) => expect(res.body).toEqual({}))
      .end(done);
  });

  it('should return an error an invalid ID', (done) => {
    request(app)
      .get(`/todo/${mockTodoInvalidId}`)
      .expect(400)
      .expect((res) => expect(res.body).toEqual({}))
      .end(done);
  });
});

describe('PATCH /todo/:id', () => {
  beforeEach(populateTodos);
  it('should update the todo', (done) => {
    request(app)
      .patch(`/todo/${mockTodoId}`)
      .send(mockPatch)
      .expect(200)
      .expect((res) => {
        expect(res.body.response.completedAt).toNotBe(null);
        expect(res.body.response.completed).toBe(true);
        expect(res.body.response.text).toEqual(mockPatch.text);
      })
      .end(done);
  });
  it('should clear completed at when completed is turned false', (done) => {
    request(app)
      .patch(`/todo/${mockTrueObjectId}`)
      .send({ completed: false })
      .expect(200)
      .expect((res) => {
        expect(res.body.response.completedAt).toBe(null);
        expect(res.body.response.completed).toBe(false);
      })
      .end(done);
  });
});

describe('DEL /todo/:id', () => {
  beforeEach(populateTodos);
  it('should delete a todo by ID and integrate', (done) => {
    request(app)
      .delete(`/todo/${mockTodoId}`)
      .expect(200)
      .expect((res) => expect(res.body).toContain(mockTodoReturn))
      .end((err, res) => {
        request(app)
          .get(`/todo/${mockTodoId}`).expect(404)
          .expect((res) => expect(res.body).toEqual({}))
          .end(done)
      });
  });
  it('should delete a todo by ID', (done) => {
    mockTodoReturn.id = mockTrueObjectId;
    request(app)
      .delete(`/todo/${mockTrueObjectId}`)
      .expect(200)
      .expect((res) => expect(res.body).toContain(mockTodoReturn))
      .end((err, res) => {
        Todo.findById(mockTrueObjectId).then((res) => {
          expect((res) => expect(res.body).toEqual({}))
          done();
        });
      });
  });

  it('should get a 404 for a not found ID', (done) => {
    request(app)
      .delete(`/todo/${mockTodoNotFounddId}`)
      .expect(404)
      .expect((res) => expect(res.body).toEqual({}))
      .end(done);
  });

  it('should return an error an invalid ID', (done) => {
    request(app)
      .delete(`/todo/${mockTodoInvalidId}`)
      .expect(400)
      .expect((res) => expect(res.body).toEqual({}))
      .end(done);
  });
});

describe('GET /user/me', () => {
  before(populateUsers);
  it('should return user with authed request', (done) => {
    request(app)
      .get('/user/me')
      .set('x-auth', mockUsers[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(mockUsers[0]._id.toHexString())
        expect(res.body.email).toBe(mockUsers[0].email)
      })
      .end(done());
  });
  it('shouldn\'t return user with unauthed request', (done) => {
    request(app)
      .get('/user/me')
      .expect(401)
      .expect((res) => expect(res.body).toEqual({}))
      .end(done());
  });
});

describe('POST /user', () => {
  before(populateUsers)
  it('should create a user', (done => {
    request(app)
      .post('/user')
      .send(mockValidUser)
      .expect(201)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(mockUniqueEmail);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findOne({ email: mockUniqueEmail }).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(mockValidPassword);
          done();
        }).catch((e) => done(e))
      });
  }));
  it('should return validation error for too short password', (done) => {
    request(app)
      .post('/user')
      .send(mockInvalidPasswordUser)
      .expect(400)
      .end(done());
  });
  it('should return validation error for invalid email', (done) => {
    request(app)
      .post('/user')
      .send(mockInvalidEmailUser)
      .expect(400)
      .end(done());
  });
  it('should not create a user if email already in use', (done) => {
    request(app)
      .post('/user')
      .send(mockDuplicateEmailUser)
      .expect(400)
      .end(done());
  });
  it('should not create a user if they have no name', (done) => {
    request(app)
      .post('/user')
      .send(mockNoNameUser)
      .expect(400)
      .end(done());
  });
});
describe('POST /user/login', () => {
  before(populateUsers)
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: mockUsers[0].email,
        password: mockUsers[0].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });
  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: mockUsers[0].email,
        password: mockUsers[0].password + '1'
      })
      .expect(404)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(mockUsers[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
  it('should reject invalid user', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: mockUsers[0].email,
        password: mockUsers[0].password + '1'
      })
      .expect(404)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end(done()).catch((e) => done(e));
  });
});