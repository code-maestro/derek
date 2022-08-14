// Get data from backend endpoint
async function getUsers() {
  let url = '/before-home';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error.json());
  }
}

async function renderUsers() {
  let users = await getUsers();
  let html = '';
  let htmlSegment = '';
  let container = document.querySelector('#ddaa');

  if (![false, 0, "", null, undefined, NaN].includes(users)) {
    const animals_at_farm = JSON.parse(JSON.stringify(users));
    animals_at_farm.forEach(animal => {
      htmlSegment = `
        <!-- animal card -->
          <a class="col-auto" href="/animal/${animal.name}">
            <div onclick="seeDetails(${animal})">
              <div class="rounded shadow-sm py-5 px-4" id="${animal.name}s">
                <img src="${animal.image_url}" alt="${animal.name}'s image" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                <h5 class="mb-0"> ${animal.name} </h5>
                <span class="small text-uppercase text-muted" id="${animal.name}ss"></span>
              </div>
            </div>
          </a
        <!-- End -->
      `;

      html += htmlSegment;

    });

    container.innerHTML = html;
    document.getElementById("select-heading").innerText = "select an animal to view the stats";

  } else {
    return null;
  }
}

renderUsers()

console.log('ss');