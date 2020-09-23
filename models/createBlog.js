const mongoose = require("mongoose");

let today = new Date();

const dd = String(today.getDate()).padStart(2, "0");

const mm = String(today.getMonth() + 1).padStart(2, "0");

const yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  passage: {
    type: String,
  },
  archive: {
    type: String,
    default: "false"
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "guide", "lead-guide", "admin"],
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
  dateCreated: {
    type: String,
    default: today
  },
  date: {
    type: Object,
    default: new Date()
  },
  likes: {
    type: Number,
    default: 0
  },
  blogComments: [{
    name: String,
    email: String,
    subject: String,
    message: String,
  }],
  categories: {
    type: String,
    default: "others",
    enum: ["technology", "holiday", "education", "others"]
  }
})
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;