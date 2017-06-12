const expect = require('expect');
const request = require('supertest');

let { app } = require('./../server');
let { Todo } = require('./../src/models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
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
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
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
          expect(todos.length).toBe(0);
          done();
        })
          .catch((e) => done(e));
      });
  });
});