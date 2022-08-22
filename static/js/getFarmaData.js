// Get data from backend endpoint
async function getFarmaData() {
  let url = '/getFarmaData';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderFarmaData() {
  let farma = await getFarmaData();
  document.getElementById("validationCustom01").setAttribute('value', farma.mail);
  document.getElementById("validationCustom02").setAttribute('value', farma.first_name);
  document.getElementById("validationCustom03").setAttribute('value', farma.last_name);
  document.getElementById("validationCustom04").setAttribute('value', farma.phone);
  document.getElementById("validationCustom05").setAttribute('value', farma.password);
}

// renderFarmaData();