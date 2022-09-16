// Get Total Count of the animals from backend endpoint
async function getAnimalsCount() {
  let url = `/getAnimalsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

// Get number of sick of the animals from backend endpoint
async function getSickAnimalsCount() {
  let url = `/getSickAnimalsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of expectant the animals from backend endpoint
async function getExpectingAnimalsCount() {
  let url = `/getExpectingAnimalsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of new borns from backend endpoint
async function getNewBornsCount() {
  let url = `/getNewBornsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of fully vaccinated animals from backend endpoint
async function getVaccinatedCount() {
  let url = `/getVaccinatedCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of pending vaccinations animals from backend endpoint
async function getPendingVaccinationsCount() {
  let url = `/getPendingVaccinationsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of animals' feeds from backend endpoint
async function getFeedsCount() {
  let url = `/getFeedsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of animals' products from backend endpoint
async function getProductsCount() {
  let url = `/getProductsCount`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// Get number of animals' products from backend endpoint
async function getAnimalType() {
  let url = `/getType`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// RENDERS DATA TO THE BI DASHBOARD CARDS LIVE STATISTICS
async function renderAnimals() {
  // registered animals count
  const animalCount = await getAnimalsCount();
  animalCount.animalCount.forEach(count => {
    document.getElementById('allCount').innerText = count.COUNT || 0;
  })

  // sick animals count
  const sickAnimalsCount = await getSickAnimalsCount();
  sickAnimalsCount.sickAnimalCount.forEach(count => {
    document.getElementById('sickCount').innerText = count.COUNT || 0;
  })

  // Heavy animals count
  const expectantCount = await getExpectingAnimalsCount();
  expectantCount.expectingAnimalCount.forEach(count => {
    document.getElementById('heavyCount').innerText = count.COUNT || 0;

  })

  // New Borns animals count
  const newBornsCount = await getNewBornsCount();
  newBornsCount.newBornCount.forEach(count => {
    document.getElementById('babyCount').innerText = count.COUNT || 0;
  })

  // FULLY vaccinated animals count
  const vaccinatedCount = await getVaccinatedCount();
  vaccinatedCount.vaccinatedCount.forEach(count => {
    document.getElementById('vaccinatedCount').innerText = count.COUNT || 0;
  })


  // Pending vaccinations animals count
  const pendingCount = await getPendingVaccinationsCount();
  pendingCount.pendingCount.forEach(count => {
    document.getElementById('pendingCount').innerText = count.COUNT || 0;
  })

  // animals' feeds count
  const feedsCount = await getFeedsCount();
  feedsCount.feedsCount.forEach(count => {
    document.getElementById('feedsCount').innerText = count.COUNT || 0;
  })

  // animals' products count
  const productsCount = await getProductsCount();
  productsCount.animalProductsCount.forEach(count => {
    document.getElementById('productsCount').innerText = count.COUNT || 0;
  })

  // animals' products count
  const animalType = await getAnimalType();
    document.getElementById('animalType').innerText = animalType.type || 0;
    document.getElementById("registrationModalLabel").innerText = `${animalType.type.toUpperCase()} REGISTRATION AND TABULAR DATA `;
    document.getElementById("editAnimalModalLabel").innerText = ` UPDATE ${animalType.type.toUpperCase()} `;
    document.getElementById("register-animal").innerText = `REGISTER A NEW ${animalType.type.toUpperCase()}`;

    document.getElementById("vaccinesModalLabel").innerText = `AVAILABLE ${animalType.type.toUpperCase()} VACCINES`;
    document.getElementById("editVaccineModalLabel").innerText = `UPDATE ${animalType.type.toUpperCase()} `;
    document.getElementById("available-vaccines").innerText = `ADD A NEW ${animalType.type.toUpperCase()} VACCINE`;
}

renderAnimals();



// CARDS CLICK EVENT HANDLER
// called when a totaling card is called
function clicked(param) {
  cards = ['total', 'sick', 'heavy', 'vaccinated', 'products', 'feed', 'new-born', 'pending'];
  cards.forEach(element => {
    if (element == param) {
      document.getElementById(param).classList.add('border-left-info');
      document.getElementById(param).style.backgroundColor = "#caeaff";

      switch (element) {
        // [x] animals listing fixed  
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
                    <tbody id="dashboardAnimalListing">  </tbody>
                  </table>
                </p>
              </div>
            </div>
          `;
          break;

        // TODO RETURN ALL THE SICK ANIMALS
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

        // [x] expecting table completed 
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
                      <th scope="col" class="text-center"> INSERMINATION DATE </th>
                      <th scope="col" class="text-center"> EXPECTED DUE DATE </th>
                      <th scope="col" class="text-center"> REMAINING PERIOD </th>
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

        // TODO  RETURN FULLY VACCINATED ANIMAKS
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
                      <th scope="col" class="text-center"> NO OF VACCINATIONs </th>
                      <th scope="col" class="text-center"> FIRST VACCINATION DATE </th>
                      <th scope="col" class="text-center"> LAST VACCINATION DATE </th>
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

        // TODO return products from animals
        case 'products':
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

        // TODO Keep track of stocked feeds
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

        // TODO return newborn animals
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

        // TODO return all animals pending vaccinations
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
                        <th scope="col" class="text-center"> No OF VACCINATIONS </th>
                        <th scope="col" class="text-center"> REMAINING VACCINATIONS </th>
                        <th scope="col" class="text-center"> NEXT VACCINAION DATE </th>
                      </tr>
                    </thead>
                    <tbody id="pendingAnimalListing"> </tbody>
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

// [x]  WORKS registered animals listing
async function getAllAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {
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

// TODO IMPLEMENT THIS FUNCTION  - Sick animals listintg
async function getSickAnimals() {
  let list = await getSickAnimalsListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {
    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
        
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// [x]  WORKS - Get Pregant animals listing
async function getHeavyAnimals() {
  let list = await getHeavyAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('heavyAnimalsListing');

  list.heavyAnimals.forEach(animal => {
    const in_date = new Date(Date.parse(animal.insemination_date));
    const d_date = new Date(Date.parse(animal.delivery_date));

    // AGE CALCULATION
    const theYears = d_date.getFullYear() - in_date.getFullYear();
    const theMonths = d_date.getMonth() - in_date.getMonth();
    // const ageDays = today.getDay() - dobYear.getDay();
    const theDays = d_date.getDate() - parseInt(in_date.toDateString().slice(8, 10));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${in_date.toDateString()} </td>
          <td class="text-center"> ${d_date.toDateString()} </td>
          <td class="text-center"> ${theYears > 0 ? theYears + ' Year(s)' : ''} ${theMonths > 0 ? theMonths + ' Month(s)' : ''} ${theDays > 0 ? theDays + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// TODO implement this function Vaccinated Animals
async function getVaccinatedAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {
    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// TODO implement this function - Animal products listing
async function getAnimalProducts() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {
    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
      
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// TODO implement this function - Animal Feeds listing
async function getAnimalFeeds() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">

        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// TODO implement this function - New borns listing
async function getNewBornAnimals() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">

        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// TODO implement this function - Pending vaccinations listing
async function getPendingAnimalVaccinations() {
  let list = await getAnimalListing();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.animalListing.forEach(animal => {
    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
         
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}