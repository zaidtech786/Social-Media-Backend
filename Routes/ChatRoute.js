const Message = require("../Models/MessageModel");

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
Router.get("/getconversation/:userId", getConversation);
Router.post("/postmessage", postMessage);
Router.get("/getmessage/:conversationId", getMessage);
Router.get("/getallmessage", getAllMessage);

module.exports = Router;
