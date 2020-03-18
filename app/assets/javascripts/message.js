

$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message-box" data-message-id=${message.id}>
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
      </div>`
      return html;
    } else {
      var html =
        `<div class="message-box" data-message-id=${message.id}>
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
        contentType: false,
        
      })
        .done(function(data){
          var html = buildHTML(data);
          $('.main-chat__space').append(html);
          $('.main-chat__space').animate({ scrollTop: $('.main-chat__space')[0].scrollHeight});
          $('form')[0].reset();
          $('.form__submit').prop('disabled', false);
        })
        .fail(function() {
          alert("メッセージ送信に失敗しました");
      });
    })
    var reloadMessages = function() {
    var last_message_id = $('.message-box:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.main-chat__space').append(insertHTML);
    $('.main-chat__space').animate({ scrollTop: $('.main-chat__space')[0].scrollHeight});
    }
    })
  .fail(function() {
  alert('error');
  });
};

    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  } 
});
