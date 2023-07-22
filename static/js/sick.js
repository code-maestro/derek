const viewSick = async () => {

  const allSickAnimals = await getListing('sickAnimals');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('sickListing');

  allSickAnimals.listing.forEach(sick => {
    htmlSegment = `
     <tr class="justify-content-center" id="${sick.id}">
       <td class="text-center"> ${sick.id} </td>
       <td class="text-center"> ${sick.ANIMAL_TAG} </td>
       <td class="text-center"> ${sick.DISEASE} </td>
       <td class="text-center"> ${dateFrontend(sick.reported_date)} </td>
       <td class="text-center"> ${sick.VET_NAME} </td>
       <td class="text-center"> ${dateFrontend(sick.appointment_date)} </td>
       <td class="text-center"> ${sick.confirmed} </td>

       <td class="text-center nopnt" data-bs-target="#editSickModalToggle" data-bs-toggle="modal"  onclick="viewSickDetails('${sick.id}')">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
           <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
         </svg>
       </td>

       <td class="text-center nopnt" data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="sendData('sickAnimal', '${sick.id}', '${sick.ANIMAL_TAG}')">
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
  const signss = document.getElementById("edit-ss-text");
  const appointment_date = document.getElementById("edit-appointment_date");
  const appointment_time = document.getElementById("edit-appointment_time");
  const confirm_btn = document.getElementById("confirm_btn");

  let the_sick = await getListing('editSickAnimals');

  the_sick.listing.every(sick => {

    if (sick.id == param) {
      animal_tag.setAttribute("value", sick.ANIMAL_TAG);
      animal_id.setAttribute("value", sick.id);
      report_date.setAttribute("value", formatDate(sick.reported_date));
      document.getElementById("edit-disease-suspected").innerText = sick.DISEASE;
      document.getElementById("edit-disease-suspected").setAttribute("value", sick.disease_id);
      signss.innerText = sick.SS;
      document.getElementById("edit-vets").innerText = sick.VET_NAME;
      document.getElementById("edit-vets").setAttribute("value", sick.VET_NAME);
      document.getElementById("update-vet-name").setAttribute("value", sick.VET_NAME);
      document.getElementById("update-vet-mail").setAttribute("value", sick.VET_MAIL);
      appointment_date.setAttribute('value', formatDate(sick.appointment_date));
      appointment_time.setAttribute('value', formatTime(sick.appointment_date));

      if (sick.confirmed == 'Y') {
        // ✅ Set the disabled attribute
        confirm_btn.setAttribute('disabled', "");
      } else {
        confirm_btn.removeAttribute('disabled', "");
      }

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

  const animals = await getListing('healthyAnimals');
  const vets = await getListing('vets');

  let tagListed, vetListed = '';
  let tagList = `<option selected disabled> Choose an Animal Tag ... </option>`;
  let vetList = `<option selected disabled id="update-vet-name" value=0> Choose an Vet ... </option>`;

  const tag_lstd = document.getElementById('healthyList');
  const vet_lstd = document.getElementById('vets-named');

  animals.listing.forEach(animal => {
    tagListed = ` <option id="${animal.id}" value="${animal.id}">  ${animal.animal_tag} </option> `;
    tagList += tagListed;
  });

  vets.listing.forEach(vet => {
    vetListed = ` <option id="${vet.id}" value="${vet.fname + ' ' + vet.lname}">  ${vet.fname + ' ' + vet.lname} </option> `;
    vetList += vetListed;
  });

  tag_lstd.innerHTML = tagList;
  vet_lstd.innerHTML = vetList;

}


// VET DR DATA
const getMoreVetData = async () => {
  // VET DOCTORS NAMES
  const vets = await getListing('vets');
  const animals = await getListing('healthyAnimals');

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

const getAnimalID = async () => {
  // VET DOCTORS NAMES
  const animals = await getListing('healthyAnimals');
  const animalTAG = [];
  const animalID = [];

  const animalTag = document.getElementById('healthyList');

  animals.listing.forEach(animal => {
    animalID.push(animal.animal_id);
    animalTAG.push(animal.id);
  });

  if (animalTAG.includes(Number(animalTag.value))) {
    let getIndex = animalTAG.indexOf(animalTag.value);
    document.getElementById('animal-id').value = animalID.at(getIndex);
  } else {
    console.log('ETF');
  }
}


// GLOBAL DATES VALIDATION
const validateDate = (parameter) => {

  // VALIDATIG DATES
  const currentDate = new Date().toJSON().slice(0, 10);
  const enteredDateFeild = document.getElementById(`${parameter}`);

  // SHOWS TOAST 
  const showClear = (param) => {

    const toastLiveExample = document.getElementById('ttoast');
    const toast = new bootstrap.Toast(toastLiveExample, { delay: 3500 });

    toast.show();

    enteredDateFeild.value = "";

  }

  const enteredDate = new Date(`${enteredDateFeild.value}`).toJSON().slice(0, 10);

  if (parameter == 'reportedDate') {
    currentDate >= enteredDate ? console.log(enteredDate) : showClear("Please Select a date less than today ");
  } else {
    currentDate >= enteredDate ? showClear("Please Select a date greater than today") : console.log(enteredDate);
  }

}


// RECORDING A SICK ANIMAL
async function recordSick() {
  try {

    // post body data 
    const sickData = {
      healthyAnimals: document.getElementById('healthyList').value,
      reportedDate: document.getElementById('reportedDate').value,
      vets_id: document.getElementById('vets-id').value,
      appointment_date: document.getElementById('appointment_date').value,
      suspected_disease: document.getElementById('disease_suspected').value,
      ssText: document.getElementById('ssText').value
    };

    console.log(document.getElementById('disease_suspected'));
    console.log(sickData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(sickData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/addSick`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#addSickModalToggle').modal('hide');
        document.getElementById("sickAnimalForm").reset();

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const sickAnimalForm = document.forms.namedItem("recordSick");
sickAnimalForm.addEventListener("submit", (event) => {

  recordSick();

  event.preventDefault();

},

  false

);

