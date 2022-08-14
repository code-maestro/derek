const container = document.querySelector('#dynamic');

const browserUrl = window.location.href;

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
  const allSick = await getSickAnimalCount();

  const sk = JSON.parse(JSON.stringify(all));

  document.getElementById('babyCount').innerText = element || 0;
  document.getElementById('pendingVcount').innerText = element.count || 0;
  document.getElementById('vCount').innerText = element.farma_id || 0;
  document.getElementById('allCount').innerText = sk.count || 0;
  document.getElementById('sickCount').innerText = allSick || 0;
  document.getElementById('newCount').innerText = allSick || 0;
  document.getElementById('heavyCount').innerText = all || 0;




  // if (![false, 0, "", null, undefined, NaN].includes(animals)) {
  //   const animals_at_farm = JSON.parse(JSON.stringify(animals));
  //   animals_at_farm.forEach(animal => {
  //     console.log(animal);
  //     // document.getElementById('allCount').innerText = animals;
  //     
  //     
  //     
  //     
  //     
  //     
  //   });
  // } else {
  //   return null;
  // }
}

renderAnimals()

function clicked(param) {
  cards = ['total', 'sick', 'heavy', 'vaxed', 'prod', 'new-at-farm', 'new-born', 'pending'];
  if (cards.includes(param)) {
    document.getElementById(param + 's').style.backgroundColor = '#cdffcd';
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
    console.log('😒😒🙌😂😂' + param);
  }
}

// Removes the tabke card
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
      <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
          <div class="dropdown no-arrow">
              <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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

