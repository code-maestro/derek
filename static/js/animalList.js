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


// // Function Adding new Animal
// async function addNewAnimal(formData) {

//   console.log(formData);
  
//   try {

//     // // post body data 
//     // const newAnimalData = {
//     //   animal_type: document.getElementById('animal_type').value,
//     //   animal_desc: document.getElementById('animal_desc').value,
//     //   file_name: file
//     // };

//     // console.log(newAnimalData);

//     // request options
//     const options = {
//       method: 'POST',
//       body: formData,
//       // JSON.stringify(newAnimalData),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }

//     const response = await fetch(`/addAnimal`, options);

//     if (!response.ok) {

//       console.log(`HTTP error: ${response.status}`);

//     } else {

//       const data = await response.json();

//       console.log(data);

//       if (data.status == 200) {

//         $('#successModalToggle').modal('show');
//         document.getElementById('success-msg').innerText = data.message;
//         $('#registerAnimalModalToggle').modal('hide');
//         document.getElementById("registerNewAnimalForm").reset();

//       } else {

//         $('#errModalToggle').modal('show');

//         document.getElementById('errors-msg').innerText = data.message;

//       }

//     }

//   }

//   catch (error) { console.log(error); }

// }


// const animalForm = document.forms.namedItem("new-animal-form");
// animalForm.addEventListener("submit", (event) => {

//   var input = document.querySelector('input[type="file"]')
//   console.log(input.files[0].name);
//   console.log(input.files[0].originalname);

//   addNewAnimal(input.files[0]);

//   event.preventDefault();

// },

//   false

// );
