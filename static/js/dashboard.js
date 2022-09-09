const browserUrl = window.location.href;
const today = new Date(Date.now());

const form = document.getElementById('registrationForm');
const container = document.querySelector('#dynamic');

// Get Total Count of the animals from backend endpoint
async function getAnimalCount() {
  let url = `/get-count/${browserUrl.replace('http://localhost:3000/animal/', '')}`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

// Get number of sick of the animals from backend endpoint
async function getSickAnimalCount() {
  let url = `/get-sick/${browserUrl.replace('http://localhost:3000/animal/', '')}`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderAnimals() {
  const all = await getAnimalCount();
  const sk = JSON.parse(JSON.stringify(all));

  document.getElementById('allCount').innerText = sk.count || 0;
  document.getElementById('sickCount').innerText = sk.sickCount || 0;
  document.getElementById('babyCount').innerText = sk.count || 0;
  document.getElementById('pendingCount').innerText = sk.count || 0;
  document.getElementById('vaccinatedCount').innerText = sk.disease_id || 0;
  document.getElementById('feedsCount').innerText = sk.count || 0;
  document.getElementById('heavyCount').innerText = sk.count || 0;

  document.getElementById("registrationModalLabel").innerText = `${sk.animal_type.toUpperCase()} REGISTRATION AND TABULAR DATA `;
  document.getElementById("editAnimalModalLabel").innerText = ` UPDATE ${sk.animal_type.toUpperCase()} `;
  document.getElementById("register-animal").innerText = `REGISTER A NEW ${sk.animal_type.toUpperCase()}`;

  document.getElementById("vaccinesModalLabel").innerText = `AVAILABLE ${sk.animal_type.toUpperCase()} VACCINES`;
  document.getElementById("editVaccineModalLabel").innerText = `UPDATE ${sk.animal_type.toUpperCase()} `;
  document.getElementById("available-vaccines").innerText = `ADD A NEW ${sk.animal_type.toUpperCase()} VACCINE`;

}

renderAnimals();


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


// Getting all animals listings from backend
async function getAnimalListing() {
  let url = '/getAnimalListing';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting all animals listings from backend
async function getSickAnimalsListing() {
  let url = '/getSickAnimals';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting all animals listings from backend
async function getHeavyAnimalListing() {
  let url = '/getExpectingAnimals';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting all vaccination data from backend
async function getVaccines() {
  let url = '/getAvailableVaccines';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting feeds data from backend
async function getFeedsData() {
  let url = '/getFeedsData';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Getting all animals listings from backend
async function getMaxId() {
  let url = '/getAnimalMaxId';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// Table data for all animals
async function getAnimalTableData() {
  let last = await getMaxId();
  let list = await getAnimalListing();

  last.animalMaxId.forEach(id => {
    document.getElementById("animal-tag").setAttribute('value', id.animal_type === null ? "" : `${id.animal_type.toUpperCase()}-000${id.LAST + 1}`);
  });

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('animalListing');

  list.animalListing.forEach(animal => {

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


// Table data for all animals
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


// Editing animal and  setting vaccination records
async function editAnimal(param) {
  const editid = document.getElementById("editid");
  const tag = document.getElementById("edit-animal-tag");
  const gender = document.getElementById("edit-gender");
  const dob = document.getElementById("edit-dob");
  const regDate = document.getElementById("edit-registration-date");

  let list = await getAnimalListing();
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