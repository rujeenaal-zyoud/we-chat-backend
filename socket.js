
'use strict'
const io = require('socket.io')(http);
  const jwt =require('jwt-then')
  const staffRoom='staff';
  const {v4: uuid}= require('uuid');
  const { Socket } = require('dgram');
  const http=require('http')



  //here add user to interfce 
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};