const {
  StartConversation,
  getConversation,
  postMessage,
  getMessage,
  getAllMessage,
} = require("../Controllers/ChatController");
const express = require("express");
const Router = express.Router();

Router.post("/postid", StartConversation);
Router.get("/getdata/:userId", getConversation);
Router.post("/postmessage", postMessage);
Router.get("/getmessage/:conversationid", getMessage);
Router.get("/getallmessage", getAllMessage);

module.exports = Router;
