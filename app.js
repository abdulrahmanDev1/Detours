const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routs/tourRouts.js');
const userRouter = require('./routs/userRouts.js');

const app = express();

// Middlewares:

app.use(morgan('dev'));

app.use(express.json());

// Routs:
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Server:

app.listen(3000, () => {
  const url = 'http://localhost:3000';
  console.log(`Connected on ${url}`);
});
