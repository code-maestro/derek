// Function to get All feeds
const getReportTypes = async () => {

  const reportTypes = await getListing('report_types');

  let tagListed = '';
  let tagList = `<option selected disabled> Choose a Report Type ...</option>`;

  const tag_lstd = document.getElementById('rpt_type');

  reportTypes.listing.forEach(report_type => {

    const string = report_type.name;

    tagListed = ` <option id="${string}" value="${string}">  ${string.slice(4)} </option> `;
    tagList += tagListed;
  });

  tag_lstd.innerHTML = tagList;

}


// Function to call api end point to fetch and Authenticate OTP
async function getReportData() {
  try {
    // query parameters
    const from_dt = document.getElementById('from_dt').value;
    const to_dt = document.getElementById('to_dt').value;
    const rpt_type = document.getElementById('rpt_type').value;

    // request options
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/rpt_headers?type=${rpt_type}`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const headers = await response.json();

      if (headers.status == 200) {

        const res = await fetch(`/rpt_data?from_dt='${from_dt}'&to_dt='${to_dt}'&type=${rpt_type}`, options);

        if (!res.ok) {

          console.log(`HTTP error: ${res.status}`);

        } else {

          const data = await res.json();

          if (data.status == 200) {

            populateReport(headers.daa, data.data, data.dates, rpt_type);

          } else {

            $('#errModalToggle').modal('show');
            // document.getElementById('errors-msg').innerText = data.message;

          }

        }

      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = headers.message;

      }

    }

  }

  catch (error) { console.log(`${error}`); }

}


const rpt = document.forms.namedItem("filterReport");
rpt.addEventListener("submit", (event) => {
  getReportData();
  event.preventDefault();
},

  false

);


// GETTING REPORT
const populateReport = (headers, param2, count, type) => {

  console.log("type : " + type);

  const effective_dates = [];
  const counted = [];

  let htmlx = "";
  let htmlxSegment = "";
  const conx = document.getElementById('reportHeaders');

  headers.forEach(header => {
    htmlxSegment = `
        <th scope="col" class="text-center font-monospace"> ${header.Field} </th>
      `;

    htmlx += htmlxSegment;

  });

  conx.innerHTML = htmlx;

  let html = "";
  let htmlSegment = "";

  const con = document.getElementById('reportListing');

  param2.forEach(data => {

    effective_dates.push(dateFrontend(data.effective_dt));

    // CHECK RPT TYPE
    switch (type) {
      // all animals report
      case 'rpt_animals':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // sick animals report
      case 'rpt_sick_animals':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
          <td class="text-center"> ${data.ID} </td>  
          <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.DISEASE} </td>
            <td class="text-center"> ${data.VET_NAME} </td>
            <td class="text-center"> ${dateFrontend(data.REPORTED_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.APPOINTMENT_DATE)} </td>
            <td class="text-center"> ${data.CONFIRMED} </td>
          </tr> `;
        break;

      // expecting animals report
      case 'rpt_expecting':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // meat products report
      case 'rpt_beef':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // eggs products report
      case 'rpt_eggs':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // eggs products report
      case 'rpt_eggs':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // eggs products report
      case 'rpt_goat_meat':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // dairy product report
      case 'rpt_milk':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.ANIMAL_TAG} </td>
            <td class="text-center"> ${data.GENDER} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      // dairy product report
      case 'rpt_milk':
        htmlSegment = `
          <tr class="justify-content-center" id="${data.ID}">
            <td class="text-center"> ${data.ID} </td>
            <td class="text-center"> ${data.TITLE} </td>
            <td class="text-center"> ${data.QUANTITY} </td>
            <td class="text-center"> ${data.ACTUAL_QUANTITY} </td>
            <td class="text-center"> ${dateFrontend(data.REGISTRATION_DATE)} </td>
            <td class="text-center"> ${dateFrontend(data.DATE_OF_BIRTH)} </td>
            <td class="text-center"> ${data.AGE} </td>
          </tr> `;
        break;

      default:

        console.log(` SORRY LOL `);
    }

    html += htmlSegment;

  });

  count.forEach(data => {
    counted.push(data.sumation);
  });

  con.innerHTML = html;

  console.log(counted);

  graph(effective_dates, counted);

}


// Plot graph
const graph = (dates, sumation) => {

  console.log(dates);
  console.log(sumation);

  var trace1 = {
    x: dates,
    y: sumation,
    name: 'Actual',
    type: 'bar'
  };

  var trace2 = {
    x: dates,
    y: sumation,
    name: 'expected',
    type: 'bar'
  };

  var data = [trace1, trace2];

  console.log(data);

  var layout = { barmode: 'group' };

  Plotly.newPlot('charted', data, layout);

}