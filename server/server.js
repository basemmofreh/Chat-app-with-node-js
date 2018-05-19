const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const fs = require('fs');
const app = express();
const publicPath = path.join(__dirname,'../public')
const {generateMsg,generateLocationMessage} = require('./utils/message');
const {isRealstr} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection',(socket)=>{


    socket.on('join',(params,callback)=>{
        if(!isRealstr(params.name)||!isRealstr(params.room))
        return callback("Name or room is invalid");

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUsers(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessage',generateMsg('Admin','Welcome To the chat Application'));
        socket.broadcast.to(params.room).emit('newMessage',generateMsg('Admin',`${params.name} has joined the room`));




        callback();
    })

    //socket.leave


  //socket.emit only for single connection who asked for
  //io.emit send for all connections
  //socket.broadcast.emit for all connections except for the one submitted

    socket.on('createLocationMessage',(coords)=>{
      io.emit('newLocationMessage',generateLocationMessage(coords.user,coords.lat,coords.lng))
    })
    socket.on('createMessage',(message,callback)=>{
      io.emit('newMessage',generateMsg(message.from,message.text))
      callback();
    });
    socket.on('disconnect',()=>{
      var user = users.removeUser(socket.id);

        if(user)
          {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMsg('Admin',`${user.name} has left the chat room`));
          }
      console.log("Client disconnected");
    })

})

server.listen(port,()=>{
  console.log(`up and running ${port}`);
})
