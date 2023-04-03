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

      console.log(`WRONG EMAIL: ${response.json()}`);

    } else {

      const data = await response.json();

      console.log(data);

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


// FUNCTION TO CALL API END POINT TO REGISTER FARMA
async function sendOTP() {

  try {
    // post body data
    const resetData = {
      mail: document.getElementById('reset-email').value
    };

    console.log(resetData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(resetData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/send_reset_otp`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status} + ${response.message}`);

    } else {

      const data = await response.json();

      if (data.status == 200) {

        console.log(data.message);

        // document.getElementById("errOTP").innerHTML = `
        // <div class="alert alert-success alert-dismissible fade show" role="alert">
        //   <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        //   <strong> ${data.message}!</strong>
        //   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        // </div>`;

        const myModal = new bootstrap.Modal('#newPwdModalToggle');
        myModal.show();
        const modalToggle = document.getElementById('newPwdModalToggle');
        myModal.show(modalToggle);

      } else if (data.status == 400) {

        console.log(data.message);

        // document.getElementById("errOTP").innerHTML = `
        // <div class="alert alert-danger alert-dismissible fade show" role="alert">
        //   <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        //   <strong> ${data.message}!</strong>
        //   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        // </div>`;

      } else {

        console.log(data.message);

        // document.getElementById("errOTP").innerHTML = `
        // <div class="alert alert-warning alert-dismissible fade show" role="alert">
        //   <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
        //   <strong> ${data.message}!</strong>
        //   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        // </div>`;

      }

    }

  }

  catch (error) {
    console.log(error);
    console.log("error");
  }

}
