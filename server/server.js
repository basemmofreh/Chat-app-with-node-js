const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const publicPath = path.join(__dirname,'../public')

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user connected');


      socket.emit('newEmail',"ahmeds sehsbasdasda");
    socket.on('createEmail',(email)=>{
        console.log('Create email',email);
        email.time= new Date().getTime().toString();
        socket.emit('newEmail',email);
    })

    socket.on('disconnect',()=>{
      console.log("Client disconnected");
    })
})

server.listen(port,()=>{
  console.log(`up and running ${port}`);
})
