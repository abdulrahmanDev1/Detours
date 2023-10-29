import express, { json } from "express";
import morgan from "morgan";

import tourRouter from "./routs/tourRouts.js";
import userRouter from "./routs/userRouts.js";

const app = express();

// Middlewares:

app.use(morgan("dev"));

app.use(json());

// Routs:
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Server:

app.listen(3000, () => {
  const url = "http://localhost:3000";
  console.log(`Connected on ${url}`);

});
