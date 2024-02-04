const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));
mongoose.set('strictQuery', false);
// console.log(process.env);
const app = require('./app');
//? Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Connected on ${url}`);
});
