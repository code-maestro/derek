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
  document.getElementById("validation01").setAttribute('value', farma.first_name);
  document.getElementById("validation02").setAttribute('value', farma.last_name);
  document.getElementById("validation03").setAttribute('value', farma.phone);
  document.getElementById("validation04").setAttribute('value', farma.mail);
  document.getElementById("validation05").setAttribute('value', farma.password);
}

// renderFarmaData();