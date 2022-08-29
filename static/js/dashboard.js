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
  document.getElementById('pendingVcount').innerText = sk.count || 0;
  document.getElementById('vCount').innerText = sk.disease_id || 0;
  document.getElementById("registrationModalLabel").innerText = `${sk.animal_type.toUpperCase()} REGISTRATION AND TABULAR DATA `;
  document.getElementById("register-animal").innerText = `REGISTER A NEW ${sk.animal_type.toUpperCase()}`;
  document.getElementById('newCount').innerText = sk.count || 0;
  document.getElementById('heavyCount').innerText = sk.count || 0;

}

renderAnimals()


function clicked(param) {
  cards = ['total', 'sick', 'heavy', 'vaxed', 'prod', 'new-at-farm', 'new-born', 'pending'];
  cards.forEach(element => {
    if (element == param) {
      console.log("passed");
      document.getElementById(param).classList.add('border-left-info');
      document.getElementById(param).style.backgroundColor = "#caeaff";

      container.innerHTML = `
      <div class="card ${param}" id="${param}ss">
        <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </p>
  
            <button class="btn btn-primary" onclick='deleteFromDom("${param}")'> close </button>
  
          </div>
        </div>
      `;
    } else {
      console.log(element);
      document.getElementById(element).classList.remove('border-left-info');
      document.getElementById(element).style.backgroundColor = "WHITE";
    }
  });
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


// Getting all animals listings from backend
async function getListing() {
  let url = '/getAnimalListing';
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



async function getTableData() {
  let list = await getListing();
  let last = await getMaxId();

  console.log(last);
  console.log(list);

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
    const ageDays = today.getDay() - dobYear.getDay();

    htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${animal.gender} </td>
          <td class="text-center"> ${regDate.toDateString()} </td>
          <td class="text-center"> ${dobYear.toDateString()} </td>
          <td class="text-center"> ${ageYears < 0 ? 0 : ageYears} </td>
          <td class="text-center"> ${ageMonths < 0 ? 0 : ageMonths} </td>
          <td class="text-center"> ${ageDays < 0 ? 0 : ageDays} </td>
          
          <td class="text-center noprint">
            <button type="button" class="btn btn-sm btn-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
              </svg>
            </button>
          </td>

          <td class="text-center noprint">
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteAnimal('${animal.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
              </svg>
            </button>
          </td>

        </tr>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}


function deleteAnimal(param) {
  console.log(param);

  const url = `/remove-animal`;

  // post body data 
  const user = {
    id: param
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

  const element = document.getElementById(`${param}`);
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
  console.log("mikael");
  const dobVal = document.getElementById('dob').value;
  const regDateVal = document.getElementById('registration-date').value;
  const dobYr = new Date(Date.parse(dobVal));

  // AGE CALCULATION
  const age = today - dobYr;

  if (age < 0) {
    alert('Date of Birth should be not in the future');
  } else {
    const ageYrs = today.getFullYear() - dobYr.getFullYear();
    const ageMonths = today.getMonth() - dobYr.getMonth();
    const ageDays = today.getDate() - parseInt(dobVal.slice(8));

    document.getElementById('age-years').value = ageYrs;
    document.getElementById('age-months').value = ageMonths;
    document.getElementById('age-days').value = ageDays;
  }

}


// test save to db
function toDB(e) {
  e.preventDefault();

  const user = {
    tag: form.animalTag.value,
    gender: form.gender.value,
    dob: form.dob.value,
    regDate: form.regDate.value
  };

  // // request options
  // const options = {
  //   method: 'POST',
  //   body: JSON.stringify(user),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }

  // fetch('/insertData', options)
  //   .then(function (response) {
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     } else {
  //       console.log("😎😎😎😜");
  //       form.reset();
  //     }
  //     return response;
  //   }).then((response) => {
  //     console.log("ok");
  //     console.log(response);

  //   }).catch(function (error) {
  //     console.log(error);
  //   });


  function handleErr(params) {
    console.log("fgsdgs");
    console.log(params);
  }

fetch('/insertData', {
  method: "POST",
  body: JSON.stringify(user),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json()) 
.then(json => handleErr(json))
.catch(err => console.log(err));

}


form.addEventListener('submit', toDB);
