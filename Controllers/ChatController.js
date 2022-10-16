const Conversation = require("../Models/ConversationModel");
const Message = require("../Models/MessageModel");

//new conv

const StartConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv of a user

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate("members");
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//add

const postMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get Messgage
const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.StartConversation = StartConversation;
exports.getConversation = getConversation;
exports.postMessage = postMessage;
exports.getMessage = getMessage;
exports.getAllMessage = getAllMessage;
