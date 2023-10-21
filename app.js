const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello From server side');
});

app.listen(3000, () => {
  const url = 'http://localhost:3000';
  console.log(`Connected on ${url}`);
});
