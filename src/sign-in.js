let signInButton = document.getElementById('signIn');
let createAccountButton = document.getElementById('createAccount');

createAccountButton.addEventListener("click", async ()=>{
    let username = document.getElementById("SUUsername").value;
    let password = document.getElementById("SUPassword").value;
    const response = await fetch('/sign-up', {
      method: 'POST',
      body: JSON.stringify({
          username: username,
          password: password
      })
    });
    if (response.status === 200){
      document.getElementById('accountLabel').innerHTML="Account successfully created.";
    }
    else{
      document.getElementById('accountLabel').innerHTML="Cannot use this username.";
    }
  });

  function SIFunction() {
    var x = document.getElementById("SIPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function SUFunction() {
    var x = document.getElementById("SUPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
