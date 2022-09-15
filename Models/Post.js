const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: {
    type: String,
    default: "http://www.gravatar.com/avatar/?d=mp",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],

  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
      comment: "String",
    },
  ],
  content: {
    type: String,
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

const post = mongoose.model("posts", postSchema);
module.exports = post;
