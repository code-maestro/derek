const browserUrl = window.location.href;
const today = new Date(Date.now());

const form = document.getElementById('registrationForm');
const container = document.querySelector('#dynamic');


// Editing animal and  setting vaccination records
async function editAnimal(param) {
  const editid = document.getElementById("editid");
  const tag = document.getElementById("edit-animal-tag");
  const gender = document.getElementById("edit-gender");
  const dob = document.getElementById("edit-dob");
  const regDate = document.getElementById("edit-registration-date");

  let list = await getListing('allAnimals');
  list.animalListing.every(v => {
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
async function getAnimalTableData() {
  let last = await getMaxId('animal_id');
  let list = await getListing('allAnimals');

  console.log(list);

  last.last_id.forEach(id => {
    document.getElementById("animal-tag").setAttribute('value', id.animal_type === null ? "" : `${id.animal_type.toUpperCase()}-000${id.LAST + 1}`);
  });

  let html = '';
  let htmlSegment = '';

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
          
          <td class="text-center noprint" data-bs-target="#editAnimalModal" data-bs-toggle="modal"  onclick="editAnimal(${animal.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </td>

          <td class="text-center noprint" onclick="deleteFromList('animal', '${animal.id}')">
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
const getFeedsTableData = async () => {
  const feedsData = await getListing('feeds');
  let html, htmlSegment = '';

  const con = document.getElementById('feedsListing');

  feedsData.listing.forEach(feed => {
    htmlSegment = `
        <tr class="justify-content-center" id="${feed.id}">
          <td class="text-center"> ${feed.id} </td>
          <td class="text-center"> ${feed.name} </td>
          <td class="text-center"> ${feed.description} </td>
          <td class="text-center"> ${feed.quantity + ' ' + feed.quantity_measure} </td>
          <td class="text-center"> ${feed.stock_date} </td>
          <td class="text-center"> ${feed.expected_restock_date} </td>
          
          <td class="text-center noprint" data-bs-target="#editAnimalModal" data-bs-toggle="modal"  onclick="editAnimal(${feed.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </td>

          <td class="text-center noprint" onclick="deleteFromList('animal', '${feed.id}')">
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

  last.last_id.forEach(id => {
    document.getElementById("timetableTitle").setAttribute('value', `${id.animal_type.toUpperCase()}-FEEDING-000${id.LAST + 1}`);
  });


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
  const ids = [];

  feedsData.listing.forEach(feed => {
    ids.push(feed.id);
    names.push(feed.name);
    desc.push(feed.description);
    numbers.push(feed.quantity + ' ' + feed.quantity_measure);
  });

  const lstd = document.getElementById('feedList');

  if (names.includes(lstd.value)) {
    console.log(lstd.value);
    let getIndex = names.indexOf(lstd.value);
    document.getElementById('feeds-description').value = desc.at(getIndex);
    document.getElementById('feeds-quantity').value = numbers.at(getIndex);
    document.getElementById('feeds_id').value = ids.at(getIndex);
  }
}

// TODO look into thisssss
// Function to get All feeds
const getAllVaccines = async () => {
  const vaccines = await getListing('availableVaccines');
  const animals = await getListing('allAnimals');
  const vets = await getListing('vets');

  let vaccineListed, tagListed, vetListed = '';
  let vaccineList = `<option selected disabled> Choose a Vaccine ...</option>`;
  let tagList = `<option selected disabled> Choose an Animal Tag ...</option>`;
  let vetList = `<option selected disabled> Choose an Vet ...</option>`;

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
    vetListed = ` <option id="${vet.id}" value="${vet.fname + ' '+ vet.lname}">  ${vet.fname + ' ' + vet.lname} </option> `;
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
  const noVaxs = [];
  const vaxCycles = [];
  
  // PUSHING TO VACCINES ARRAY
  vaccines.listing.forEach(vaccine => {

    const vax_period = vaccine.period == 1 ? "a day" : vaccine.period == 7 ? "a week" : vaccine.period == 30 ? "a month" : "a year";
    const vax_cycle = vaccine.cycle == 1 ? "once" : vaccine.cycle == 2 ? "twice" : `${vaccine.cycle} times`;

    vaxIds.push(vaccine.id);
    vaxNames.push(vaccine.name);
    noVaxs.push(vaccine.no_of_vaccinations);
    vaxCycles.push(vax_cycle + ' ' + vax_period );

  });

  if (vaxNames.includes(vaxName.value)) {
    let getIndex = vaxNames.indexOf(vaxName.value);

    console.log(vaxCycles.at(getIndex));

    console.log('noVaxs' + noVaxs.at(getIndex));

    document.getElementById('vaxID').value = vaxIds.at(getIndex);
    document.getElementById('cycle-vaccinations').value = vaxCycles.at(getIndex);
    document.getElementById('no-vax').value = noVaxs.at(getIndex);
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
    vetIds.push(vet.id);
    vetNames.push(vet.fname + ' ' + vet.lname)
    vetStations.push(vet.station);
    vetEmails.push(vet.email);
    vetPhones.push(vet.phone);
  });

  console.log(vetName.value);

  if (vetNames.includes(vetName.value)) {
    let getIndex = vetNames.indexOf(vetName.value);
    document.getElementById('vetID').value = vetIds.at(getIndex);
    document.getElementById('vet-hospital').value = vetStations.at(getIndex);
    document.getElementById('vet-email').value = vetEmails.at(getIndex);
    document.getElementById('vet-phone').value = vetPhones.at(getIndex);
  }

}


// Funciton invoked on changes
const getTimetables = async () => {
  const timetables = await getListing('timetables');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('feedingTimetableListing');

  timetables.listing.forEach(timetable => {
    htmlSegment = `
    <tr class="justify-content-center" id="${timetable.id}">
      <td class="text-center"> ${timetable.id} </td>   
      <td class="text-center"> ${timetable.cycle} </td> 
      <td class="text-center"> ${timetable.quantity_per_cycle} </td> 
      <td class="text-center"> ${timetable.first_feed_date} </td> 
      <td class="text-center"> ${timetable.last_feed_date} </td> 
      <td class="text-center"> ${timetable.last_feed_date} </td>

      <td class="text-center noprint" data-bs-target="#generatedModalToggle" data-bs-toggle="modal"  onclick="editAnimal(${timetable.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
          <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
        </svg>
      </td>

      <td class="text-center noprint" onclick="deleteFromList('animal', '${timetable.id}')">
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
      <td class="text-center"> ${vaccine.quantity} </td>
      <td class="text-center"> ${vaccine.no_of_vaccinations} </td>
      <td class="text-center"> ${vaccine.cycle} </td>
      <td class="text-center"> ${vaccine.period} </td>
      <td class="text-center"> ${vaccine.injection_area} </td>

      <td class="text-center noprint" onclick="deleteFromList('animal', '${vaccine.id}')">
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
const getFullyVaccinatedAnimals = async () => {
  const vaccinated = await getListing('fullyVaxedAnimals');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('vaccinatedListing');

  console.log(con);

  console.log(vaccinated);

  vaccinated.listing.forEach(vaxed => {
    htmlSegment = `
    <tr class="justify-content-center" id="${vaxed.id}">
      <td class="text-center"> ${vaxed.id} </td>
      <td class="text-center"> ${vaxed.animal_tag} </td>
      <td class="text-center"> ${vaxed.vaccine_name} </td>
      <td class="text-center"> ${vaxed.disease_vaxed_against} </td>
      <td class="text-center"> ${vaxed.no_of_vaccinations} </td>
      <td class="text-center"> ${vaxed.first_vaccination_date} </td>
      <td class="text-center"> ${vaxed.last_vaccination_date} </td>

      <td class="text-center noprint" onclick="deleteFromList('animal', '${vaxed.id}')">
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
      <td class="text-center"> ${vet.vet_id} </td>

      <td class="text-center noprint" data-bs-target="#generatedModalToggle" data-bs-toggle="modal"  onclick="editVet(${vet.vet_id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
          <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
        </svg>
      </td>

      <td class="text-center noprint" onclick="deleteFromList('vet', '${vet.vet_id}')">
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
function deleteFromList(param1, param2) {
  const url = `/delete/${param1}`;
  // post body data 
  const user = {
    id: param2
  };

  // request options
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(url, options)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        console.log("😎😎😎😜");
      }
      return response;
    }).then(function (response) {
      console.log("ok");
      console.log(response);

    }).catch(function (error) {
      console.log(error);
    });

  const element = document.getElementById(`${param2}`);
  console.log(element);
  element.remove();

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

// Export to excel
function toExcel(tableID, filename = '') {
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  // Specify file name
  filename = filename ? filename + '.xlsx' : 'REPORT.xlsx';

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    // Setting the file name
    downloadLink.download = filename;
    //triggering the function
    downloadLink.click();
  }
}

// Function to print report
function printReport(param) {
  const hideElements = document.getElementsByClassName('noprint');
  const arr = Array.prototype.slice.call(hideElements)
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
  const mail = document.getElementById("edit-vet-email");
  const station = document.getElementById("edit-vet-station");

  let vets = await getListing('vets');
  
  console.log("vets");
  console.log(vets);

  vets.listing.every(vet => {
    // const ddate = v.dob;
    // console.log(ddate.toDateString());
    if (v.vet_id == param) {
      fname.setAttribute("value", vet.fname)
      lname.setAttribute('value', vet.animal_tag);
      phone.isetAttribute("value", vet.gender);
      mail.setAttribute('value', vet.email);
      station.setAttribute('value', vet.station);

      return false;
    }
    return true;
  });
}