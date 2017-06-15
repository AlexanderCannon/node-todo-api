const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/config.js');
const todo = require('./src/todo');
const user = require('./src/user');
const { authenticate } = require('./src/middlewear/authenticate');

const app = express();

app.use(bodyParser.json());

app.get('/todo', authenticate, (req, res) => todo.getAll(req, res));
app.get('/todo/:id', authenticate, (req, res) => todo.findById(req, res));
app.delete('/todo/:id', authenticate, (req, res) => todo.removeById(req, res));
app.put('/todo/:id', authenticate, (req, res) => todo.updateById(req, res));
app.post('/todo', authenticate, (req, res) => todo.saveNew(req, res));
app.patch('/todo/:id', authenticate, (req, res) => todo.updateById(req, res));

app.get('/user/me', authenticate, (req, res) => user.findByToken(req, res));
app.post('/user/login', (req, res) => user.logIn(req, res));
app.delete('/user/me/logout', authenticate, (req, res) => user.logOut(req, res));
app.post('/user', (req, res) => user.saveNew(req, res));

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };