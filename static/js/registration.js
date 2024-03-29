
const validatePassword = async (pwd, cpwd) => {

  const password1 = document.getElementById(`${pwd}`).value;
  const password2 = document.getElementById(`${cpwd}`).value;

  console.log("PASSWORD 1" + " " + password1 + "  PASSWORD 2  " + "  " + password2);

  if (password1 !== password2) {

    document.getElementById(`${cpwd}`).value = "";

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
      some.innerText = "Passwords do not match!";

      return false;

    } else {

      success = true;

    }

  }
  
  success ? registerFarma() : console.log("FALSE");

}


// FUNCTION TO CALL API END POINT TO REGISTER FARMA
async function registerFarma() {

  try {
    // post body data
    const farmaData = {
      fname: document.getElementById('first-name').value,
      lname: document.getElementById('last-name').value,
      mail: document.getElementById('email').value,
      phone: document.getElementById('phone-number').value,
      pass: document.getElementById('password2').value
    };

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(farmaData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/register-farma`, options);

    if (!response.ok) {

      console.log(`HTTP error status: ${response.status}`);
      console.log(`HTTP error: ${response.message}`);

    } else {

      const data = await response.json();

      if (data.status == 200) {

        document.getElementById("err").innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong> ${data.message}!</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        document.getElementById("uuid").setAttribute("value", data.user_id);

        const myModal = new bootstrap.Modal('#OTP');
        myModal.show();

        const modalToggle = document.getElementById('OTP');
        myModal.show(modalToggle);

      } else if (data.status == 400) {

        document.getElementById("err").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong> ${data.message}!</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
      } else {

        document.getElementById("err").innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong> ${data.message}!</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
      }

    }

  }

  catch (error) {
    console.log(`${error}`);
  }

}


// Function to call api end point to fetch and Authenticate OTP
async function verifyOTP(id1, id2) {

  try {
    // query parameters
    const code = document.getElementById(`${id1}`).value;
    const userId = document.getElementById(`${id2}`).value == null ? localStorage.getItem('das_id') : document.getElementById(`${id2}`).value;

    // request options
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/verify-otp?code=${code}&userId=${userId}`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      if (data.status == 200) {

        if (id1 === 'confirm_otp') {

          document.getElementById("otp-msg").innerText = ` ${data.message} ! `;
          window.location.href = `/selection`;

        } else {

          document.getElementById('correctOTP').style.display = "block";
          document.getElementById('thee_otp').setAttribute('readonly', true);

        }

      } else if (data.status == 400) {

        document.getElementById("otp-msg").innerText = ` ${data.message} ! `;

      } else {

        document.getElementById("otp-msg").innerText = ` ${data.message} ! `;

      }

    }

  }

  catch (error) {
    console.log(`${error}`);
  }

}


const OTP_FORM = document.forms.namedItem("OTP-FORM");
OTP_FORM.addEventListener("submit", (event) => {
  verifyOTP('confirm_otp','uuid');
  event.preventDefault();
},

  false

);

