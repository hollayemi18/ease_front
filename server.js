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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);
app.use(cookieparse());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const PORT = 8080;

const URI = process.env.MONGO_DB;

/** start server only when we have valid connection */
const connection = async () => {
  mongoose.set("strictQuery", false);
  const db = await mongoose
    .connect(URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server running on port ${PORT}...`);
      });
      console.log("database connected successfully ");
    })

    .catch(() => {
      console.log("Database Error");
    });
};

connection();
