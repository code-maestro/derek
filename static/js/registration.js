
const validatePassword = async () => {

  const password1 = document.getElementById('pass').value;
  const password2 = document.getElementById('pass2').value;

  console.log("PASSWORD 1" + " " + password1 + "  PASSWORD 2  " + "  " + password2);

  if (password1 !== password2) {

    document.getElementById('pass2').value = "";

  }

}


// Form validation
function validateForm() {

  const fields = ["fname", "lname", "mail", "phone", "password", "password2"];

  let success = false;

  for (const field of fields) {

    let x = document.forms["myForm"][`${field}`].value;

    if (x == "") {

      const some = document.getElementById(`${field}`);
      some.classList.remove("alerts");
      some.innerText = "lorddd";

      return false;

    } else {

      success = true;

    }

  }

  console.log(success);
  success ? registerFarma() : console.log("FALSE");

}



async function registerFarma() {

  try {
    // post body data
    const farmaData = {
      fname: document.getElementById('first-name').value,
      lname: document.getElementById('last-name').value,
      mail: document.getElementById('email').value,
      phone: document.getElementById('phone-number').value,
      pass: document.getElementById('pass2').value
    };
    console.log("lalal22");
    console.log(farmaData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(farmaData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/testPost`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();
      console.log("lalal33");
      console.log(data);
      
  // const myModal = new bootstrap.Modal('#OTP');
  // myModal.show();

  // const modalToggle = document.getElementById('OTP');
  // myModal.show(modalToggle);

      // setTimeout(lala(data.url), 3000);

      // function lala(param) {
      //   if (param === 'error') {
      //     document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password`;
      //   }
      //   else {
      //     document.getElementById("wrongCredentials").innerText = `Successful Login`;
      //     window.location.href = param;
      //   }
      // }

    }

  }

  catch (error) {
    console.log(`${error}`);
  }

}
