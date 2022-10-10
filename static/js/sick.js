const viewSick = async () => {

  const allSickAnimals = await getListing('sickAnimals');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('sickListing');

  allSickAnimals.listing.forEach(sick => {

    const REPORTED_DATE = new Date(Date.parse(sick.reported_date));
    const APPOINTMENT_DATE = new Date(Date.parse(sick.appointment_date));

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    htmlSegment = `
     <tr class="justify-content-center" id="${sick.id}">
       <td class="text-center"> ${sick.id} </td>
       <td class="text-center"> ${sick.ANIMAL_TAG} </td>
       <td class="text-center"> ${sick.DISEASE} </td>
       <td class="text-center"> ${REPORTED_DATE.toLocaleDateString(undefined, options)} </td>
       <td class="text-center"> ${sick.VET_NAME} </td>
       <td class="text-center"> ${APPOINTMENT_DATE.toLocaleDateString(undefined, options)} </td>
       <td class="text-center"> ${sick.confirmed} </td>

       <td class="text-center noprint" data-bs-target="#editSickModalToggle" data-bs-toggle="modal"  onclick="viewSickDetails('${sick.id}')">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
           <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
         </svg>
       </td>

       <td class="text-center noprint" onclick="deleteFromList('sickAnimal', '${sick.id}')">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
           <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
         </svg>
       </td>

     </tr>
 `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}



// Editing veterinary
async function viewSickDetails(param) {
  const animal_tag = document.getElementById("edit-sick-animal-tag");
  const animal_id = document.getElementById("edit-sick-animal-id");
  const report_date = document.getElementById("edit-reported-date");
  // const disease = document.getElementById("edit-disease-suspected");
  const signss = document.getElementById("edit-ss-text");
  // const vet_name = document.getElementById("edit-vet-name");
  const vet_id = document.getElementById("edit-vet-id");
  const appointment_date = document.getElementById("edit-appointment_date");
  const appointment_time = document.getElementById("edit-appointment_time");
  const confirmed = document.getElementById("update-confirmed");

  // TODO implement just after fixing query 
  let the_sick = await getListing('editSickAnimals');

  console.log(vet_name);

  the_sick.listing.every(sick => {

    if (sick.id == param) {

      animal_tag.setAttribute("value", sick.ANIMAL_TAG);
      animal_id.setAttribute("value", sick.id)
      report_date.setAttribute("value", formatDate(sick.reported_date));
      disease.innerText = sick.DISEASE;
      signss.innerText = sick.SS;
      vet_name.innerText = sick.VET_NAME;
      vet_id.innerText = sick.vet_id;
      appointment_date.setAttribute('value', formatDate(sick.appointment_date));
      appointment_time.setAttribute('value', formatTime(sick.appointment_date));
      confirmed.innerText = sick.confirmed ? 'YES'  : 'NO';

      return false;

    } else {

      console.log("💐💐💐💐💐");

    }

    return true;

  });

}

// Function to farmat the dates for html form
const formatDate = (param) => {

  // Create a date object from a date string
  const date = new Date(param);

  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  const formattedDate = year + "-" + month + "-" + day;

  return formattedDate;

}

// Function to farmat the dates for html form

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

// 👇️ Format Date as yyyy-mm-dd hh:mm:ss
const formatTime = (param) => {
  const the_date = new Date(param)
  return (
    [
      padTo2Digits(the_date.getHours()),
      padTo2Digits(the_date.getMinutes()),
      padTo2Digits(the_date.getSeconds()),  // 👈️ can also add seconds
    ].join(':')
  );
}



// Function to get Required data to report a sick animal
const getRequiredData = async () => {
  const diseases = await getListing('diseases');
  const animals = await getListing('healthyAnimals');
  const vets = await getListing('vets');

  let diseaseListed, tagListed, vetListed = '';
  let diseaseList = `<option selected disabled id='default-sick'> Select suspected Disease ... </option>`;
  let tagList = `<option selected disabled> Choose an Animal Tag ... </option>`;
  let vetList = `<option selected disabled id="update-vet-name"> Choose an Vet ... </option>`;

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

// Function to get Required data to report a sick animal
const getUpdateData = async () => {
  const diseases = await getListing('diseases');
  const vets = await getListing('vets');

  let diseaseListed, tagListed, vetListed = '';
  let diseaseList = `<option selected id="edit-disease-suspected"  value=""></option> <option selected id="edit-disease-suspected"  value=""></option> `;
  let tagList = `<option selected disabled> Choose an Animal Tag ... </option>`;
  let vetList = `<option selected id="edit-vet-name"  value=""></option> `;

  const disease_lstd = document.getElementById('edit-disease_s');
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

// GLOBAL DATES VALIDATION
const validateDate = (param) => {
  // VALIDATIG DATES
  const currentDate = new Date().toJSON().slice(0, 10);
  const enteredDateFeild = document.getElementById(`${param}`);

  const enteredDate = new Date(`${enteredDateFeild.value}`).toJSON().slice(0, 10);

  const toastLiveExample = document.getElementById('ttoast');
  const toast = new bootstrap.Toast(toastLiveExample, { delay: 2000 });

  const showClear = (param) => {
    toast.show();
    enteredDateFeild.value = "";
    document.getElementById('err_msg').innerText = param
  }

  if (param == 'reportedDate') {
    currentDate >= enteredDate ? console.log(enteredDate) : showClear("Please Select a date less than today ");
  } else {
    currentDate >= enteredDate ? showClear("Please Select a date greater than today") : console.log(enteredDate);
  }

}
