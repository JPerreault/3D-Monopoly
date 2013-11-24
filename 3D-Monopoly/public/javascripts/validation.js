

  function validateUpdate(form){
    if($('#userpass').val() != "" && $('#userpass').val() == $('#password_repeat').val()) {
      if(!checkPassword(form.userpass.value)) {
        $('#userpass').after("<span class="error"> Password should be 6 characters and contain at least 1 capital letter and number</span>");
        form.userpass.focus();
        return false;
      }
    }
    else {
      $('#password_repeat').after('<span class="error"> Password does not match above. Check your spelling and try again</span>');
      form.password_repeat.focus();
      return false;
    }
    return true;
  }

