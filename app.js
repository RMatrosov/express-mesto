const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://matrosov.mesto.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use(helmet());

app.disable('x-powered-by');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(requestLogger);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
