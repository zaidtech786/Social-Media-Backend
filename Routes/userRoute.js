const express = require("express");
const {
  signUp,
  signIn,
  posts,
  allPosts,
  myPost,
  likePost,
  unLikePost,
  profile,
  userProfile,
  allUsers,
  commentPost,
  updateProfile,
  SinglePost,
  getComment,
  deletePost,
  followUser,
  unFollowUser,
} = require("../Controllers/userController");
const Router = express.Router();
const middleware = require("../middleWare/middleware");

Router.post("/signup", signUp);
Router.post("/signin", signIn);
Router.post("/post", posts);
Router.get("/allpost", allPosts);
Router.get("/mypost/:Id", myPost);
Router.put("/like/:postId", likePost);
Router.put("/unlike/:postId", unLikePost);
Router.get("/profile/:Id", profile);
Router.get("/user/:Id", userProfile);
Router.get("/allusers", allUsers);
Router.get("/getcomments/:postId", getComment);
Router.post("/comment", commentPost);
Router.put("/update/:id", updateProfile);
Router.get("/singlepost/:postId", SinglePost);
Router.delete("/deletepost/:postId", deletePost);
Router.put("/follow/:Id", followUser);
Router.put("/unfollow/:Id", unFollowUser);
// Router.get("/userprofile/:userId", userProfile);
module.exports = Router;
