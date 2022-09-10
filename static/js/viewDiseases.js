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
async function getDiseasesListing(params) {
  let html = '';
  let htmlSegment = '';
  const con = document.getElementById('diseasesListing');

  if (params === '♂️') {
    let list = await getDiseases('male');
    list.heavyAnimals.forEach(animal => {
      htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${in_date.toDateString()} </td>
          <td class="text-center"> ${d_date.toDateString()} </td>
          <td class="text-center"> ${theYears > 0 ? theYears + ' Year(s)' : ''} ${theMonths > 0 ? theMonths + ' Month(s)' : ''} ${theDays > 0 ? theDays + ' Day(s)' : ''} </td>
        </tr>
      `;
      html += htmlSegment;
    });
  } else {
    let list = await getDiseases('female');
    list.heavyAnimals.forEach(animal => {
      htmlSegment = `
        <tr class="justify-content-center" id="${animal.id}">
          <th scope="row" class="text-center" id="id"> ${animal.id} </th>
          <td class="text-center"> ${animal.animal_tag} </td>
          <td class="text-center"> ${in_date.toDateString()} </td>
          <td class="text-center"> ${d_date.toDateString()} </td>
          <td class="text-center"> ${theYears > 0 ? theYears + ' Year(s)' : ''} ${theMonths > 0 ? theMonths + ' Month(s)' : ''} ${theDays > 0 ? theDays + ' Day(s)' : ''} </td>
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
                      <th scope="col" class="text-center"> ANIMAL TAG </th>
                      <th scope="col" class="text-center"> GENDER </th>
                      <th scope="col" class="text-center"> No OF VACCINATIONS </th>
                      <th scope="col" class="text-center"> REMAINING VACCINATIONS </th>
                      <th scope="col" class="text-center"> NEXT VACCINAION DATE </th>
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