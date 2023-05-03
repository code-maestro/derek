// Get data from backend endpoint
async function getFarmaData() {
  let url = '/getFarma';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


const showFarma = async () => {
  let farma_data = await getFarmaData();

  console.log(farma_data.farma[0].first_name);
  console.log(farma_data.farma[0].last_name);
  document.getElementById("farma-details").innerText = farma_data.farma[0].first_name + "  " + farma_data.farma[0].last_name;

  // farma_data.farma.forEach(f => {
  //   document.getElementById("farma-details").innerText = f.first_name + "  " + f.last_name;
  // });
}

showFarma();


const renderFarma = async () => {

  let farma_data = await getFarmaData();

  farma_data.farma.forEach(f => {

    document.getElementById("validation01").setAttribute('value', f.first_name == null ? "" : f.first_name);
    document.getElementById("validation02").setAttribute('value', f.last_name == null ? "" : f.last_name);
    document.getElementById("validation03").setAttribute('value', f.phone == null ? "" : f.phone);
    document.getElementById("validation04").setAttribute('value', f.mail == null ? "" : f.mail);

  });

}


// Function Adding new Animal
async function updateFarma() {
  try {
    // post body data 
    const profileData = {
      mail: document.getElementById('validation04').value,
      fname: document.getElementById('validation01').value,
      lname: document.getElementById('validation02').value,
      phone: document.getElementById('validation03').value
    };

    console.log(profileData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(profileData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/updateFarma`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#offcanvasRight').offcanvas('hide');

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const profileForm = document.forms.namedItem("updateFarmaProfileForm");
profileForm.addEventListener("submit", (event) => {

  updateFarma();

  event.preventDefault();

},

  false

);
