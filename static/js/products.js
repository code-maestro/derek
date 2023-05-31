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

      console.log(product);

      htmlSegment = `
        <tr onclick="viewProductType('${product.type_id}', '${product.name}','${product.currency_code}','${product.price}', '${product.price_qty}', '${product.price_qnty}')" class="justify-content-center" id="${product.type_id}">
          <td class="text-center"> ${product.type_id} </td>   
          <td class="text-center"> ${product.name} </td> 
          <td class="text-center"> ${product.currency_code + ' ' + product.price + '/' + product.price_qty} </td> 
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

  let products = '';
  let tagListed = '';
  let tagList = `<option selected disabled> Choose an animal(s)...</option>`;

  switch (selectedProductType) {
    // [x] animals listing fixed  
    case 'milk':
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

  console.log(products);

  products.listing.forEach(product => {
    tagListed = ` <option id="${product.id}" value="${product.animal_tag}">  ${product.animal_tag} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}

const calculateTotal = () => {
  const freq = document.getElementById("production_frequency").value;
  const qnty = document.getElementById("production_qnty").value;
  const qnty_unit = document.getElementById("production_measure").value;
  console.log(freq * qnty * qnty_unit);

  document.getElementById('all_production_qnty').setAttribute("value", (freq * qnty * qnty_unit));

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
      production_animal_list: picked_animals.toString()
    };

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

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#addProductProjectionModalToggle').modal('hide');
        document.getElementById("recordPrdtProjections").reset();
        document.getElementById('targeted').innerHTML = "";

        renderAnimals();

      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const productForm = document.forms.namedItem("recordPrdtProjection");
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

    const viewProj = {
      id: projection.projection_id,
      name: projection.title
    }

    htmlSegment = `
    <tr class="justify-content-center" onclick="viewProjection(${viewProj})" id="${projection.projection_id}">
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


// VIEW PRJECTION SCHEDULES.
const viewProjection = async (param) => {

  console.log(param);

  document.getElementById("projectionsModalLabel").innerText = param.name;

  const projectedData = await getScheduleListing("product", `${param.id}`);

  $('#productGraphModalToggle').modal('show');

  const today = new Date();

  let html = "";
  let htmlSegment = "";

  const con = document.getElementById('projectionsListing');

  projectedData.listing.forEach(projection => {

    const read = today.getTime() > new Date(projection.effective_dt).getTime() ? "readonly" : "";

    htmlSegment = `
        <tr class="justify-content-center" id="${projection.id}">
          <td class="text-center"> ${projection.id} </td>
          <td class="text-center dated"> ${dateFrontend(projection.effective_dt)}</td>
          <td class="text-center"> ${projection.product_qnty} </td>
          <td class="text-center"> ${projection.actual_qnty === null || projection.actual_qnty === undefined
        ? `
          <input type="number" id="${projection.schedule_id}" class="form-control" ${read}>
      
        `
        : projection.actual_qnty}
           </td>

           <td class="text-center"> ${projection.measure} </td>
          
          <td class="text-center">
            <button type="button" onclick="saveProduction('${projection.schedule_id}')" class="btn btn-sm btn-primary">
              Save
            </button>

            <button type="button" class="btn btn-sm btn-danger"  data-bs-toggle="modal" data-bs-target="#approveModalToggle" onclick="deleteFromList('product_schedule','${projection.schedule_id}')">
              Delete
            </button>
          </td>

        </tr>

      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}


const viewProductType = (type_id, name, code, price, qnty_tag, qnty) => {

  $('#productTypeDetailsModalToggle').modal('show');

  document.getElementById('product_type_title').setAttribute("value", name);
  document.getElementById('product_type_price').value = price;
  document.getElementById('product_currency').value = code;
  document.getElementById('value_from_db').value = qnty;
  document.getElementById('value_from_db').innerText = qnty_tag;
  document.getElementById('product_type_id').value = type_id;

}


// Function Adding new Feed
async function editProductType() {

  try {
    // post body data 
    const typeData = {
      product_type_title: document.getElementById('product_type_title').value,
      product_type_price: document.getElementById('product_type_price').value,
      product_currency: document.getElementById('product_currency').value,
      product_type_qnty: document.getElementById('product_type_qnty').value,
      product_type_id: document.getElementById('product_type_id').value
    };

    console.log(typeData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(typeData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/editProductType`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#productTypeDetailsModalToggle').modal('hide');

      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const editProductTypeForm = document.forms.namedItem("modifyProductType");
editProductTypeForm.addEventListener("submit", (event) => {
  editProductType();
  event.preventDefault();
},

  false

);



// Function Adding new Product
async function saveProduction(param) {

  try {
    // post body data 
    const prdtData = {
      product_quantity: document.getElementById(`${param}`).value,
      product_id: param
    };

    console.log(prdtData);


    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(prdtData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/recordProduction`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;

      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}