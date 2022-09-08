// called when a totaling card is called
function clicked(param) {
  cards = ['total', 'sick', 'heavy', 'vaccinated', 'prod', 'feed', 'new-born', 'pending'];
  cards.forEach(element => {
    if (element == param) {
      document.getElementById(param).classList.add('border-left-info');
      document.getElementById(param).style.backgroundColor = "#caeaff";

      switch (element) {
        case 'total':
          getAllAnimals();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> Special title treatment </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> GENDER </th>
                      <th scope="col" class="text-center"> REGISTRATION DATE </th>
                      <th scope="col" class="text-center"> DATE OF BIRTH </th>
                      <th scope="col" class="text-center"> AGE </th>
                    </tr>
                  </thead>
                  <tbody id="dashboardAnimalListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'sick':
          getSickAnimals();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()} ANIMALS TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> GENDER </th>
                      <th scope="col" class="text-center"> DISEASE </h>
                      <th scope="col" class="text-center"> SIGNS & SYMPTOMS </th>
                      <th scope="col" class="text-center"> LAST TREATMENT DATE </th>
                      <th scope="col" class="text-center"> SCHEDULED TREATMENT DATE </th>
                    </tr>
                  </thead>
                  <tbody id="sickAnimalsListing"> </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'heavy':
          getHeavyAnimals();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> DUE DATE </th>
                    </tr>
                  </thead>
                  <tbody id="heavyAnimalsListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'vaccinated':
          getVaccinatedAnimals();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
            <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> GENDER </th>
                      <th scope="col" class="text-center"> FIRST VACCINATION DATE </th>
                      <th scope="col" class="text-center"> LAST VACCINATION DATE </th>
                      <th scope="col" class="text-center"> NO OF VACCINATIONs </th>
                    </tr>
                  </thead>
                  <tbody id="vaccinatedAnimalsListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'prod':
          getAnimalProducts();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> TYPE </th>
                      <th scope="col" class="text-center"> ACTUAL QUANTITY </th>
                      <th scope="col" class="text-center"> EXPECTED QUANTITY </th>
                    </tr>
                  </thead>
                  <tbody id="animalProductsListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'feed':
          getAnimalFeeds();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> STOCKED </th>
                      <th scope="col" class="text-center"> STOCKING DATE </th>
                      <th scope="col" class="text-center"> FEEDING FREQUENCY </th>
                      <th scope="col" class="text-center"> RESTOCK DATE </th>
                    </tr>
                  </thead>
                  <tbody id="animalFeedsListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'new-born':
          getNewBornAnimals();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
            <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> GENDER </th>
                      <th scope="col" class="text-center"> REGISTRATION DATE </th>
                      <th scope="col" class="text-center"> DATE OF BIRTH </th>
                      <th scope="col" class="text-center"> PARENT ANIMAL_TAG </th>
                    </tr>
                  </thead>
                  <tbody id="newBornsListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        case 'pending':
          getPendingAnimalVaccinations();
          container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> GENDER </th>
                      <th scope="col" class="text-center"> NEXT VACCINAION DATE </th>
                      <th scope="col" class="text-center"> No OF VACCINATIONS </th>
                      <th scope="col" class="text-center"> REMAINING VACCINATIONS </th>
                    </tr>
                  </thead>
                  <tbody id="pendingAnimalListing">
                  
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        default:
          console.log(`Sorry`);
      }

    } else {
      document.getElementById(element).classList.remove('border-left-info');
      document.getElementById(element).style.backgroundColor = "WHITE";
    }
  });
}


// Table data for all animals
async function getAllAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

//Sick animals
async function getSickAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Get Pregant animals
async function getHeavyAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Vaccinated Animals
async function getVaccinatedAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Animal products
async function getAnimalProducts() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Animal Feeds
async function getAnimalFeeds() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// New borns
async function getNewBornAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Pending vaccinations
async function getPendingAnimalVaccinations() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    console.log(animal);

    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    // AGE CALCULATION
    const ageYears = today.getFullYear() - dobYear.getFullYear();
    const ageMonths = today.getMonth() - dobYear.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const ageDays = today.getDate() - parseInt(dobYear.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears > 0 ? ageYears + ' Year(s)' : ''} ${ageMonths > 0 ? ageMonths + ' Month(s)' : ''} ${ageDays > 0 ? ageDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}