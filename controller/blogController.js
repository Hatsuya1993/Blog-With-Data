const mongoose = require("mongoose");

const Blog = require("../models/createBlog");

const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");

let today = new Date();

const dd = String(today.getDate()).padStart(2, "0");

const mm = String(today.getMonth() + 1).padStart(2, "0");

const yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

const home = catchAsync(async (req, res, next) => {
  const perPage = 3;
  const page = req.params.page || 1;
  await Blog.find().skip((perPage * page) - perPage).limit(perPage).exec(function (err, products) {
    Blog.count().exec(function (err, count) {
      if (err) return next(err)
      res.render("home", {
        today,
        currentHome: "current",
        currentBlogDetails: "",
        currentCreate: "",
        title1: "Tours & Travels",
        title2: "Amazing places on earth",
        title3: today,
        products,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    })
  });

});

const blogDetails = async (req, res) => {
  const findBlog = await Blog.find({
    title: req.params.blogId,
  });
  res.render("blogDetails", {
    today,
    currentBlogDetails: "current",
    currentHome: "",
    currentCreate: "",
    title1: "",
    title2: "Blog details",
    title3: "Home-Blog Details",
    findBlog,
  });
};

const createBlog = catchAsync(async (req, res) => {
  res.render("create", {
    currentCreate: "current",
    currentBlogDetails: "",
    currentHome: "",
  });
});

const submitBlog = catchAsync(async (req, res) => {
  await Blog.create({
    title: req.body.title,
    passage: req.body.passage,
    role: req.body.role,
    image: req.body.image,
    date: today,
    comments: 2,
    name: req.body.name,
    userImg: req.body.userImg,
  });
  res.status(201);
  res.redirect("home/1");
  res.redirect("home/:blogId");
});

const blogId = catchAsync(async (req, res) => {
  const findBlog = await Blog.find({
    title: req.params.blogId,
  });
  res.render("blogDetails", {
    today,
    currentBlogDetails: "current",
    currentHome: "",
    currentCreate: "",
    title1: "",
    title2: "Blog details",
    title3: "Home-Blog Details",
    findBlog: findBlog[0],
  });
});

const error = async (req, res) => {
  res.render("errorPage", {
    url: req.originalUrl,
    code: 404,
  });
};

module.exports = {
  createBlog,
  home,
  blogDetails,
  error,
  submitBlog,
  blogId,
};