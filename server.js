const dotenv = require("dotenv");

const mongoose = require("mongoose");

const app = require("./app");

app.set("view engine", "ejs");

process.on("uncaughtException", () => {
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Success");
  });

// Server

const port = process.env.PORT || 3000;

// let port = process.env.PORT;
// if (port == null || port === "") {
//   port = 3000;
// }

const server = app.listen(port, () => {
  console.log("Server started");
});

// Handle all the errors in the async code that wasnt handle

process.on("unhandledRejection", () => {
  server.close(() => {
    process.exit(1);
  });
});