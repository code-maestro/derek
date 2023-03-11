async function authenticateUser() {
  try {

    // post body data 
    const userCredentials = {
      mail: document.getElementById('email').value,
      pass: document.getElementById('password').value
    };

    console.log(userCredentials);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/authenticate`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      setTimeout(lala(data.url), 3000);

      function lala(param) {
        if (param === 'error') {
          document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password`;
        }
        else {
          document.getElementById("wrongCredentials").innerText = `Successful Login`;
          window.location.href = param;
        }
      }

    }

  }

  catch (error) {

    console.log(`${error}`);

  }

}
