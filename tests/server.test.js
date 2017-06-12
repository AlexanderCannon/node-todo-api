const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

let { app } = require('./../server');
let { Todo } = require('./../src/models/todo');

const mockTodoId = "593e6104f5e8463308ebde5f";
const mockTodoNotFounddId = new ObjectID();
const mockTodoInvalidId = "593e6104f5e8463308ebde5fs";

const mockTodos = [{
  _id: ObjectID(mockTodoId),
  text: "test todo 1"
}, {
  text: "test todo 2"
}, {
  text: "test todo 3"
}];

mockTodoReturn = {
  __v: 0,
  _id: '593e6104f5e8463308ebde5f',
  completed: false,
  completedAt: null,
  text: 'test todo 1'
};

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(mockTodos);
  }).then(() => done());
});

describe('POST/todos', () => {
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
  it('should get all todos', (done) => {
    request(app)
      .get('/todo')
      .expect(200)
      .expect((res) => expect(res.body.todos.length).toBe(3))
      .end(done);
  });
});

describe('GET /todo', () => {
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