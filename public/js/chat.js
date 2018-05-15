  var socket = io();
  var emailForm = document.getElementById('emailForm');


  function scrollToButtom(){

    //selectors
    var messages = $('#chat');
    var newMessage = messages.children('li:last-child');
    //height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(scrollTop+clientHeight+newMessageHeight+lastMessageHeight>=scrollHeight)
      {
        messages.scrollTop(scrollHeight);
      }

    //
    // //selectors
    // var messages = $('#chat');
    // var newMessage = messages.children('li:last-child');
    // //heights
    // var clientHeight = messages.prop('clientHeight');
    // var scrollTop = messages.prop('scrollTop');
    // var scrollHeight = messages.prop('scrollHeight');
    // var newMessageHeight = newMessage.innerHeight();
    // var lastMessageHeight = newMessage.prev().innerHeight();
    // if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
    //   {
    //     messages.scrollTop(scrollHeight);
    //   }
      $('.msgField:last-child').hide().slideDown(500);
  }




socket.on('connect',function(){
  console.log('im connected to server');
})

//create new message
socket.on('newMessage',function(data){
  $.playSound("../imgs/notif.mp3");
console.log(JSON.stringify(data));

var formattedTime = moment(data.createdAt).format('h:mm a');
var template = $('#message-template').html();
var html = Mustache.render(template,{
  from:data.from,
  text:data.text,
  time:formattedTime
})
$('#chat').append(html);



//give colors for your and others msgs
if(data.from===$('#emailInput').val())
  $('.msgField:last-child').addClass('red');
if(data.from!=$('#emailInput').val()&&data.from!='Admin'){
  $('.msgField:last-child').addClass('blue');
}
scrollToButtom();
})


socket.on('welcomeMessage',function(msg){
  document.getElementsByTagName('h1')[0].innerHTML+=msg;
});
socket.on('disconnect',function(){
  console.log("server is down");
});

//submit form
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


// send location
socket.on('newLocationMessage',function(location){
  $.playSound("../imgs/notif.mp3");
  if($('#emailInput').val()==='')
    alert("cannot be empty");
    else {

      var formattedTime = moment(location.createdAt).format('h:mm a');
      var template = $('#location-template').html();
      var html = Mustache.render(template,{
        from:location.from,
        url:location.url,
        time:formattedTime
      })
      $('#chat').append(html);
      if(location.from===$('#emailInput').val())
        $('.msgField:last-child').addClass('red');
    else{
        $('.msgField:last-child').addClass('blue');
      }
scrollToButtom();
}})


//create location
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
