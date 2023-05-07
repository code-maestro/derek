// Function to get All feeds
const getProductTypes = async (param) => {

  const products = await getListing('product_types');

  if (param === "projectionListing") {

    let tagListed = '';
    let tagList = `<option selected disabled> Choose a Product Type ...</option>`;

    const tag_lstd = document.getElementById('product_type');

    products.listing.forEach(product => {
      tagListed = ` <option id="${product.type_id}" value="${product.name}">  ${product.name} </option> `;
      tagList += tagListed;
    });

    tag_lstd.innerHTML = tagList;

  } else {


    let html = '';
    let htmlSegment = '';

    const con = document.getElementById('productTypesListing');

    products.listing.forEach(product => {
      htmlSegment = `
    <tr class="justify-content-center" id="${product.type_id}">
      <td class="text-center"> ${product.type_id} </td>   
      <td class="text-center"> ${product.name} </td> 
      <td class="text-center"> ${product.currency_code + ' ' + product.price + '/' + product.price_qnty} </td> 
 
      <td class="text-center nopnt" data-bs-target="#editVetToggle" data-bs-toggle="modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
          <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
        </svg>
      </td>

      <td class="text-center nopnt" data-bs-toggle="modal" data-bs-target="#approveModalToggle">
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
    tagListed = ` <option id="${product.id}" value="${product.animal_tag}">  ${product.animal_tag} </option> `;
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

  const element = document.getElementById('tapped' + param);
  element.remove();

}

// Function Adding new Feed
async function recordProductType() {

  try {
    // post body data 
    const productTypeData = {
      type_title: document.getElementById('type_title').value,
      type_price: document.getElementById('type_price').value,
      currency: document.getElementById('currency').value,
      price_qnty: document.getElementById('type_qnty').value

    };

    console.log(productTypeData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(productTypeData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newProductType`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#addProductTypeModalToggle').modal('hide');
        document.getElementById("recordNewProductType").reset();

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const productTypeForm = document.forms.namedItem("recordNewProductType");
productTypeForm.addEventListener("submit", (event) => {

  recordProductType();

  event.preventDefault();

},

  false

);



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
        $('#recordNewProductProjection').modal('hide');
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


// Funciton to retrieve vets listing
const getProjections = async () => {

  const projections = await getListing('projections');

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('projectionListing');

  projections.listing.forEach(projection => {
    htmlSegment = `
    <tr class="justify-content-center" onclick="viewProjection('${projection.projection_id}', ' ${projection.title}', '${projection.production_qnty + ' ' + projection.measure}')" id="${projection.projection_id}">
      <td class="text-center"> ${projection.id} </td>   
      <td class="text-center"> ${projection.title} </td> 
      <td class="text-center"> ${projection.description} </td> 
      <td class="text-center"> ${projection.product_type} </td> 
      <td class="text-center"> ${projection.production_qnty + ' ' + projection.measure} </td>
      <td class="text-center"> ${dateFrontend(projection.product_start_date)} </td>
    </tr>

  `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}

const viewProjection = (param1, param2, param3) => {

  $('#productGraphModalToggle').modal('show');

  document.getElementById('projectionsModalLabel').innerText = `${param2} PROJECTION`;
  document.getElementById('expected_qnty').setAttribute("value", param3)

  var xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  var yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

  // Define Data
  var data = [{
    x: xArray,
    y: yArray,
    mode: "lines",
    type: "scatter"
  }];

  // Define Layout
  var layout = {
    xaxis: { range: [40, 160], title: "Square Meters" },
    yaxis: { range: [5, 16], title: "Price in Millions" },
    title: "House Prices vs Size"
  };

  // Display using Plotly
  Plotly.newPlot("myPlot", data, layout);

}