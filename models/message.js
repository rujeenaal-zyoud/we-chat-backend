const mongoose = require("mongoose");

//create schema message between sender and consevId
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {type: String,},
    sender: {type: String,},
    text: {type: String,},
  },
);



module.exports = mongoose.model("Message", MessageSchema);