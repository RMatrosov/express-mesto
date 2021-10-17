const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
