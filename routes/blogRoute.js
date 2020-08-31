const express = require('express');

const {
    createBlog,
    home,
    blogDetails,
    error,
    submitBlog,
    blogId,
} = require('../controller/blogController');

const blogRoute = express.Router();

blogRoute.route('/home/:page').get(home);

blogRoute.route('/blog/:blogId').get(blogId)

blogRoute.route('/create').get(createBlog);

blogRoute.route('/blogDetails').get(blogDetails);

blogRoute.route('/create').post(submitBlog)

blogRoute.route('*').all(error);

module.exports = blogRoute;