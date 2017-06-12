const expect = require('expect');
const request = require('supertest');

let { app } = require('./../server');
let { Todo } = require('./../src/models/todo');

const mockTodos = [{
  text: "test todo 1"
}, {
  text: "test todo 2"
}, {
  text: "test todo 3"
}]

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

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todo')
      .expect(200)
      .expect((res) => expect(res.body.todos.length).toBe(3))
      .end(done);
  });
});