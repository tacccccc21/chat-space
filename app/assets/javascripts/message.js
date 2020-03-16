$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message-box">
       <div class="main-chat__space">
          <div class="main-chat__space__box">
            <div class="main-chat__space__box__name">
              ${message.user_name}
            </div>
            <div class="main-chat__space__box__day">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__space__hello">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>
      </div>`
      return html;
    } else {
      var html =
       `<div class="message-box">
       <div class="main-chat__space">
          <div class="main-chat__space__box">
            <div class="main-chat__space__box__name">
              ${message.user_name}
            </div>
            <div class="main-chat__space__box__day">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__space__hello">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>
       </div>`
      return html;
    };
  }

$('#new_message').on('submit', function(e){
e.preventDefault();
var formData = new FormData(this);
var url = $(this).attr('action')
$.ajax({
  url: url,
  type: "POST",
  data: formData,
  dataType: 'json',
  processData: false,
  contentType: false
})
  .done(function(data){
   
    var html = buildHTML(data);
    
    
  })
})
})