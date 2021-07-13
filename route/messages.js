const express = require('express');
const MassegeRoute = express.Router();

const Message = require("../models/message");

//add message in conversation between sender and reciver

MassegeRoute.post("/message", async (req, res) => {
  const newMessage = new Message(req.body);
//save the message in mongo
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports= MassegeRoute;