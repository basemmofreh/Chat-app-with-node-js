const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const publicPath = path.join(__dirname,'../public')
const {generateMsg} = require('./utils/message');

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    socket.emit('welcomeMessage','Welcome To the chat Application');
  socket.broadcast.emit('newMessage','new User signed in');

    socket.on('createMessage',(message)=>{
      console.log('createMessage',message);



      //socket.emit only for single connection who asked for
      //io.emit send for all connections
      //socket.broadcast.emit for all connections except for the one submitted

    io.emit('newMessage',generateMsg('admin','welcome to the chat app'));
  });

    socket.on('disconnect',()=>{
      console.log("Client disconnected");
    })
})

server.listen(port,()=>{
  console.log(`up and running ${port}`);
})
