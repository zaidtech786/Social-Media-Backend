const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: true }
);

const comments = mongoose.model("comments", commentSchema);
module.exports = comments;
