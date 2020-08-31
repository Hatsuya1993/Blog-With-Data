const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  passage: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "guide", "lead-guide", "admin"],
  },
  date: {
    type: Date,
  },
  comments: {
    type: Number,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  userImg: {
    type: String,
    required: [true, "Please provide your link user picture"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
