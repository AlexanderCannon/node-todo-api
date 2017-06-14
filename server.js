const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/config.js');
const todo = require('./src/todo');
const user = require('./src/user');
const { authenticate } = require('./src/middlewear/authenticate');

const app = express();

app.use(bodyParser.json());

app.get('/todo', (req, res) => { todo.getAll(req, res) });
app.get('/todo/:id', (req, res) => { todo.findById(req, res) });
app.delete('/todo/:id', (req, res) => { todo.removeById(req, res) });
app.put('/todo/:id', (req, res) => { todo.updateById(req, res) });
app.post('/todo', (req, res) => { todo.saveNew(req, res) });
app.patch('/todo/:id', (req, res) => { todo.updateById(req, res) });

app.get('/user', (req, res) => { user.getAll(req, res) });
app.get('/user/me', authenticate, (req, res) => { user.findByToken(req, res) });
app.get('/user/:id', (req, res) => { user.findById(req, res) });
app.delete('/user/:id', (req, res) => { user.removeById(req, res) });
app.put('/user/:id', (req, res) => { user.updateById(req, res) });
app.post('/user', (req, res) => { user.saveNew(req, res) });
app.patch('/user/:id', (req, res) => { user.updateById(req, res) });

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };