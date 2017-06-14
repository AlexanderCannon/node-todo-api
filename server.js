const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/config.js')
let todo = require('./src/todo');
let { User } = require('./src/models/user');

const app = express();

app.use(bodyParser.json());

app.get('/todo', (req, res) => { todo.getAll(req, res) });
app.get('/todo/:id', (req, res) => { todo.findById(req, res) });
app.delete('/todo/:id', (req, res) => { todo.removeById(req, res) });
app.put('/todo/:id', (req, res) => { todo.updateById(req, res) });
app.post('/todo', (req, res) => { todo.saveNew(req, res) });
app.patch('/todo/:id', (req, res) => { todo.updateById(req, res) });

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };