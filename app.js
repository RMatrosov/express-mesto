const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');

app.use((req, res, next) => {
  req.user = {
    _id: '614b83e9dc70e5f0c978d90',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
