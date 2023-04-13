const browserUrl = window.location.href;
const today = new Date(Date.now());

const form = document.getElementById('registrationForm');
const container = document.querySelector('#dynamic');

// GOHOME
const gohome = async () => {
  window.location.replace(" http://localhost:4200/home");
}


// Getting all listings from backend
async function getListing(param) {
  let url = `/getListing/${param}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Checking whether animal's vaccination is confirmed
async function isConfirmed(param) {
  let url = `/isConfirmed?id=${param}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting schedule listings from backend
async function getScheduleListing(type, id) {
  try {
    // request options
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let res = await fetch(`/getScheduleListing?type=${type}&id=${id}`, options);

    return await res.json();

  } catch (error) {

    console.log(error);

  }

}


// Getting new born animal to verify from backend
async function verifiedAnimal(param) {
  let url = `/verifyAnimal/${param}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting all animals listings from backend
async function getMaxId(param) {
  let url = `/getMaxId/${param}`;
  try {
    let res = await fetch(url);

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// FOR REGISTERED ANIMALS MODAL
// Table data for all animals
async function getAnimalTableData(inputID) {

  let last = await getMaxId('animal_id');

  document.getElementById(`${inputID}`).setAttribute('value', `${last.animalType.toUpperCase()}-000${last.last_id}`);


  if (inputID === 'new-born-tag') {

    let listed = await getListing('expectingToday');

    console.log(listed);

    let heavyListed = '';
    let heavyList = `<option selected disabled value=""> Choose a Parent Animal ... </option>`;

    const heavy_lstd = document.getElementById('parent-tag');

    listed.listing.forEach(heavy => {
      heavyListed = ` <option id="${heavy.id}" value="${heavy.animal_tag}">  ${heavy.animal_tag} </option> `;
      heavyList += heavyListed;
    });

    heavy_lstd.innerHTML = heavyList;

  }

  else {

    let list = await getListing('allAnimals');

    let html = "";
    let htmlSegment = "";

    const con = document.getElementById('animalListing');

    list.listing.forEach(animal => {

      const dobYear = new Date(Date.parse(animal.dob));
      const regDate = new Date(Date.parse(animal.reg_date));

      // AGE CALCULATION
      const ageYears = today.getFullYear() - dobYear.getFullYear();
      const ageMonths = today.getMonth() - dobYear.getMonth();
      // const ageDays = today.getDay() - dobYear.getDay();
      const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

      htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
          
          <td class="text-center nopnt" data-bs-target="#editAnimalModal" data-bs-toggle="modal"  onclick="editAnimal(${animal.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </td>

          <td class="text-center nopnt" data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="sendData('animal', '${animal.id}', '${animal.animal_tag}')">
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

}


// Function to get All feeds
const getFeedsTableData = async () => {

  const feedsData = await getListing('feeds');

  let html = "";
  let htmlSegment = "";

  const con = document.getElementById('feedsListing');

  feedsData.listing.forEach(feed => {
    htmlSegment = `
        <tr class="justify-content-center" id="${feed.id}">
          <td class="text-center"> ${feed.id} </td>
          <td class="text-center"> ${feed.name} </td>
          <td class="text-center"> ${feed.description} </td>
          <td class="text-center"> ${feed.quantity + ' ' + feed.measure} </td>
          <td class="text-center"> ${dateFrontend(feed.stock_date)} </td>
          <td class="text-center"> ${dateFrontend(feed.expected_restock_date)} </td>
          
          <td class="text-center nopnt" data-bs-target="#editFeedsModalToggle" data-bs-toggle="modal"  onclick="editFeed(${feed.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </td>
          
          <td class="text-center nopnt"  data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="deleteFromList('feed', '${feed.id}', '${feed.name}')">
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


// Function to get All feeds
const getFeedsListData = async () => {

  const feedsData = await getListing('feeds');

  let last = await getMaxId('timetable_id');

  document.getElementById("timetableTitle").setAttribute('value', `${last.animalType.toUpperCase()}-000${last.last_id}`);

  let listed = '';
  let forlist = `<option selected disabled> Choose a Feed ...</option>`;

  const lstd = document.getElementById('feedList');

  feedsData.listing.forEach(feed => {
    listed = ` <option id="${feed.id}" value="${feed.name}">  ${feed.name} </option> `;
    forlist += listed
  });

  lstd.innerHTML = forlist;

  console.log(lstd.value);

}


// Funciton invoked on changes
const getOtherData = async () => {
  const feedsData = await getListing('feeds');
  const names = [];
  const desc = [];
  const numbers = [];
  const math = [];
  const ids = [];

  feedsData.listing.forEach(feed => {
    ids.push(feed.id);
    names.push(feed.name);
    desc.push(feed.description);
    numbers.push(feed.quantity + ' ' + feed.measure);
    math.push(feed.quantity * feed.quantity_measure);
  });

  const lstd = document.getElementById('feedList');

  if (names.includes(lstd.value)) {
    console.log(lstd.value);
    let getIndex = names.indexOf(lstd.value);
    document.getElementById('feeds-description').value = desc.at(getIndex);
    document.getElementById('feeds-quantity').value = numbers.at(getIndex);
    document.getElementById('feeds-quantity-real').value = math.at(getIndex);
    document.getElementById('feeds_id').value = ids.at(getIndex);
  }
}


// Function to get All Diseases
const getAllDiseases = async () => {

  const diseases = await getListing('allDiseases');

  let diseaseListed = '';
  let diseaseList = `<option id="0" selected disabled value=0> Choose a disease ...</option>`;

  const disease_lstd = document.getElementById('disease-name');

  diseases.listing.forEach(disease => {
    diseaseListed = ` <option id="${disease.id}" value="${disease.id}">  ${disease.disease_name} </option> `;
    diseaseList += diseaseListed;
  });

  disease_lstd.innerHTML = diseaseList;

}


// Function to get All feeds
const getAllVaccines = async () => {
  const vaccines = await getListing('availableVaccines');
  const animals = await getListing('allAnimals');
  const vets = await getListing('vets');

  let vaccineListed, tagListed, vetListed = '';
  let vaccineList = `<option selected disabled value=""> Choose a Vaccine ...</option>`;
  let tagList = `<option selected disabled value=""> Choose an Animal Tag ...</option>`;
  let vetList = `<option selected disabled value=""> Choose an Vet ...</option>`;

  const vaccine_lstd = document.getElementById('all-vaccines-name');
  const tag_lstd = document.getElementById('all-animals-tag');
  const vet_lstd = document.getElementById('vet-name');

  vaccines.listing.forEach(vaccine => {
    vaccineListed = ` <option id="${vaccine.id}" value="${vaccine.name}">  ${vaccine.name} </option> `;
    vaccineList += vaccineListed;
  });

  animals.listing.forEach(animal => {
    tagListed = ` <option id="${animal.id}" value="${animal.id}">  ${animal.animal_tag} </option> `;
    tagList += tagListed;
  });

  vets.listing.forEach(vet => {
    vetListed = ` <option id="${vet.id}" value="${vet.fname + ' ' + vet.lname}">  ${vet.fname + ' ' + vet.lname} </option> `;
    vetList += vetListed;
  });

  vaccine_lstd.innerHTML = vaccineList;
  tag_lstd.innerHTML = tagList;
  vet_lstd.innerHTML = vetList;

}


// Funciton invoked on changes
const getOtherVaccineData = async () => {

  const vaccines = await getListing('availableVaccines');

  const vaxName = document.getElementById('all-vaccines-name');

  const vaxIds = [];
  const vaxNames = [];
  const vaxCycles = [];

  // PUSHING TO VACCINES ARRAY
  vaccines.listing.forEach(vaccine => {

    const vax_period = vaccine.period == 1 ? "a day" : vaccine.period == 7 ? "a week" : vaccine.period == 30 ? "a month" : "a year";
    const vax_cycle = vaccine.cycle == 1 ? "once" : vaccine.cycle == 2 ? "twice" : `${vaccine.cycle} times`;

    vaxIds.push(vaccine.id);
    vaxNames.push(vaccine.name);
    vaxCycles.push(vax_cycle + ' ' + vax_period);

  });

  if (vaxNames.includes(vaxName.value)) {
    let getIndex = vaxNames.indexOf(vaxName.value);
    document.getElementById('vaxID').value = vaxIds.at(getIndex);
    document.getElementById('cycle-vaccinations').value = vaxCycles.at(getIndex);
  }

}


// VET DR DATA
const getOtherVetData = async () => {
  // VET DOCTORS NAMES
  const vets = await getListing('vets');
  const vetName = document.getElementById('vet-name');

  const vetNames = [];
  const vetStations = [];
  const vetEmails = [];
  const vetPhones = [];
  const vetIds = [];

  vets.listing.forEach(vet => {
    vetIds.push(vet.vet_id);
    vetNames.push(vet.fname + ' ' + vet.lname)
    vetStations.push(vet.station);
    vetEmails.push(vet.email);
    vetPhones.push(vet.phone);
  });

  if (vetNames.includes(vetName.value)) {
    let getIndex = vetNames.indexOf(vetName.value);
    document.getElementById('vetID').value = vetIds.at(getIndex);
    document.getElementById('vet-hospital').value = vetStations.at(getIndex);
    document.getElementById('vet-email').value = vetEmails.at(getIndex);
    document.getElementById('vet-phone').value = vetPhones.at(getIndex);
  }

}


// Function invoked on changes
const getTimetables = async () => {

  const timetables = await getListing('timetables');

  console.log("timetables");
  console.log(timetables);

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('feedingTimetableListing');

  timetables.listing.forEach(timetable => {

    htmlSegment = `
    <tr class="justify-content-center" id="${timetable.id}">
      <td class="text-center"> ${timetable.id} </td>   
      <td class="text-center"> ${timetable.cycle} </td> 
      <td class="text-center"> ${timetable.quantity_per_cycle} ${timetable.quantity_per_cycle_unit}  </td>
      <td class="text-center"> ${timetable.quantity} ${timetable.quantity_unit}  </td>
      <td class="text-center"> ${dateFrontend(timetable.first_feed_date)} </td> 

      <td class="text-center nopnt" data-bs-target="#generatedModalToggle" data-bs-toggle="modal"  onclick="viewSchedule('feeding','${timetable.tt_id}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
          <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
        </svg>
      </td>

      <td class="text-center nopnt" data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="sendData('timetable', '${timetable.id}', '${timetable.tt_name}')" >
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


// Function to get available vaccines
//  onclick="deleteFromList('vaccine', '${vaccine.id}')">
const getAvailableVaccines = async () => {

  const vaccines = await getListing('availableVaccines');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('availableVaccinesListing');

  vaccines.listing.forEach(vaccine => {
    htmlSegment = `
    <tr class="justify-content-center" id="${vaccine.id}">
      <td class="text-center"> ${vaccine.id} </td>
      <td class="text-center"> ${vaccine.name} </td>
      <td class="text-center"> ${vaccine.description} </td>
      <td class="text-center"> ${vaccine.quantity + ' ' + vaccine.measure} </td>
      <td class="text-center"> ${vaccine.frequency} </td>
      <td class="text-center"> ${vaccine.qnty_per_cycle + ' ' + vaccine.measure_per_cycle} </td>
      <td class="text-center"> ${vaccine.injection_area} </td>

      <td class="text-center nopnt" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="sendData('vaccine', '${vaccine.id}', '${vaccine.name}')" >
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


// Function to get available vaccines
const getPendingVaccinations = async () => {

  const vaccinated = await getListing('pendingAnimals');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('pendingAnimalsListing');

  vaccinated.listing.forEach(vaxed => {

    htmlSegment = `
      <tr class="justify-content-center" id="${vaxed.id}">
        <td class="text-center"> ${vaxed.id} </td>
        <td class="text-center"> ${vaxed.animal_tag} </td>
        <td class="text-center"> ${dateFrontend(vaxed.first_date)} </td>
        <td class="text-center"> ${vaxed.no_of_vaccinations} </td>

        <td class="text-center nopnt" onclick="scheduleConfirm(${vaxed.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
          </svg>
        </td>

        <td class="text-center nopnt" data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="deleteFromList('vaccination_details', '${vaxed.id}')">
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


// Function to get available vaccines
const getFullyVaccinated = async () => {

  const vaccinated = await getListing('fullyVaxedAnimals');

  console.log(vaccinated);

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('vaccinatedListing');

  vaccinated.listing.forEach(vaxed => {
    htmlSegment = `
    <tr class="justify-content-center" id="${vaxed.id}">
      <td class="text-center"> ${vaxed.id} </td>
      <td class="text-center"> ${vaxed.animal_tag} </td>
      <td class="text-center"> ${vaxed.name} </td>
      <td class="text-center"> ${vaxed.disease_name} </td>
      <td class="text-center"> ${vaxed.no_of_vaccinations} </td>
      <td class="text-center"> ${dateFrontend(vaxed.first_date)} </td>
      <td class="text-center"> ${dateFrontend(vaxed.last_date)} </td>
    </tr>
  `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}


// Funciton to retrieve vets listing
const getVets = async () => {
  const vets = await getListing('vets');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('vetsListing');

  vets.listing.forEach(vet => {
    htmlSegment = `
    <tr class="justify-content-center" id="${vet.vet_id}">
      <td class="text-center"> ${vet.id} </td>   
      <td class="text-center"> ${vet.lname + ' ' + vet.fname} </td> 
      <td class="text-center"> ${vet.phone} </td> 
      <td class="text-center"> ${vet.email} </td>
      <td class="text-center"> ${vet.station} </td>

      <td class="text-center nopnt" data-bs-target="#editVetToggle" data-bs-toggle="modal"  onclick="editVet('${vet.vet_id}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
          <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
        </svg>
      </td>

      <td class="text-center nopnt" data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="sendData('vet', '${vet.vet_id}', '${vet.lname + ' ' + vet.fname}')">
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


// FRONT END LOGIC FUNCTIONS
// DELETING A TABLE ROW
const deleteFromList = async (param1, param2) => {

  // SHOWS TOAST 
  const showClear = (param) => {
    const toastLiveExample = document.getElementById('ttoast');
    const toast = new bootstrap.Toast(toastLiveExample, { delay: 3500 });

    toast.show();

    console.log(param);

    document.getElementById('error_msg').innerText = param;

  }

  // post body data 
  const user = { id: param2, type: param1 };

  console.log(user);

  const item = {
    name: param1,
    id: param2
  }

  localStorage.setItem('delete', JSON.stringify(item));

  // request options
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(`/delete`, options)
    .then(function (response) {
      if (!response.ok) {

        throw Error(response.statusText);

      } else {

        console.log("😎😎😎😜");
        showClear('Nice, you triggered this alert message');

      }

      return response;

    }).then(function (response) {
      console.log("ok");
      console.log(param1);
      const element = document.getElementById(`${param2}`);
      console.log(element);
      element.remove();

    }).catch(function (error) { console.log(error); });

}


// for deletion
const sendData = async (param1, param2, param3) => {

  const item = {
    name: param1,
    id: param2,
    anon: param3
  }

  localStorage.setItem('delete', JSON.stringify(item));

  document.getElementById("alles").innerHTML = `You're about to delete <strong> ${param3} </strong> <br>`;

}


// DELETING A TABLE ROW
const deletionList = async () => {

  const cat = JSON.parse(localStorage.getItem('delete'));

  console.log(cat);

  console.log(cat.name);
  console.log(cat.id);

  deleteFromList(cat.name, cat.id);

  localStorage.removeItem("delete");

}


// Removes the table card
function deleteFromDom(param) {
  document.getElementById(param + 's').style.backgroundColor = '#fff';
  const element = document.getElementById(param + 'ss');
  element.remove();
  document.querySelector('#dynamic').innerHTML = `
  <div class="col-lg-6">
    <!-- Communication -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary"> Doctor Information </h6>
      </div>
      <div class="card-body" id="docInfo">
        The styling for this basic card example is created by using default Bootstrap
        utility classes. By using utility classes, the style of the card component can
        be easily modified with no need for any custom CSS!
      </div>
    </div>
  </div>

<div class="col-lg-6">
  <!-- Dropdown Card Example -->
  <div class="card shadow mb-4">
      <!-- Card Header - Dropdown -->
        div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
          <div class="dropdown no-arrow">
              <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink">
                  <div class="dropdown-header">Dropdown Header:</div>
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
              </div>
          </div>
      </div>
      <!-- Card Body -->
      <div class="card-body">
          Dropdown menus can be placed in the card header in order to extend the
          functionality of a basic card. In this dropdown card example, the Font Awesome
          vertical
          ellipsis icon in the card header can be clicked on in order to toggle a dropdown
          menu.
      </div>
  </div>

  <!-- Collapsable Card Example -->
  <div class="card shadow mb-4">
      <!-- Card Header - Accordion -->
      <a href="#collapseCardExample" class="d-block card-header py-3"
          data-toggle="collapse" role="button" aria-expanded="true"
          aria-controls="collapseCardExample">
          <h6 class="m-0 font-weight-bold text-primary">Collapsable Card Example</h6>
      </a>
      <!-- Card Content - Collapse -->
      <div class="collapse show" id="collapseCardExample">
          <div class="card-body">
              This is a collapsable card example using Bootstrap's built in collapse
              functionality. <strong>Click on the card header</strong> to see the card
              body collapse and expand!
          </div>
      </div>
  </div>
</div>
  `;
}


// Function to print report
function printReport(param) {
  const hideElements = document.getElementsByClassName('nopnt');

  console.log(hideElements);

  const arr = Array.prototype.slice.call(hideElements);

  arr.map(val => {
    val.style.visibility = 'hidden';
  })

  const tab = document.getElementById(param);
  let style = "<style>";
  style = style + "table {width: 100%; font: 17px Calibri;}";
  style = style + "table, th, td {border: solid 2px #DDD; border-collapse: collapse;";
  style = style + "padding: 2px 3px; text-align: center;}";
  style = style + "</style>";
  const win = window.open('', '', 'height=700,width=700');
  win.document.write(tab.outerHTML);
  win.document.write(style);
  win.document.close();
  win.print();

  arr.map(val => {
    val.style.visibility = 'visible';
  })

}


// Get the HTML div and table elements
function toPDF() {
  const divToPrint = document.getElementById("vaccinesModalToggle");
  const tableToPrint = divToPrint.querySelector("table");

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add the HTML div and table to the PDF document
  doc.fromHTML(divToPrint, 10, 10);
  doc.autoTable({ html: tableToPrint });

  // Save the PDF document
  doc.save("document.pdf");

}


// Function to auto-calculate age
function calculateAge(params) {
  const dobVal = document.getElementById('dob').value;
  const dobYr = new Date(Date.parse(dobVal));

  // AGE CALCULATION
  const age = today - dobYr;

  if (age < 0) {
    alert('Date of Birth should be not in the future');
  } else {
    const ageYrs = today.getFullYear() - dobYr.getFullYear();
    const ageMonths = today.getMonth() - dobYr.getMonth();
    const ageDays = today.getDate() - parseInt(dobVal.slice(8));

    document.getElementById('age-years').value = `${ageYrs > 0 ? ageYrs + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Months' : ''} ${ageDays > 0 ? ageDays + ' Days' : ''}`;

  }
}


// Editing animal and  setting vaccination records
async function editAnimal(param) {
  const editid = document.getElementById("editid");
  const tag = document.getElementById("edit-animal-tag");
  const gender = document.getElementById("edit-genda");
  const dob = document.getElementById("edit-dob");
  const regDate = document.getElementById("edit-registration-date");

  let list = await getListing('allAnimals');
  list.listing.every(v => {
    // const ddate = v.dob;
    // console.log(ddate.toDateString());
    if (v.id == param) {
      editid.setAttribute("value", param)
      tag.setAttribute('value', v.animal_tag);
      gender.innerText = v.gender;
      dob.setAttribute('value', new Date(v.dob).toISOString().slice(0, 10));
      regDate.setAttribute('value', new Date(v.reg_date).toISOString().slice(0, 10));

      return false;
    }
    return true;
  });
}


// Editing animal and  setting vaccination records
async function editFeed(param) {
  const editid = document.getElementById("edit_feeds_id");
  const name = document.getElementById("edit_feeds_name");
  const stock_date = document.getElementById("edit_feeds_stock_date");
  const qnty = document.getElementById("edit_feeds_qnty");
  const qnty_measure = document.getElementById("qm");

  let list = await getListing('feeds');

  list.listing.every(feed => {
    if (feed.id == param) {
      editid.setAttribute("value", param)
      name.setAttribute('value', feed.name);
      qnty.setAttribute('value', feed.quantity);
      qnty_measure.innerText = feed.measure;
      stock_date.setAttribute('value', new Date(feed.stock_date).toISOString().slice(0, 10));

      return false;
    }
    return true;
  });
}


// Conditional Rendering Depending on whether the vaccination was confirmed or not
async function scheduleConfirm(param) {

  const isCon = await isConfirmed(param);

  console.log(isCon);

  if (isCon.status === 400) {

    $('#editPendingModalToggle').modal('show');

  } else {

    const vaccanitionSchedule = await viewSchedule("vaccination", param);

    $('#generatedVaxModalToggle').modal('show');



  }

}


// Editing vaccine
async function editVaccine(param) {
  const editid = document.getElementById("editid");
  const tag = document.getElementById("edit-animal-tag");
  const gender = document.getElementById("edit-gender");
  const dob = document.getElementById("edit-dob");
  const regDate = document.getElementById("edit-registration-date");

  let list = await getListing('allAnimals');
  list.listing.every(v => {
    // const ddate = v.dob;
    // console.log(ddate.toDateString());
    if (v.id == param) {
      editid.setAttribute("value", param)
      tag.setAttribute('value', v.animal_tag);
      gender.innerText = v.gender;
      dob.setAttribute('value', new Date(v.dob).toISOString().slice(0, 10));
      regDate.setAttribute('value', new Date(v.reg_date).toISOString().slice(0, 10));

      return false;
    }
    return true;
  });
}


// Editing veterinary
async function editVet(param) {
  const fname = document.getElementById("edit-vet-fname");
  const lname = document.getElementById("edit-vet-lname");
  const phone = document.getElementById("edit-vet-phone");
  const mail = document.getElementById("edit-vet-mail");
  const station = document.getElementById("edit-vet-station");
  const vet_uuid = document.getElementById("edit-vet-uuid");

  let vets = await getListing('vets');

  console.log("vets");
  console.log(vets);

  vets.listing.every(vet => {

    if (vet.vet_id == param) {
      fname.setAttribute("value", vet.fname);
      lname.setAttribute('value', vet.lname);
      phone.setAttribute("value", vet.phone);
      mail.setAttribute('value', vet.email);
      station.setAttribute('value', vet.station);
      vet_uuid.setAttribute('value', param);

      return false;
    }
    return true;
  });
}


// Function Adding new Animal
async function recordAnimal() {
  try {
    // post body data 
    const animalData = {
      animalTag: document.getElementById('animal-tag').value,
      gender: document.getElementById('gender').value,
      dob: document.getElementById('dob').value,
      regDate: document.getElementById('registration-date').value,
      ageYears: document.getElementById('age-years').value
    };

    console.log(animalData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(animalData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newAnimal`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#registerAnimalModalToggle').modal('hide');
        document.getElementById("registerNewAnimalForm").reset();

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}


const animalForm = document.forms.namedItem("registerAnimalForm");
animalForm.addEventListener("submit", (event) => {

  recordAnimal();

  event.preventDefault();

},

  false

);


// Function Adding new Vaccine
async function recordVaccine() {
  try {

    // post body data 
    const userCredentials = {
      vaccineName: document.getElementById('vaccine-name').value,
      vaccineDesc: document.getElementById('vaccine-description').value,
      diseaseID: document.getElementById('disease-name').value,
      vaccineQuantity: document.getElementById('vaccine-quantity').value,
      quantityMeasure: document.getElementById('quantity-measure').value,
      vaccineCycle: document.getElementById('vaccination-cycle').value,
      vaccinePeriod: document.getElementById('vPeriod').value,
      vaccineQntyPerCycle: document.getElementById('vaccine-qnty-cycle').value,
      qntyMeasurePerCycle: document.getElementById('quantity-measure/cycle').value,
      injectionArea: document.getElementById('injection-area').value
    };

    console.log(userCredentials);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newVaccine`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;

        $('#newVaccineModalToggle').modal('hide');
        document.getElementById("recordNewVaccine").reset();


      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const newForm = document.forms.namedItem("recordVaccine");
newForm.addEventListener("submit", (event) => {

  recordVaccine();

  event.preventDefault();

},

  false

);


// Function Adding new Feed
async function recordFeed() {
  try {
    // post body data 
    const feedData = {
      feeds_name: document.getElementById('feeds_name').value,
      feeds_name: document.getElementById('feeds_name').value,
      feeds_qnty: document.getElementById('feeds_qnty').value,
      feeds_qnty_measure: document.getElementById('feeds_qnty_m').value,
      feeds_stock_date: document.getElementById('feeds_stock_date').value
    };

    console.log(feedData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(feedData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newFeed`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#registerFeedStockModalToggle').modal('hide');
        document.getElementById("recordNewFeed").reset();

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const feedForm = document.forms.namedItem("recordFeed");
feedForm.addEventListener("submit", (event) => {

  recordFeed();

  event.preventDefault();

},

  false

);


// Function Adding new Feed
async function recordEditAnimal() {
  try {
    // post body data 
    const editAnimalData = {
      editAnimalTag: document.getElementById('edit-animal-tag').value,
      editGender: document.getElementById('edit-gender').value,
      editDob: document.getElementById('edit-dob').value,
      editRegDate: document.getElementById('edit-registration-date').value,
      editid: document.getElementById('editid').value
    };

    console.log(editAnimalData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(editAnimalData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/updateAnimalData`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#editAnimalModal').modal('hide');
        $('#registeredAnimalsModalToggle').modal('hide');

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

const updateAnimalForm = document.forms.namedItem("editAnimalForm");
updateAnimalForm.addEventListener("submit", (event) => {

  recordEditAnimal();

  event.preventDefault();

},

  false

);


// Function Adding new Feed
async function recordEditVaccine() {
  try {
    // post body data 
    const editAnimalData = {
      editAnimalTag: document.getElementById('edit-animal-tag').value,
      editGender: document.getElementById('edit-gender').value,
      editDob: document.getElementById('edit-dob').value,
      editRegDate: document.getElementById('edit-registration-date').value,
      editid: document.getElementById('editid').value
    };

    console.log(editAnimalData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(editAnimalData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/updateAnimalData`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#editAnimalModal').modal('hide');
        $('#registeredAnimalsModalToggle').modal('hide');

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

const updateVaccineForm = document.forms.namedItem("editVaccineForm");
updateVaccineForm.addEventListener("submit", (event) => {

  recordEditVaccine();

  event.preventDefault();

},

  false

);

