const express = require('express');

const {
    createBlog,
    home,
    blogDetails,
    error,
    submitBlog,
    blogId,
    submitComment,
    numberOfLikes
} = require('../controller/blogController');

const blogRoute = express.Router();

blogRoute.route('/home/:page').get(home);

blogRoute.route('/blog/:blogId').get(blogId)

blogRoute.route('/blog/likes/:blogId').post(numberOfLikes)

blogRoute.route('/blog/:blogId/:page').get(blogId)

blogRoute.route('/create').get(createBlog);

blogRoute.route('/create').post(submitBlog)

blogRoute.route('/blog/comment/:blogId').post(submitComment);

blogRoute.route('/blogDetails').get(blogDetails);

blogRoute.route('/comment').post(submitComment)

blogRoute.route('*').all(error);

module.exports = blogRoute;