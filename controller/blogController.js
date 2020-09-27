const Blog = require("../models/createBlog");

const Comment = require("../models/createComment");

const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");

let today = new Date();

const dd = String(today.getDate()).padStart(2, "0");

const mm = String(today.getMonth() + 1).padStart(2, "0");

const yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

// Display home page
const home = catchAsync(async (req, res, next) => {
  const latest = await Blog.find()
    .sort([
      ["date", -1]
    ])
    .limit(10);
  const popular = await Blog.find()
    .sort([
      ["likes", -1]
    ])
    .limit(3);
  const perPage = 3;
  const page = req.params.page || 1;
  await Blog.find()
    .sort([
      ["date", -1]
    ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      Blog.count().exec(function (err, count) {
        if (err) return next(err);
        res.render("home", {
          popular,
          latest,
          today,
          currentHome: "current",
          currentCreate: "",
          currentContact: "",
          currentArchive: "",
          currentCat: "",
          title1: "Tours & Travels",
          title2: "Amazing places on earth",
          title3: today,
          products,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

// Diplay specific blog
const blogId = catchAsync(async (req, res, next) => {
  const findBlog = await Blog.findById(req.params.blogId);
  const popular = await Blog.find()
    .sort([
      ["likes", -1]
    ])
    .limit(3);
  const perPage = 5;
  let {
    blogId
  } = req.params;
  const page = req.params.page || 1;
  await Comment.find({
      blogComment: req.params.blogId,
    })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      Comment.count().exec(function (err, count) {
        if (err) return next(err);
        res.render("blogDetails", {
          popular,
          blogId,
          count,
          products,
          current: page,
          pages: Math.ceil(count / perPage),
          today,
          currentHome: "",
          currentCreate: "",
          currentContact: "",
          currentArchive: "",
          currentCat: "",
          title1: "",
          title2: "Blog details",
          title3: "Home-Blog Details",
          findBlog,
        });
      });
    });
});

// Display categories page
const typeCategories = catchAsync(async (req, res, next) => {
  const popular = await Blog.find()
    .sort([
      ["likes", -1]
    ])
    .limit(3);
  const {
    type
  } = req.params;
  const perPage = 3;
  const page = req.params.page || 1;
  await Blog.find({
      categories: req.params.type,
    })
    .sort([
      ["date", -1]
    ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      Blog.count().exec(function (err, count) {
        if (err) return next(err);
        res.render("typeCategories", {
          type,
          popular,
          today,
          currentHome: "",
          currentCreate: "",
          currentContact: "",
          currentArchive: "",
          currentCat: "current",
          title1: "",
          title2: req.params.type,
          title3: today,
          products,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

// Display page for specific page
const blogDetails = async (req, res) => {
  const findBlog = await Blog.findById(req.params.blogId);
  res.render("blogDetails", {
    today,
    currentHome: "",
    currentCreate: "",
    currentContact: "",
    currentArchive: "",
    currentCat: "",
    title1: "",
    title2: "Blog details",
    title3: "Home-Blog Details",
    findBlog,
  });
};

// Form to create new blog
const createBlog = catchAsync(async (req, res) => {
  res.render("create", {
    currentCreate: "current",
    currentHome: "",
    currentContact: "",
    currentArchive: "",
    currentCat: "",
  });
});

// Submit a new blog
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
    categories: req.body.categories,
    archive: req.body.exampleRadios,
  });
  res.status(201);
  res.redirect("home/1");
});

// Add a new like
const numberOfLikes = catchAsync(async (req, res) => {
  await Blog.update({
    _id: req.params.blogId,
  }, {
    $inc: {
      likes: 1,
    },
  });
  res.status(201);
  res.redirect("back");
});

// Submit the comment for the specific blog
const submitComment = catchAsync(async (req, res) => {
  // await Blog.update({
  //   _id: req.params.blogId
  // }, {
  //   $push: {
  //     blogComments: {
  //       name: req.body.name,
  //       email: req.body.email,
  //       subject: req.body.subject,
  //       message: req.body.message,
  //     } //inserted data is the object to be inserted
  //   }
  // });
  await Comment.create({
    blogComment: req.params.blogId,
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  await Blog.update({
    _id: req.params.blogId,
  }, {
    $inc: {
      blogComments: 1,
    },
  });
  res.status(201);
  res.redirect("back");
});

// Display contact page
const contactPage = catchAsync(async (req, res) => {
  res.render("contactPage", {
    currentHome: "",
    currentCreate: "",
    currentContact: "current",
    currentArchive: "",
    currentCat: "",
    title1: "",
    title2: "Contact Us",
    title3: "Contact Details",
  });
});

// Archive

const archive = catchAsync(async (req, res) => {
  //Toggle the value from Yes to no ot vice versa
  await Blog.findByIdAndUpdate(req.params.blogId, {
    archive: "true",
  });
  res.redirect("back");
});

// Remove Archive
const removeArchive = catchAsync(async (req, res) => {
  //Toggle the value from Yes to no ot vice versa
  await Blog.findByIdAndUpdate(req.params.blogId, {
    archive: "false",
  });
  res.redirect("back");
});

// Archive content

const archiveContent = catchAsync(async (req, res) => {
  const {
    type
  } = req.params;
  const popular = await Blog.find().sort([
    ["likes", -1]
  ]);
  const perPage = 3;
  const page = req.params.page || 1;
  await Blog.find({
      archive: "true",
    })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      Blog.count().exec(function (err, count) {
        if (err) return next(err);
        res.render("archive", {
          type,
          popular,
          count,
          products,
          current: page,
          pages: Math.ceil(count / perPage),
          today,
          currentHome: "",
          currentCreate: "",
          currentContact: "",
          currentArchive: "current",
          currentCat: "",
          title1: "",
          title2: "Archive details",
          title3: "",
        });
      });
    });
});

// Display error page if URL not found
const error = async (req, res) => {
  res.render("errorPage", {
    url: req.originalUrl,
    code: 404,
  });
};

const normal = async (req, res) => {
  res.redirect("/home/1");
};

module.exports = {
  createBlog,
  home,
  blogDetails,
  error,
  submitBlog,
  blogId,
  submitComment,
  numberOfLikes,
  typeCategories,
  contactPage,
  archive,
  archiveContent,
  removeArchive,
  normal,
};