const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Getting Routes files
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/ChatRoute");
app.use("/api", userRoute);
app.use("/chat", chatRoute);

// MongoDb Setup
let dbUri =
  "mongodb+srv://szaid786:nN5r7WGWFt7yL36F@cluster0.bwg8vtg.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

// Getting Models files
const user = require("./Models/UserModel");
const post = require("./Models/Post");
const comments = require("./Models/CommentModel");
const ConversationModel = require("./Models/ConversationModel");
const MessageModel = require("./Models/MessageModel");

app.listen(5000, "192.168.0.105", () => {
  console.log(`Connected Successfully on port 5000`);
});
