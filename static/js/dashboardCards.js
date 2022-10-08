// FIRST NON OPTIMISED ATTEMPT
// Get Total Count of the animals from backend endpoint
async function getCount(param) {
  let url = `/getCount/${param}`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


// // ALEDGED OPTIMISED ATTEMPT
// // Get Total Count of the animals from backend endpoint
// async function getCount() {
//   let url = `/getCount`;
//   try {
//     let res = await fetch(url);
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// }

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
  const cardsCount = ['allAnimals', 'sickAnimals', 'heavyAnimals', 'newBorns', 'vaccinatedAnimals',  'pendingAnimals', 'allFeeds', 'allProducts']

  for (const number of cardsCount) {
    const animalCount = await getCount(number);
    animalCount.count.forEach(count => {
      document.getElementById(number).innerText = count.COUNT || 0;
    })
  }
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

          // Sick Animals Card and dashboard table
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
                      <th scope="col" class="text-center"> DISEASE </th>
                      <th scope="col" class="text-center"> VET_NAME </th>
                      <th scope="col" class="text-center"> SCHEDULED TREATMENT DATE </th>
                      <th scope="col" class="text-center"> CONFIRMED APPOINTMENT </th>
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
                  <tbody id="heavyAnimalsListing"> </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        // RETURN FULLY VACCINATED ANIMAKS
        case 'vaccinated':
          getFullyVaccinated();
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
                    <th scope="col" class="text-center"> VACCINE </th>
                    <th scope="col" class="text-center"> DISEASE </th>
                    <th scope="col" class="text-center"> No OF VACCINATIONS </th>
                    <th scope="col" class="text-center"> FIRST DATE </th>
                    <th scope="col" class="text-center"> LAST DATE </th>
                    </tr>
                  </thead>
                  <tbody id="vaccinatedListing">  </tbody>
              </table>
            </p>
          </div>
        </div>
          `;
          break;

        // all animals pending vaccinations
        case 'pending':
          getPendingVaccinationsListing();
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
                          <th scope="col" class="text-center"> VACCINE </th>
                          <th scope="col" class="text-center"> DISEASE </th>
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
                  <tbody id="animalProductsListing">  </tbody>
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
              <h5 class="card-title"> ${param} </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> FEED NAME </th>
                      <th scope="col" class="text-center"> STOCKED QUANTITY </th>
                      <th scope="col" class="text-center"> STOCKING DATE </th>
                      <th scope="col" class="text-center"> RESTOCK DATE </th>
                    </tr>
                  </thead>
                  <tbody id="animalFeedsListing">  </tbody>
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
                  <tbody id="newBornsListing">  </tbody>
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


// Rendering symptoms to frontend 
function viewDiseases(params) {
  console.log(params);
}


async function getAllAnimals() {
  let list = await getListing('allAnimals');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('dashboardAnimalListing');

  list.listing.forEach(animal => {
    const dobYear = new Date(Date.parse(animal.dob));
    const regDate = new Date(Date.parse(animal.reg_date));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.animal_type}${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${animal.YEARS > 0 ? animal.YEARS + ' Year(s)' : ''} ${ animal.MONTHS > 0 ? animal.MONTHS + ' Month(s)' : ''} ${ animal.DAYS > 0 ? animal.DAYS + ' Day(s)' : ''} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Sick animals listintg
async function getSickAnimals() {
  let sickAnimals = await getListing("sickAnimals");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('sickAnimalsListing');

  sickAnimals.listing.forEach(sick => {

    const a_date = new Date(Date.parse(sick.appointment_date));

    htmlSegment = `
        <tr class="justify-content-center" id="${sick.id}">
          <td scope="col" class="text-center"> ${sick.id} </td>
          <td scope="col" class="text-center"> ${sick.ANIMAL_TAG} </td>
          <td scope="col" class="text-center"> ${sick.DISEASE} </td>
          <td scope="col" class="text-center"> ${sick.VET_NAME} </td>
          <td scope="col" class="text-center"> ${a_date.toDateString()} </td>
          <td scope="col" class="text-center"> ${sick.confirmed} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// [x]  WORKS - Get Pregant animals listing
async function getHeavyAnimals() {
  let heavyAnimals = await getListing("expectingAnimals");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('heavyAnimalsListing');

  heavyAnimals.listing.forEach(heavy => {
    const in_date = new Date(Date.parse(heavy.insemination_date));
    const d_date = new Date(Date.parse(heavy.delivery_date));

    htmlSegment = `
        <tr class="justify-content-center" id="${heavy.id}">
          <th scope="row" class="text-center" id="id"> ${heavy.id} </th>
          <td class="text-center"> ${heavy.heavy_tag} </td>
          <td class="text-center"> ${in_date.toDateString()} </td>
          <td class="text-center"> ${d_date.toDateString()} </td>
          <td class="text-center"> ${heavy.AGE + 'Days(s)'} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// this function - Animal products listing
async function getAnimalProducts() {
  let products = await getListing("allProducts");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('animalProductsListing');

  products.listing.forEach(product => {

    htmlSegment = `
        <tr class="justify-content-center" id="${product.id}">
          <td scope="col" class="text-center"> ${product.id} </td>
          <td scope="col" class="text-center"> ${product.animal_tag} </td>
          <td scope="col" class="text-center"> ${product.name} </td>
          <td scope="col" class="text-center"> ${product.quantity + product.measure } </td>
          <td scope="col" class="text-center"> ${product.expected_qnty + product.measure} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;


}

//  Animal Feeds listing
async function getAnimalFeeds() {
  let feeds = await getListing("feeds");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('animalFeedsListing');

  feeds.listing.forEach(feed => {
    const stock_date = new Date(Date.parse(feed.expected_restock_date));
    const restock_date = new Date(Date.parse(feed.expected_restock_date));

    htmlSegment = `
        <tr class="justify-content-center" id="${feed.id}">
        <td scope="col" class="text-center"> ${feed.id} </td>
          <td scope="col" class="text-center"> ${feed.name} </td>
          <td scope="col" class="text-center"> ${feed.quantity + ' ' + feed.quantity_measure} </td>
          <td scope="col" class="text-center"> ${stock_date.toDateString()} </td>
          <td scope="col" class="text-center"> ${restock_date.toDateString()} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// TODO implement this function - New borns listing
async function getNewBornAnimals() {
  let babies = await getListing("babies");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('newBornsListing');

  babies.listing.forEach(baby => {

    htmlSegment = `
        <tr class="justify-content-center" id="${baby.id}">
          <td scope="col" class="text-center"> ${baby.id} </td>
          <td scope="col" class="text-center"> ${baby.id} </td>
          <td scope="col" class="text-center"> ${baby.id} </td>
          <td scope="col" class="text-center"> ${baby.id} </td>
          <td scope="col" class="text-center"> ${baby.id} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;


}


// Table data for vaccines
async function getVaccinesTableData() {
  let list = await getVaccines();

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('vaccinesListing');

  list.vaccines.forEach(animal => {
    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.name} </td>
          <td class="text-center vaccineDesc" id="vaccineDescription"> ${animal.description} </td>
          <td class="text-center"> ${animal.quantity + animal.quantity_measure} </td>
          <td class="text-center"> ${animal.number_of_vaccinations} </td>
          <td class="text-center"> ${animal.cycle} </td>
          <td class="text-center"> ${animal.period} </td>
          <td class="text-center"> ${animal.injection_area} </td>

          <td class="text-center noprint" data-bs-target="#editVaccineModal" data-bs-toggle="modal"  onclick="editAnimal(${animal.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg>
        </td>

        <td class="text-center noprint" onclick="deleteFromList('vaccine', '${animal.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
          </svg>
        </td>

        </tr>


        <script type="text/javascript">

        var len = 15;
        var p = document.getElementById('vaccineDescription');
        if (p) {
        
          var trunc = p.innerHTML;
          if (trunc.length > len) {
        
            /* Truncate the content of the P, then go back to the end of the
               previous word to ensure that we don't truncate in the middle of
               a word */
            trunc = trunc.substring(0, len);
            trunc = trunc.replace(/\w+$/, '');
        
            /* Add an ellipses to the end and make it a link that expands
               the paragraph back to its original size */
            trunc += '<a href="#" ' +
              'onclick="this.parentNode.innerHTML=' +
              'unescape(\''+escape(p.innerHTML)+'\');return false;">' +
              '...<\/a>';
            p.innerHTML = trunc;
          }
        }
        
        </script>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

// Table data for p3ending 
async function getPendingVaccinationsListing() {
  let list = await getListing("pendingAnimals");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('pendingAnimalListing');

  list.listing.forEach(animal => {
    const d_date = new Date(Date.parse(animal.next_date));

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.vaccine_name} </td>
          <td class="text-center"> ${animal.d_name} </td>
          <td class="text-center"> ${animal.no_of_vaccinations} </td>
          <td class="text-center"> ${animal.no_pending} </td>
          <td class="text-center"> ${d_date.toDateString()} </td>
        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}