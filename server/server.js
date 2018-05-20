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
  io.emit('activeRooms', users.getActiveRooms());

    socket.on('join',(params,callback)=>{
        if(!isRealstr(params.name)||!isRealstr(params.room))
        return callback("Name or room is invalid");
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUsers(socket.id,params.name,params.room);
        io.emit('activeRooms', users.getActiveRooms());
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
        var user = users.getUser(socket.id);
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.lat,coords.lng))
    })


    socket.on('createMessage',(message,callback)=>{

      var user = users.getUser(socket.id);
      if(user&& isRealstr(message.text))
      {
      io.to(user.room).emit('newMessage',generateMsg(user.name,message.text));
      }
      callback();
    });
    socket.on('disconnect',()=>{
      io.emit('activeRooms', users.getActiveRooms());
      var user = users.removeUser(socket.id);

        if(user)
          {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMsg('Admin',`${user.name} has left the chat room`));
            io.emit('activeRooms', users.getActiveRooms());
          }
    })

})

server.listen(port,()=>{
  console.log(`up and running ${port}`);
})
