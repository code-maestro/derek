async function authenticateUser() {
  try {

    // post body data 
    const userCredentials = {
      mail: document.getElementById('email').value,
      pass: document.getElementById('password').value
    };

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

      setTimeout(lala(data.url), 3000);

      function lala(param) {
        if (param === 'error') {
          document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password ! `;
        }
        else {
          document.getElementById("wrongCredentials").innerText = ` LOGGED IN SUCCESSFULLY ! `;
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

        $('#pwdResetModalToggle').modal('hide');

        document.getElementById("login-form").reset();

        const myModal = new bootstrap.Modal('#newPwdModalToggle');
        myModal.show();

        document.getElementById('thee_user_id').setAttribute("value", `${data.user_id}`);
        localStorage.setItem('das_id', `${data.user_id}`);

      } else if (data.status == 400) {

        console.log(data.message);

      } else {

        console.log(data.message);

      }

    }

  }

  catch (error) {
    console.log("error");
    console.log(error);
  }
}


async function recordPassword() {

  try {

    // post body data 
    const newPasswords = {
      USER_ID: document.getElementById('thee_user_id').value,
      NEW_PASSWORD: document.getElementById('reset-pass2').value
    };

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(newPasswords),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/recordNewPassword`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      if (data.status == 200) {

        document.getElementById("correctOTP").reset();
        $('#newPwdModalToggle').modal('hide');
        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;

      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }


}

const newBreedForm = document.forms.namedItem("correctOTP");
newBreedForm.addEventListener("submit", (event) => {

  recordPassword();

  event.preventDefault();

},

  false

);

