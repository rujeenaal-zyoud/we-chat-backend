'use strict';

require("dotenv").config();


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const router = express.Router();
const cors =require('cors');



const PORT=process.env.PORT ||5000 ;

  // local dependices
  const User =require('./models/User');
const userRoute = require('./route/user')
const ConversationRoute= require('./route/conservation')
const MassegeRoute = require('./route/messages');
//connect to DB 
mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,

    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

app.get('/hi', (req, res) => {
  res.send('Hello World');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoute);
app.use(ConversationRoute);
app.use(MassegeRoute);
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
