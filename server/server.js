const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const fs = require('fs');
const app = express();
const publicPath = path.join(__dirname,'../public')
const {generateMsg,generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  //socket.emit only for single connection who asked for
  //io.emit send for all connections
  //socket.broadcast.emit for all connections except for the one submitted
    socket.emit('newMessage',generateMsg('Admin','Welcome To the chat Application'));
    socket.broadcast.emit('newMessage',generateMsg('Admin','new User signed in'));
    socket.on('createLocationMessage',(coords)=>{
      io.emit('newLocationMessage',generateLocationMessage(coords.user,coords.lat,coords.lng))
    })
    socket.on('createMessage',(message,callback)=>{
      io.emit('newMessage',generateMsg(message.from,message.text))
      callback();
    });
    socket.on('disconnect',()=>{
      console.log("Client disconnected");
    })

})

server.listen(port,()=>{
  console.log(`up and running ${port}`);
})
