const express = require('express');
const contentError = require('./Errors').contentError;
const { HOST, PORT } = require('./config');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, _, next) => {
  if (!req.is('application/json')) {
    throw contentError('Content type must be JSON');
  }
  if (typeof req.body !== 'object') {
    throw contentError('Request body must be an object');
  }
  next();
});
app.post('/api/tasks/roman', (req, res) => {
  // Генерация "непредвиденной" ошибки сервера.
  if (req.body.input === 'error') {
    throw new Error('Testing server error');
  }
  require('./ContentValidators').romanValidate(req.body);
  const result = require('./source/roman')(req.body.input);
  res.send({ result });
});
app.post('/api/tasks/palindrome', (req, res) => {
  require('./ContentValidators').palindromeValidate(req.body);
  const result = require('./source/palindrome')(req.body.input);
  res.send({ result });
});
app.post('/api/tasks/brackets', (req, res) => {
  require('./ContentValidators').romanValidate(req.body);
  const result = require('./source/brackets')(req.body.input);
  res.send({ result });
});
app.post('/api/tasks/arraySort', (req, res) => {
  require('./ContentValidators').arraySortValidate(req.body);
  const { arr1, arr2 } = req.body;
  const result = require('./source/arraySort')(arr1, arr2);
  res.send({ result });
});
app.post('/api/tasks/nextIndex', (req, res) => {
  require('./ContentValidators').nextIndexValidate(req.body);
  const { nums, target } = req.body;
  const result = require('./source/nextIndex')(nums, target);
  res.send({ result });
});
app.use((err, _, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'ContentError') {
    return res.status(400).send({ message: err.message });
  }

  console.log(err);
  res.status(500).send({ message: 'Terrible server error' });
});

app.listen(PORT, () => {
  console.log(`App listening at ${HOST}:${PORT}`);
});
