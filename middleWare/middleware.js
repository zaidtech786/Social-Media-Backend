const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const JWTKEY = "zaidfazilzaibanoor";

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    console.log("Bearer token is", token);
    jwt.verify(token, JWTKEY, (err, valid) => {
      if (err) {
        res.send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Please add token with headers" });
  }
};

//   let authorization = req.headers["authorization"];
//   if (!authorization) {
//     return res.status(401).json({ error: "You must be loggged in" });
//   }

//   const token = authorization.replace("Bearer ", "");
//   jWT.verify(token, JWTKEY, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "Invalid Token" });
//     }

//     const { _id } = payload;
//     User.findById(_id).then((userData) => {
//       req.user = userData;
//     });
//     next();
//   });
// };

//   if (req.headers["authorization"]) {
//     try {
//       let authorization = req.headers["authorization"].split(" ");
//       if (authorization[0] !== "Bearer") {
//         res.status(401).send("invalid request"); //invalid request
//       } else {
//         jWT.verify(authorization[1], JWTKEY, (err, payload) => {
//           const { _id } = payload;
//           User.findById(_id).then((userData) => {
//             req.user = userData;
//           });
//         });
//         return next();
//       }
//     } catch (err) {
//       res.status(403).send(); //invalid token
//     }
//   } else {
//     res.status(401).send("invalid request");
//   }
// };
