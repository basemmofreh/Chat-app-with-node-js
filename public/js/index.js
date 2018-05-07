  var socket = io();
  var emailForm = document.getElementById('emailForm');

socket.on('connect',function(){
  console.log('im connected to server');

emailForm.addEventListener('submit',function(e){
e.preventDefault();
  var data = {
    email:document.getElementById('emailInput').value,
    text:document.getElementById('textInput').value
  }
  socket.on('newEmail',function(data){
    document.querySelector('.textMsg').innerHTML= 'From ' +data.email + ' Text : ' +data.text +' AT :'+' <p>'+data.time+ '</p>';
  })
})


socket.on('newMessage',function(data){
alert(JSON.stringify(data));
console.log(JSON.stringify(data));
})

socket.on('welcomeMessage',function(msg){
  document.getElementsByTagName('h1')[0].innerHTML+=msg;
});


});

socket.on('disconnect',function(){
  console.log("server is down");
});
