
const express = require('express');

//import the schema 
const Conversation = require("../models/Conversation");
const ConversationRoute = express.Router();


// here the route for send conservation

ConversationRoute.post("/", async (req, res) => {
  const newConversation = new Conversation({
      //here i will just create a random sender and receiver id 
    members: [req.body.senderId, req.body.receiverId],
  });


  //for save in mongo db 
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports=ConversationRoute;