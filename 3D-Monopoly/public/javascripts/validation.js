function checkPassword(str)
  {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return re.test(str);
  }


  function validateForm(form)
  {
    var re = /^\w+$/;
    if(!re.test(form.username.value)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
      form.username.focus();
      return false;
    }
    
    if(form.userquestion.value == "0"){
      alert("Please select a security question.");
      form.securityquestion.focus();
      return false;
    }
    if(!re.test(form.useranswer.value)) {
      alert("Error: Security answer must contain only letters, numbers and underscores!");
      form.username.focus();
      return false;
    }
    if(form.userpass.value != "" && form.userpass.value == form.password_repeat.value) {
      if(!checkPassword(form.userpass.value)) {
        alert("The password you have entered is not valid!");
        form.userpass.focus();
        return false;
      }
    } else {
      alert("Error: Please check that you've entered and confirmed your password!");
      form.userpass.focus();
      return false;
    }
    return true;
  }

