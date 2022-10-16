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

const renderFarma = async () => {

  let farma_data = await getFarmaData();

  console.log(farma_data);
  
  farma_data.farma.forEach(f => {
    document.getElementById("validation01").setAttribute('value', f.first_name == null ? "" : f.first_name);
    document.getElementById("validation02").setAttribute('value', f.last_name == null ? "" : f.last_name);
    document.getElementById("validation03").setAttribute('value', f.phone == null ? "" : f.phone);
    document.getElementById("validation04").setAttribute('value', f.mail == null ? "" : f.mail);

  });

}