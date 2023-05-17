const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cookieparse = require("cookie-parser");
const env = require("dotenv");
const route = require("./router/route");

env.config();
/** middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.ONLINE,
    credentials: true,
  })
);

app.use(cookieparse());
app.use(morgan("tiny"));

app.disable("x-powered-by"); // less hackers know about our stack

app.use("/", route);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT || 8080;

const URI = process.env.MONGO_ONLINE;
app.get("/", (req, res) => {
  res.status(201).send("Backend live");
});
/** start server only when we have valid connection */
const connection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = mongoose.connect(URI);
    if (db) {
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
      console.log(`Database connected`);
    } else {
      console.log(`Not Connected`);
    }
  } catch (error) {
    console.log(error);
  }
};

connection();
