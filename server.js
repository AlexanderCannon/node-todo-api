const express = require('express');
const bodyParser = require('body-parser');

const { mongoose, saveNew, getAll } = require('./src/models/mongoose');
let { Todo } = require('./src/models/todo');
let { User } = require('./src/models/user');

const app = express();

app.use(bodyParser.json());

app.get('/todo', (req, res) => { getAll(req, res, Todo) });

app.post('/todo', (req, res) => { saveNew(req, res, Todo) });

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app }