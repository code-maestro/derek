// TODO implement this function to fetch diseases from DB
async function getDiseases(params) {
  let url = `/getDiseases/${params}`;
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

// TODO run tests on the conditional data return based on gender
// TODO test table in table for symptoms
async function getDiseasesListing(params) {
  let html = '';
  let htmlSegment = '';
  const con = document.getElementById('diseasesListing');

  if (params === '♂️') {
    let list = await getDiseases('male');
    list.diseases.forEach(disease => {
      htmlSegment = `
        <tr class="justify-content-center" id="${disease.id}">
         
        </tr>
      `;
      html += htmlSegment;
    });
  } else {
    let list = await getDiseases('female');
    list.disease.forEach(animal => {
      htmlSegment = `
        <tr class="justify-content-center" id="${disease.id}">
          
        </tr>
      `;
      html += htmlSegment;
    });
  }

  con.innerHTML = html;

}

// TODO run tests on this function
function viewDiseases(param) {
  switch (param) {
    // TODO return female diseases
    case '♀️':
      getDiseasesListing('♀️');
      container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> Disease Name </th>
                      <th scope="col" class="text-center"> Type </th>
                      <th scope="col" class="text-center"> Signs </th>
                      <th scope="col" class="text-center"> Symptoms </th>
                      <th scope="col" class="text-center"> Cause </th>
                      <th scope="col" class="text-center"> Infection Area </th>
                    </tr>
                  </thead>
                  <tbody id="diseasesListing"> </tbody>
                </table>
              </p>
            </div>
          </div> `;
      break;

    // TODO return male diseases
    case '♂️':
      getDiseasesListing('♀️');
      container.innerHTML = `
          <div class="card ${param}" id="${param}ss">
            <h5 class="card-header"> ${param.toUpperCase()}  TABLE </h5>
            <div class="card-body">
              <h5 class="card-title"> ${param} statistics </h5>
              <p class="card-text">
                <table id="generalTable" class="table table-bordered table-hover table-sm">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" class="text-center"> ID </th>
                      <th scope="col" class="text-center"> Disease Name </th>
                      <th scope="col" class="text-center"> Type </th>
                      <th scope="col" class="text-center"> Signs </th>
                      <th scope="col" class="text-center"> Symptoms </th>
                      <th scope="col" class="text-center"> Cause </th>
                      <th scope="col" class="text-center"> Infection Area </th>
                    </tr>
                  </thead>
                  <tbody id="diseasesListing"> </tbody>
                </table>
              </p>
            </div>
          </div> `;
      break;
    default:
      console.log(`Sorry`);
  }
}