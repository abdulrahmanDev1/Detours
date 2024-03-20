const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  if (process.env.NODE_ENV === 'development')
    console.log('DB connection successful!');
});
mongoose.set('strictQuery', false);

const app = require('./app');

//? Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    const url = `http://localhost:${port}`;
    console.log(`Connected on ${url}`);
  }
});
