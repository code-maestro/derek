// Function to get All feeds
const getProductTypes = async () => {

  const products = await getListing('product_types');

  let tagListed = '';
  let tagList = `<option selected disabled> Choose a Product Type ...</option>`;

  const tag_lstd = document.getElementById('product_type');

  products.listing.forEach(product => {
    tagListed = ` <option id="${product.id}" value="${product.name}">  ${product.name} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}


// Function to get All feeds
const getAnimalList = async () => {

  const selectedProductType = document.getElementById('product_type').value;

  console.log(selectedProductType);

  let products = '';
  let tagListed = '';
  let tagList = `<option selected disabled> Choose an animal(s)...</option>`;

  switch (selectedProductType) {
    // [x] animals listing fixed  
    case 'dairy':
      products = await getListing(`${selectedProductType}`);
      break;

    // meat
    case 'meat':
      products = await getListing(`${selectedProductType}`);
      break;

    //Hide
    case 'skin':
      products = await getListing(`${selectedProductType}`);

    //Hide
    case 'eggs':
      products = await getListing(`${selectedProductType}`);

    //Hide
    case 'hooves':
      products = await getListing(`${selectedProductType}`);

    default:
      console.log(`Sorry`);
  }

  const tag_lstd = document.getElementById('target_animals');

  products.listing.forEach(product => {
    tagListed = ` <option id="${product.id}" value="${product.id}">  ${product.animal_tag} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}

const picked_animals = [];

// Function to get All feeds
const pick_animal = async () => {

  const picked = document.getElementById('target_animals').value;

  picked_animals.unshift(picked);

  let tagListed = '';

  const tag_lstd = document.getElementById('targeted');

  picked_animals.forEach(animal => {
    tagListed += `
    <span id="tapped${animal}" class="badge text-bg-info my-2">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-4"> ${animal} </div>
          <div class="col-4 pe-0" onclick="removeItem('${animal}')">    
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
            </svg>
          </div>
        </div>
      </div>
    </span>
      `;
  });

  tag_lstd.innerHTML = tagListed;

}


const removeItem = (param) => {

  console.log(picked_animals.splice(picked_animals.indexOf(param)));
  picked_animals.splice(picked_animals.indexOf(param));

  const element = document.getElementById('tapped'+param);
  element.remove();

}


// Function Adding new Feed
async function recordProjection() {

  console.log(picked_animals.toString());

  try {
    // post body data 
    const projectionData = {
      projection_title: document.getElementById('projection_title').value,
      projection_desc: document.getElementById('projection_desc').value,
      product_type: document.getElementById('product_type').value,
      production_frequency: document.getElementById('production_frequency').value,
      production_period: document.getElementById('production_period').value,
      product_start_date: document.getElementById('product_start_date').value,
      product_end_date: document.getElementById('product_end_date').value,
      production_qnty: document.getElementById('production_qnty').value,
      production_measure: document.getElementById('production_measure').value,
      production_animal_list: picked_animals.toString(),
      record_one_animal: document.getElementById('y/n').value
    };

    console.log(projectionData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(projectionData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newProductProjection`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#registerFeedStockModalToggle').modal('hide');
        document.getElementById("recordNewFeed").reset();

        renderAnimals();

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const productForm = document.forms.namedItem("recordNewProductProjection");
productForm.addEventListener("submit", (event) => {

  recordProjection();

  event.preventDefault();

},

  false

);
