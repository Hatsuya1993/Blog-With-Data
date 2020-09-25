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

const blogRoute = require('./routes/blogRoute')

app.use('/', blogRoute);

module.exports = app;