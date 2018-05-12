  var socket = io();
  var emailForm = document.getElementById('emailForm');



socket.on('connect',function(){
  console.log('im connected to server');
})

socket.on('newMessage',function(data){
console.log(JSON.stringify(data));
  if(data.from===$('#emailInput').val())
    $('#chat').append('<li class="blue left">'+data.from+' : '+data.text+'<span>'+data.createdAt+'</span>'+'</li>')
else {
  $('#chat').append('<li class="green right">'+data.from+' : '+data.text+'<span>'+data.createdAt+'</span>'+'</li>')
}


})


socket.on('welcomeMessage',function(msg){
  document.getElementsByTagName('h1')[0].innerHTML+=msg;
});
socket.on('disconnect',function(){
  console.log("server is down");
});


$('#emailForm').on('submit',function(e){

e.preventDefault();
  // socket.on('createMessage',function(data){
  //   document.querySelector('.textMsg').innerHTML= 'From ' +data.email + ' Text : ' +data.text +' AT :'+' <p>'+data.time+ '</p>';
  // })
  if($('#textInput').val()===''||$('#emailInput').val()==='')
    alert("Cannot be empty");
  else {
      $('#emailInput').hide();
    socket.emit('createMessage',{
      from:$('#emailInput').val(),
      text:$('#textInput').val()
    },function(){
      $('#textInput').val("");
      console.log('Sent at : ',new Date().toString());
    });
  }
});



socket.on('newLocationMessage',function(location){
  if($('#emailInput').val()==='')
    alert("cannot be empty");
    else {
      var li = $('<li class="green right"></li>');
      var a = $('<a target="_blank"> : My current location</a>');
      li.text(`${location.from}`);
      a.attr('href',location.url);
      li.append(a);
      $('#chat').append(li);
    }

})



var gpsBtn = $('#sendLocation');
gpsBtn.on('click',function(){
  if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
        user:$('#emailInput').val(),
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
    },function(error){
      alert('Unable to share location' +error);
    });
} else {
  alert("something went wrong");
}

})
