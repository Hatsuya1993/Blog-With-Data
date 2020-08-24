const express = require("express");

const app = express();

app.use(express.static("public"));

const ejs = require("ejs");

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let today = new Date();

const dd = String(today.getDate()).padStart(2, "0");

const mm = String(today.getMonth() + 1).padStart(2, "0");

const yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

app.get("/home", (req, res) => {
  res.render("home", {
    today,
  });
});

module.exports = app;