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
  console.log(farma);
  document.getElementById("validationCustom01").value = farma.first_name;
  document.getElementById("validationCustom02").value = farma.last_name;
  document.getElementById("validationCustom03").setAttribute('value', farma.mail);
  document.getElementById("validationCustom04").value = farma.mail;
}

// renderFarmaData();