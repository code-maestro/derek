// Function to get All feeds
const getBreedAnimals = async () => {

  const animals = await getListing('notHeavyAnimals');

  let tagListed = '';
  let tagList = `<option selected disabled> Choose an Animal Tag ...</option>`;

  const tag_lstd = document.getElementById('breeding_animal');

  console.log(animals);

  animals.listing.forEach(animal => {
    tagListed = ` <option id="${animal.id}" value="${animal.animal_tag}">  ${animal.animal_tag} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}


// Funciton to retrieve new borns animals
const getExpectedNewBorns = async () => {

  const new_borns = await getListing('babies');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('newBornsListing');

  new_borns.listing.forEach(baby => {

    htmlSegment = `
      <tr class="justify-content-center" id="${baby.id}">
        <td class="text-center"> ${baby.id} </td>   
        <td class="text-center"> ${baby.animal_tag} </td> 
        <td class="text-center"> ${baby.parent_tag} </td> 
        <td class="text-center"> ${dateFrontend(baby.dob)} </td>
        <td class="text-center"> ${dateFrontend(baby.created_date)} </td>
  
        <td class="text-center noprint" data-bs-target="#verifyAnimalToggle" data-bs-toggle="modal" onclick="verifyAnimal('${baby.animal_tag}')" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
            <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
          </svg>
        </td>
  
        <td class="text-center noprint" data-bs-toggle="modal" data-bs-target="#approveModalToggle" >
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


// CREATING THE SCHEDULE
const verifyAnimal = async (param) => {

  console.log(param);

  const newAnimals = await verifiedAnimal(`${param}`);

  console.log(newAnimals);

  const new_born_tag = document.getElementById("new-born-animal-tag");
  const parent_tag = document.getElementById("new-born-parent-tag");
  const reg_date = document.getElementById("new-born-animal-reg");
  const dob = document.getElementById("new-born-animal-dob");
  const age = document.getElementById("new-born-animal-age");

  newAnimals.listing.forEach(animal => {

    console.log(animal);

    if (animal.animal_tag == param) {

      new_born_tag.setAttribute('value', animal.animal_tag)
      parent_tag.setAttribute('value', animal.parent_tag);
      reg_date.setAttribute('value', new Date(animal.reg_date).toISOString().slice(0, 10));
      dob.setAttribute('value', new Date(animal.dob).toISOString().slice(0, 10));
      age.setAttribute('value', animal.age);

      console.log(new_born_tag.value);
      return false;

    }

    return true;

  });

}


// Funciton invoked on changes
const getGender = async () => {
  const notHeavyAnimals = await getListing('notHeavyAnimals');

  const the_animal = document.getElementById('breeding_animal');

  const the_genders = [];
  const the_tags = [];
  const animalID = [];
  const gestationP = [];

  // PUSHING TO VACCINES ARRAY
  notHeavyAnimals.listing.forEach(notheavy => {

    console.log(notheavy);
    gestationP.push(notheavy.period)
    animalID.push(notheavy.id)
    the_genders.push(notheavy.gender);
    the_tags.push(notheavy.animal_tag);
  });

  console.log(the_animal.value);

  if (the_tags.includes(the_animal.value)) {

    let getIndex = the_tags.indexOf(the_animal.value);

    console.log(getIndex);

    console.log(the_genders.at(getIndex));

    document.getElementById('breeding_gender').setAttribute('value', the_genders.at(getIndex));
    document.getElementById('breeding_animal_id').setAttribute('value', animalID.at(getIndex));
    document.getElementById('gestation_period').setAttribute('value', gestationP.at(getIndex));

  }

}


// Function to calculate the due date based on the gestation period of the animal type selected
const calcDueDate = () => {

  addDgays(document.getElementById("breeding_date").value, parseInt(document.getElementById('gestation_period').value));


  const due_date = new Date(document.getElementById("breeding_date").value);

  // Specific date
  var date = new Date(document.getElementById("breeding_date").value);

  // Add ten days to specified date
  date.setDate(date.getDate())

  document.getElementById('expected_due_date').value = formatDate(new Date(due_date.setDate(due_date.getDate() + parseInt(document.getElementById('gestation_period').value))));

}


function addDgays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);

  console.log(result + "RESULT");
  return result;
}


async function recordNewborn(event) {
  try {

    // post body data 
    const newborn = {
      newBornTag: document.getElementById('new-born-tag').value,
      parentTag: document.getElementById('parent-tag').value,
      newBornGender: document.getElementById('new-born-gender').value,
      newBornDOB: document.getElementById('new-born-dob').value,
      newBornRegDate: document.getElementById('new-born-dob-reg-date').value
    };

    console.log(newborn);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(newborn),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/addNewBorn`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        console.log(document.getElementById('successModalToggle'));

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#registerNewBornModalToggle').modal('hide');
        // document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password`;

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}


const newBornForm = document.forms.namedItem("recordNewborn");
newBornForm.addEventListener("submit", (event) => {

  recordNewborn();

  event.preventDefault();

},

  false

);


function addDgays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);

  console.log(result + "RESULT");
  return result;
}


async function recordBreed(event) {
  try {

    // post body data 
    const newBreed = {
      breeding_animal_id: document.getElementById('breeding_animal_id').value,
      gestation_period: document.getElementById('gestation_period').value,
      breeding_date: document.getElementById('breeding_date').value
    };

    console.log(newBreed);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(newBreed),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newBred`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#breedingAnimalModalToggle').modal('hide');
        document.getElementById("breedingAnimalForm").reset();

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}


const newBreedForm = document.forms.namedItem("recordBreed");
newBreedForm.addEventListener("submit", (event) => {

  recordBreed();

  event.preventDefault();

},

  false

);

