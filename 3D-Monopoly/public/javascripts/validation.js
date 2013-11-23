function checkPassword(str)
  {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return re.test(str);
  }


  function validateForm(form)
  {
    var re = /^\w+$/;
    if(!re.test(form.username.value)) {
      $('#username').after('<span class="error"> Username must contain only letters, numbers and underscores!</span>');
      form.username.focus();
      return false;
    }
    if(form.userpass.value != "" && form.userpass.value == form.password_repeat.value) {
      if(!checkPassword(form.userpass.value)) {
         $('#userpass').after('<span class="error"> Password should be 6 characters and contain at least 1 capital letter and number</span>');
        form.userpass.focus();
        return false;
      }
    } else {
      $('#password_repeat').after('<span class="error"> Password does not match above. Check your spelling and try again</span>');
      form.userpass.focus();
      return false;
    }
    return true;
  }

  function validateUpdate(form){
    if(form.userpass.value != "" && form.userpass.value == form.password_repeat.value) {
      if(!checkPassword(form.userpass.value)) {
        alert("The password you have entered is not valid!");
        form.userpass.focus();
        return false;
      }
    }
    else {
      alert("Error: Please check that you've entered and confirmed your password!");
      form.userpass.focus();
      return false;
    }
    return true;
  }

