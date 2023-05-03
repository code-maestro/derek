// Function to get All feeds
const getProductTypes = async () => {

  const products = await getListing('product_types');

  let tagListed = '';
  let tagList = `<option selected disabled> Choose a Product Type ...</option>`;

  const tag_lstd = document.getElementById('product_projection');

  console.log(products);

  products.listing.forEach(product => {
    tagListed = ` <option id="${product.id}" value="${product.name}">  ${product.name} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}


// Function to get All feeds
const getAnimalList = async () => {

  const selectedProductType = document.getElementById('target_animals');

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
    default:
      console.log(`Sorry`);
  }

  const tag_lstd = document.getElementById('product_projection');

  console.log(products);

  products.listing.forEach(product => {
    tagListed = ` <option id="${product.id}" value="${product.name}">  ${product.name} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}
