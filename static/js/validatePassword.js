const validatePassword = async () => {

  // e.preventDefault();

  const password1 = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  console.log("PASSWORD 1" + " " + password1 + "  PASSWORD 2  " + "  " + password2);

  if (password1 !== password2) {
    document.getElementById('password2').value = "";
  } else {

    // JSON for database
    const auth_data = {
      username: password1,
      password: password2
    }

    // POST TO SERVER
    fetch('/testPost', {
      method: "POST",
      body: JSON.stringify(auth_data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(
        response => response.json()
      )
      .then(
        json => handleSuccess(json)
      )
      .catch(
        err => console.log(err)
      );


  }

}

const handleSuccess = (json) => {
  console.log(json);
}