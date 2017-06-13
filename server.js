const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./src/models/mongoose-helper');
let { Todo } = require('./src/models/todo');
let { User } = require('./src/models/user');

const app = express();

app.use(bodyParser.json());

app.get('/todo', (req, res) => { mongoose.getAll(req, res, Todo) });
app.get('/todo/:id', (req, res) => { mongoose.findById(req, res, Todo) });
app.delete('/todo/:id', (req, res) => { mongoose.removeById(req, res, Todo) });
app.put('/todo/:id', (req, res) => { mongoose.updateById(req, res, Todo) });
app.post('/todo', (req, res) => { mongoose.saveNew(req, res, Todo) });

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app }