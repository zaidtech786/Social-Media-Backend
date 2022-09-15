const express = require("express");
const {
  signUp,
  signIn,
  test,
  posts,
  allPosts,
  myPost,
  likePost,
} = require("../Controllers/userController");
// const controller = require("../Controllers/userController");
// const { , getData } = require("../Controllers/userController");
const Router = express.Router();
const middleware = require("../middleWare/middleware");

Router.post("/signup", signUp);
Router.post("/signin", signIn);
Router.get("/test", middleware, test);
Router.post("/post", posts);
Router.get("/allpost", allPosts);
Router.get("/mypost/:id", myPost);
Router.put("/like/:id", likePost);
module.exports = Router;
