const mongoose = require("mongoose");
const User = require("../Models/UserModel");
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
    newPosts
      .save()
      .then((data) => {
        res.json({ Message: "Uploaded Successfully", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// router.get("/getAllReq", async (req, res) => {
//   IssueBookModel.find({})
//     .select("firstName lastName bookName bookLang")
//     .populate("studentId")
//     .populate("bookId")
//     .then((data) => {
//       res.send(data);
//     });
// });

const allPosts = async (req, res) => {
  post
    .find({})
    .populate("postedBy", "name username email profile userName")
    .then((data) => res.send({ data }))
    .catch((err) => console.log(err));
};

const myPost = async (req, res) => {
  post
    .find({ postedBy: req.params.id })
    .populate("postedBy", "name username email profile userName")
    .then((data) => res.json({ data }))
    .catch((err) => console.log(err));
};

const likePost = async (req, res) => {
  post
    .findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.body.id },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result });
      }
    });
};

const test = async (req, res) => {
  res.send("hwllo");
  console.log("hello");
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.test = test;
exports.posts = posts;
exports.allPosts = allPosts;
exports.myPost = myPost;
exports.likePost = likePost;
// exports = { getData };
