// Function to get Required data to report a sick animal
const getRequiredData = async () => {
    const diseases = await getListing('diseases');
    const animals = await getListing('healthyAnimals');
    const vets = await getListing('vets');

    let diseaseListed, tagListed, vetListed = '';
    let diseaseList = `<option selected disabled> Select suspected Disease ...</option>`;
    let tagList = `<option selected disabled> Choose an Animal Tag ...</option>`;
    let vetList = `<option selected disabled> Choose an Vet ...</option>`;
  
    const disease_lstd = document.getElementById('disease_suspected');
    const tag_lstd = document.getElementById('healthyList');
    const vet_lstd = document.getElementById('vets-named');
  
    diseases.listing.forEach(disease => {
      diseaseListed = ` <option id="${disease.id}" value="${disease.id}">  ${disease.disease_name} </option> `;
      diseaseList += diseaseListed;
    });
  
    animals.listing.forEach(animal => {
      tagListed = ` <option id="${animal.id}" value="${animal.id}">  ${animal.animal_tag} </option> `;
      tagList += tagListed;
    });
  
    vets.listing.forEach(vet => {
      vetListed = ` <option id="${vet.id}" value="${vet.fname + ' ' + vet.lname}">  ${vet.fname + ' ' + vet.lname} </option> `;
      vetList += vetListed;
    });
  
    disease_lstd.innerHTML = diseaseList;
    tag_lstd.innerHTML = tagList;
    vet_lstd.innerHTML = vetList;
  
  }

// VET DR DATA
const getMoreVetData = async () => {
  // VET DOCTORS NAMES
  const vets = await getListing('vets');
  const vetName = document.getElementById('vets-named');

  const vetNames = [];
  const vetStations = [];
  const vetEmails = [];
  const vetPhones = [];
  const vetIDS = [];

  vets.listing.forEach(vet => {
    vetIDS.push(vet.vet_id)
    vetNames.push(vet.fname + ' ' + vet.lname)
    vetStations.push(vet.station);
    vetEmails.push(vet.email);
    vetPhones.push(vet.phone);
  });


  if (vetNames.includes(vetName.value)) {
    let getIndex = vetNames.indexOf(vetName.value);
    document.getElementById('vets-id').value = vetIDS.at(getIndex);
    
    console.log(vetIDS.at(getIndex));

    document.getElementById('vets-hospital').value = vetStations.at(getIndex);
    document.getElementById('vets-email').value = vetEmails.at(getIndex);
    document.getElementById('vets-phone').value = vetPhones.at(getIndex);
  } else {
    console.log('ETF');
  }

}

const validateDate = (param) => {
  // VALIDATIG DATES
  const currentDate = new Date().toJSON().slice(0, 10);
  const enteredDateFeild = document.getElementById(`${param}`);

  const enteredDate = new Date(`${enteredDateFeild.value}`).toJSON().slice(0, 10);

  var toastLiveExample = document.getElementById('ttoast');
  var toast = new bootstrap.Toast(toastLiveExample, { delay: 2000 });

  const showClear = (param) => {
    toast.show();
    enteredDateFeild.value = "";
    document.getElementById('err_msg').innerText = param
  }

  if (param == 'reportedDate') {
    currentDate >= enteredDate ? console.log(enteredDate): showClear("Please Select a date less than today ");
  } else {
    currentDate >= enteredDate ? showClear("Please Select a date greater than today") : console.log(enteredDate);
  }

}