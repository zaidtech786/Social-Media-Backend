const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "http://www.gravatar.com/avatar/?d=mp",
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  followings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  bio: {
    type: String,
  },
  link: {
    type: String,
  },
});

const user = mongoose.model("users", userSchema);
module.exports = user;
