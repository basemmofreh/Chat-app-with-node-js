  var socket = io();
  var emailForm = document.getElementById('emailForm');

  function scrollToButtom(){

    //selectors

      var messages = $('#chat');
      // var newMessage = messages.children('li:last-child');
      //
      // //height
      // var clientHeight = messages.prop('clientHeight');
      var scrollHeight = messages.prop('scrollHeight');
      // var scrollTop = messages.prop('scrollTop');
      // var newMessageHeight = newMessage.innerHeight();
      // var lastNewMessage = newMessage.prev().innerHeight();
      //
      // if(clientHeight+scrollTop+newMessageHeight+lastNewMessage+150>=scrollHeight)
      messages.scrollTop(scrollHeight);
    // var messages = $('#chat');
    // var newMessage = messages.children('li:last-child');
    // //height
    // var clientHeight = messages.prop('clientHeight');
    // var scrollTop = messages.prop('scrollTop');
    // var scrollHeight = messages.prop('scrollHeight');
    // var newMessageHeight = newMessage.innerHeight();
    // var lastMessageHeight = newMessage.prev().innerHeight();
    //
    // if(scrollTop+clientHeight+newMessageHeight+lastMessageHeight>=scrollHeight)
    //   {
    //     messages.scrollTop(scrollHeight);
    //   }

      $('.msgField:last-child').hide().slideDown(500);
  }




socket.on('connect',function(){
    var params = $.deparam(window.location.search);
    socket.emit('join',params,function(err){
      if(err)
        {
          alert(err);
          window.location.href='/';
        }

    })
})

//create new message
socket.on('newMessage',function(data){
    var currentUser = $.deparam(window.location.search).name;
    $.playSound("../imgs/notif.mp3");
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
      from:data.from,
      text:data.text,
      time:formattedTime
    })
    $('#chat').append(html);

    //give colors for your and others msgs
     if(data.from==currentUser)
      $('.msgField:last-child').addClass('red');
    if(data.from!=currentUser&&data.from!='Admin'){
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


socket.on('updateUserList',function(users){

var ol = $('<ol></ol>');
users.forEach(function(user){
  ol.append($('<li></li>').text(user));
})

$('#users').html(ol);
$('.chat__sidebar h3 span').text(users.length);
})
//submit form
$('#emailForm').on('submit',function(e){
e.preventDefault();
  // socket.on('createMessage',function(data){
  //   document.querySelector('.textMsg').innerHTML= 'From ' +data.email + ' Text : ' +data.text +' AT :'+' <p>'+data.time+ '</p>';
  // })
  if($('#textInput').val()==='')
    alert("Cannot be empty");
  else {
    socket.emit('createMessage',{
      text:$('#textInput').val()
    },function(){
      $('#textInput').val("");
    });
  }
});


// send location
socket.on('newLocationMessage',function(location){
    var currentUser = $.deparam(window.location.search).name;
  $.playSound("../imgs/notif.mp3");


      var formattedTime = moment(location.createdAt).format('h:mm a');
      var template = $('#location-template').html();
      var html = Mustache.render(template,{
        from:location.from,
        url:location.url,
        time:formattedTime
      })
      $('#chat').append(html);
      if(location.from===currentUser)
        $('.msgField:last-child').addClass('red');
    else{
        $('.msgField:last-child').addClass('blue');
      }
scrollToButtom();
})


//create location
var gpsBtn = $('#sendLocation');
gpsBtn.on('click',function(){
  $('#sendLocation').prop('disabled', true).text("Sending location ....");


  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
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
