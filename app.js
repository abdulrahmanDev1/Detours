const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//* Middlewares: ===>
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//=========================================>

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//* Routs: ===>
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
