const path = require('path');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routs/tourRoutes');
const userRouter = require('./routs/userRoutes');

const app = express();

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
