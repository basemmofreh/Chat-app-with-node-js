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
    console.log(data);
})

});

socket.on('disconnect',function(){
  console.log("server is down");
});
