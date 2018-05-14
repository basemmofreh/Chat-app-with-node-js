  var socket = io();
  var emailForm = document.getElementById('emailForm');





socket.on('connect',function(){
  console.log('im connected to server');
})

socket.on('newMessage',function(data){
console.log(JSON.stringify(data));
var formattedTime = moment(data.createdAt).format('h:mm a');
  if(data.from===$('#emailInput').val())
    $('#chat').append('<li class="msgField">'+data.from+' : '+data.text+'<span>'+formattedTime+'</span>'+'</li>').hide().fadeIn(300)
else {
  $('#chat').append('<li class="msgField">'+data.from+' : '+data.text+'<span>'+formattedTime+'</span>'+'</li>').hide().fadeIn(300)
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
      var formattedTime = moment(location.createdAt).format('h:mm A');
      var li = $('<li class="msgField"></li>');
      var a = $('<a target="_blank">My current location<span>'+formattedTime+'<span></a>');
      if($('#textInput').val()!='')
      li.text(`${location.from} `+' : '+$('#textInput').val()+' ');
      else
      li.text(`${location.from}`+' : ');
      a.attr('href',location.url);
      li.append(a);
      $('#chat').append(li);


}})



var gpsBtn = $('#sendLocation');
gpsBtn.on('click',function(){
  $('#sendLocation').prop('disabled', true).text("Sending location ....");


  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
        user:$('#emailInput').val(),
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
        $('#sendLocation').prop('disabled', false).text("Send location");
    },function(error){
      alert('Unable to share location' +error);
        $('#sendLocation').prop('disabled', false).text("Send location");
    });
} else {
  alert("something went wrong");
}

})

$( "#chat" ).delegate( "li", "click",function(){
  var msg = this;
  $(this).find('span').fadeIn(500);


})
