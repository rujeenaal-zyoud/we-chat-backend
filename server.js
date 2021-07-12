'use strict';

require("dotenv").config();


const express = require('express')
const app = express();
//connect the server with http protocl 
const server = http.createServer(app);
const io = require('socket.io')(http);
const jwt = require('jwt-then')
const staffRoom = 'staff';
const { v4: uuid } = require('uuid');
const { Socket } = require('dgram');
const http = require('http');



//for JWT using 
const SECRET = process.env.SECRET;

// start lisetninig in socket
io.listen(server);


//2
let users = [];
//3

const addUser = (userId, socketId) => {
  // if user as in my array i will not added other i will push it
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};


//7 get user that we want to send the meassge just one 
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};


//1 
//io.on ==> send from server to client

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  io.emit("Hello from server socket");
  //===> then go to frontend  and take the event from here using .on 
  // and we don't know each socket id to send for each one becuse it change
  //So how we will send message to each one ?
  //I will create array  and 
  //3 ==> go to front end 
  //In front end .emmit create the user_id  "addUser"==from front end 
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    // here i add all user in front end with .emmit and send  to take it here 
    addUser(userId, socket.id);
    // then i want to get it from here and send to front with .on
    io.emit("getUsers", users);
  });


  //6 send and get message will send from front 
  //sender=user
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // get the user that we specily want to send to
    const user = getUser(receiverId);
    // send the message 
    io.to(user.socketId).emit("getMessage", {
      //thr meassage content
      senderId,
      text,
    });
  });
  // ==> go to front 


  //5   create function for remove user 
  //socketId that created each time when add 
  const removeUser = (userId) => {
    users = users.filter(user => user.socketId !== socketId)
  }
  //4
  //when disconnect we shoud remove a user from array
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    //send to all the new array 
    io.emit("getUsers", users);
  });
});




// //create socket for token 
// io.use (async(socket,next)=>{
//  //from   https://www.tabnine.com/code/javascript/functions/socket.io/Handshake/address
//         const token = socket.handshake.query.token;
//         const payload = await jwt.verify(token, process.env.SECRET);
//         //for use payload each time i put it in userId
//         socket.userId = payload.id;
//         next();

// }) 

// io.on("connection", (socket) => {
//     console.log("Connected: " + socket.userId);
//   //هون لازم اجيب ال يوزر من داتا بيس ؟؟ واعمل emit
//     });
//       //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });










