const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogComment: {
        type: String
    },
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
    },
    subject: {
        type: String,
        required: [true, "Please provide title"],
    },
    message: {
        type: String,
        required: [true, "Please provide your message"],
    },
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;