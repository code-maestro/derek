// Get data from backend endpoint
async function getUsers() {
  let url = '/before-home';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


async function renderUsers() {

  let users = await getUsers();

  let html = '';

  let htmlSegment = '';

  let container = document.querySelector('#ddaa');

  if (users.status === 200) {

    const animals_ku_farm = users.listing;

    JSON.parse(animals_ku_farm).forEach(animal => {
      htmlSegment = `
      <!-- animal card onclick="seeDetails()"-->
        <a class="col-sm mb-4" href="/animal/${animal.name}">
          <div >
            <div class="rounded shadow-sm py-5 px-4" id="${animal.name}s">
              <img src="${animal.image_url}" alt="${animal.name}'s image" width="100" class="img-fluid rounded-circle mb-3 shadow-sm">
              <h5 class="mb-0"> ${animal.name} </h5>
              <span class="small text-uppercase text-muted" id="${animal.name}ss"></span>
            </div>
          </div>
        </a>
    `;

      html += htmlSegment;

    });

    html += `
    <a class="col-sm mb-4" data-toggle="modal" data-target="#newAnimalModal" href="#">
      <div>
        <div class="rounded shadow-sm py-5 px-4">
          <img width="100" class="img-fluid rounded-circle mb-3" src="images/plus.svg"/>
          <h5 class="mb-0"> add new </h5>
          <span class="small text-uppercase text-muted" ></span>
        </div>
      </div>
    </a
  `;

    container.innerHTML = html;
    document.getElementById("select-heading").innerText = "select an animal to view the stats";

  } else {

    return null;

  }

}

renderUsers();