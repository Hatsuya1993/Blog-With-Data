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
    currentHome: 'current',
    currentBlogDetails: '',
    title1: 'Tours & Travels',
    title2: 'Amazing places on earth',
    title3: today
  });
});

app.get("/blogDetails", (req, res) => {
  res.render("blogDetails", {
    today,
    currentBlogDetails: 'current',
    currentHome: '',
    title1: '',
    title2: 'Blog details',
    title3: 'Home-Blog Details'
  });
});

module.exports = app;