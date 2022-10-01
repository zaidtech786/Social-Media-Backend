const User = require("../Models/UserModel");
const Comment = require("../Models/CommentModel");
const jWT = require("jsonwebtoken");
const JWTKEY = "zaidfazilzaibashahinoor";
const post = require("../Models/Post");
const middleware = require("../middleWare/middleware");

const signUp = async (req, res) => {
  const { username, name, email, password, confirmPassword, profile } =
    req.body;
  console.log(username, name, email, password, confirmPassword, profile);
  // let user;
  User.findOne({ email: email, userName: username }, (err, user) => {
    if (user) {
      return res.status(401).json({
        message: "Username and email already registered please login ",
      });
    } else {
      const newUser = new User({
        userName: username,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        profile,
      });
      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ message: "SignUp Successfully " });
        }
      });
    }
  });
};

const signIn = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName && !password) {
    return res.send({ message: "Please Fill all the Credential" });
  }
  let user;

  User.findOne({ userName }, (err, user) => {
    if (!user) {
      res.send({ error: "User not Found ! " });
    } else {
      if (req.body.password !== user.password) {
        res.send({ error: "Password Is Incorrect" });
      } else {
        let token = jWT.sign({ _id: user._id }, JWTKEY, { expiresIn: 2 });
        console.log(token);

        res.send({ Message: "Login Successfully", token, user });
      }
    }
  });
};

// Getting All USer
const allUsers = async (req, res) => {
  User.find({})
    .select("-password -confirmPassword")
    .then((data) => res.send({ data }))
    .catch((err) => console.log(err));
};

const posts = async (req, res) => {
  const { image, content, postedBy } = req.body;
  if (!content && !image) {
    return res.send({ error: "Please Fill all the Credential" });
  } else {
    const newPosts = new post({
      image,
      content,
      postedBy,
    });
    newPosts.save().then((data) => {
      return res.json({
        success: true,
        Message: "Uploaded Successfully",
        data,
      });
    });
  }
};

const allPosts = async (req, res) => {
  post
    .find({})
    .populate("postedBy", "name username email profile userName")
    .then((data) => res.send({ data }))
    .catch((err) => console.log(err));
};

const myPost = async (req, res) => {
  post
    .find({ postedBy: req.params.Id })
    .populate("postedBy", "name username email profile userName")
    .then((data) => res.json({ data }))
    .catch((err) => console.log(err));
};

// const likePost =async (req,res) => {
//   try{
//    const Posts = await post.findById(req.params.id)
//    if(!Posts.likes.includes(req.body.userId)){
//     await Posts.updateOne({$push : {likes:req.body.userId}})
//     res.status(200).json({message:"Your Posts has been Liked"})
//    }
//    else{
//      await Posts.updateOne({ $pull: { likes: req.body.userId } });
//    }
//   }catch(err){

//   }
// }

const likePost = async (req, res) => {
  post
    .findByIdAndUpdate(
      req.params.postId,
      {
        $push: { likes: req.body.userId },
      },
      {
        new: true,
      }
    )
    .populate("postedBy")
    // .populate("likes")
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, result });
      }
    });
};
const unLikePost = async (req, res) => {
  post
    .findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { likes: req.body.userId },
      },
      {
        new: true,
      }
    )
    .populate("postedBy")
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, result });
      }
    });
};

const commentPost = async (req, res) => {
  const { comment, userId, postId } = req.body;

  const newComment = new Comment({
    comment,
    userId,
    postId,
  });
  newComment.save().then((comment) => {
    return res.json({
      Message: "Uploaded Successfully",
      comment,
    });
  });
};

const getComment = async (req, res) => {
  Comment.find({ postId: req.params.postId })
    .populate("postId userId")
    .then((comment) => res.json({ comment }))
    .catch((err) => res.send(err));
};

// Getting USer Profile
const profile = (req, res) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.Id })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      res.send(err);
    });
};

const userProfile = async (req, res) => {
  post
    .find({ postedBy: req.params.Id })
    .populate("postedBy", "name username email profile userName")
    .then((data) => res.json({ data }))
    .catch((err) => console.log(err));
};

const updateProfile = async (req, res) => {
  const { names, userNames, bios, links } = req.body;
  //  name || userName|| bio|| link ?
  let user;
  try {
    user = await User.findByIdAndUpdate(req.params.id, {
      name: names,
      userName: userNames,
      bio: bios,
      link: links,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.send({ message: "Error" });
  } else {
    return res.send({ message: "Updated Successfully", user });
  }
};

const SinglePost = async (req, res) => {
  let posts;
  try {
    posts = await post
      .findById(req.params.postId)
      .populate("comments.postedBy");
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.send({ message: "NOt Found" });
  }
  return res.send({ posts });
};

const deletePost = async (req, res) => {
  post
    .findByIdAndRemove(req.params.postId)
    .then((data) => res.send({ message: "Deleted", data }))
    .catch((err) => res.send(err));
};

const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const CurrentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user
          .updateOne({ $push: { followers: req.body.userId } })
          .populate("followers");
        await CurrentUser.updateOne({
          $push: { followings: req.params.id },
        }).populate("followings");
        res.send({ user, CurrentUser });
      } else {
        res.send({ message: "You Alreaddy follow this User" });
      }
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send({ message: "You can't follow Yourself" });
  }
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.posts = posts;
exports.allPosts = allPosts;
exports.myPost = myPost;
exports.likePost = likePost;
exports.unLikePost = unLikePost;
exports.profile = profile;
exports.userProfile = userProfile;
exports.allUsers = allUsers;
exports.commentPost = commentPost;
exports.updateProfile = updateProfile;
exports.SinglePost = SinglePost;
exports.getComment = getComment;
exports.deletePost = deletePost;
exports.followUser = followUser;
