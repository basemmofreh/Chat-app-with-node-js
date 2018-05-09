  var socket = io();
  var emailForm = document.getElementById('emailForm');

socket.on('connect',function(){
  console.log('im connected to server');
})

socket.on('newMessage',function(data){

  if(data.from==$('#emailInput').val()&&data.from!='Admin')
    $('#chat').append('<li class="blue left">'+data.from+' : '+data.text+'<span>'+data.createdAt+'</span>'+'</li>')
  else if(data.from==='Admin')
    $('#chat').append('<li class="green">'+data.from+' : '+data.text+'<span>'+data.createdAt+'</span>'+'</li>')
    else {
  $('#chat').append('<li class="yellow right">'+data.from+' : '+data.text+'<span>'+data.createdAt+'</span>'+'</li>')

console.log(JSON.stringify(data));
}})

socket.on('welcomeMessage',function(msg){
  document.getElementsByTagName('h1')[0].innerHTML+=msg;
});
socket.on('disconnect',function(){
  console.log("server is down");
});


$('#emailForm').on('submit',function(e){
e.preventDefault();
  var data = {
    email:document.getElementById('emailInput').value,
    text:document.getElementById('textInput').value
  }
  // socket.on('createMessage',function(data){
  //   document.querySelector('.textMsg').innerHTML= 'From ' +data.email + ' Text : ' +data.text +' AT :'+' <p>'+data.time+ '</p>';
  // })
  socket.emit('createMessage',{
    from:$('#emailInput').val(),
    text:$('#textInput').val()
  },function(){
    $('#textInput').val("");
    console.log('Sent at : ',new Date().toString());
  });

});
