const express = require("express");

const {
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
  deleteBlog
} = require("../controller/blogController");

const blogRoute = express.Router();

blogRoute.route("/").get(normal);

blogRoute.route("/home/:page").get(home);

blogRoute.route("/blog/:blogId").get(blogId);

blogRoute.route("/blog/likes/:blogId").post(numberOfLikes);

blogRoute.route("/blog/:blogId/:page").get(blogId);

blogRoute.route("/create").get(createBlog);

blogRoute.route("/create").post(submitBlog);

blogRoute.route("/blog/comment/:blogId").post(submitComment);

blogRoute.route("/blogDetails").get(blogDetails);

blogRoute.route("/comment").post(submitComment);

blogRoute.route("/categories/:type").get(typeCategories);

blogRoute.route("/categories/:type/:page").get(typeCategories);

blogRoute.route("/contact").get(contactPage);

blogRoute.route("/blog/archive/:blogId").post(archive);

blogRoute.route("/archive").get(archiveContent);

blogRoute.route("/archive/:page").get(archiveContent);

blogRoute.route("/blog/removeArchive/:blogId").post(removeArchive);

blogRoute.route("/blog/:blogId").post(deleteBlog);

blogRoute.route("*").all(error);

module.exports = blogRoute;