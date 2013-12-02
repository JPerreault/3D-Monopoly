function checkPassword(str)
{
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
  return re.test(str);
}

function validateUpdate(){

  if($('#useremail').val() != $('#useremail_repeat').val()){
    $('#email').before('<span class="error"> Emails must match in both fields</span>');
    return false;
  }
  if($('#userpass').val() != "") {
    if(!checkPassword($('#userpass').val())) {
      $('#userpass').before('<span class="error"> Password should be 6 characters and contain at least 1 capital letter and number</span>');
      $('#userpass').focus();
      return false;
    } else if($('#userpass').val() != $('#password_repeat').val()){
      $('#confirmpw').before('<span class="error"> Password does not match above. Check your spelling and try again</span>');
      $('#password_repeat').focus();
      return false;
    } else{
      return true;
    }
  }
  return true;
}

$(function(){

  function updateRequest(pw, email, callback){
    $.ajax({
      type: 'POST',
      url : '/update_profile',
      data: { userpass: pw, useremail : email }
    }).done(function(msg){
      callback(msg);
    });

  }


  $("#profile_form").on('submit',function(e){
    e.preventDefault();
    $('.success').remove();
    $('.error').remove();
    var pw = $('#userpass').val();
    var email = $('#useremail').val();
    if(pw == "" && email == ""){
      return false;
    }
    console.log('clicked');
    if(validateUpdate()){
      console.log("validated");
      updateRequest(pw, email, function(response){
        console.log(response.message);
        if(response.message == "Email already in use"){
          $('#email').before('<span class="error">' + response.message + '</span>');
        }
        else{
          $('.register').after('<span class="success">' + response.message + '</span>');
        }
      });
    }
    return false;
  });
});

