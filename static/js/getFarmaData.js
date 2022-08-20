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
  
  if (![false, 0, "", null, undefined, NaN].includes(farma)) {
    const details = JSON.parse(JSON.stringify(farma));
    details.forEach(detail => {
      document.getElementById("validationCustom01").value = detail.first_name;
      document.getElementById("validationCustom02").value = detail.last_name;
      document.getElementById("validationCustom03").value = detail.email;
      document.getElementById("validationCustom04").value = detail.password;
      document.getElementById("validationCustom02").value = detail.last_name;
    });
  } else {
    return null;
  }
}

renderFarmaData();