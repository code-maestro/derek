
// Function to get All feeds
const getBreedAnimals = async () => {
    const animals = await getListing('notHeavyAnimals');

    let tagListed = '';
    let tagList = `<option selected disabled> Choose an Animal Tag ...</option>`;

    const tag_lstd = document.getElementById('breeding_animal');

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
  
        <td class="text-center noprint" data-bs-target="#editVetToggle" data-bs-toggle="modal" >
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