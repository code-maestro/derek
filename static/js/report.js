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

        console.log(headers.daa);

        const res = await fetch(`/rpt_data?from_dt='${from_dt}'&to_dt='${to_dt}'&type=${rpt_type}`, options);

        if (!res.ok) {

          console.log(`HTTP error: ${res.status}`);

        } else {

          const data = await res.json();

          if (data.status == 200) {

            console.log(data.data);

            populateReport(headers.daa, data.data);

          } else {

            console.log(data);

            $('#errModalToggle').modal('show');
            document.getElementById('errors-msg').innerText = data.message;

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
const populateReport = (headers, param2) => {

  const effective_dates = [];

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

    htmlSegment = `
        <tr class="justify-content-center" id="${data.id}">
          <td class="text-center"> ${data.id} </td>
          <td class="text-center"> ${data.animal_tag} </td>
          <td class="text-center"> ${data.gender} </td>
          <td class="text-center"> ${data.dob} </td>
          <td class="text-center"> ${dateFrontend(data.effective_dt)} </td>
        </tr>

      `;

    html += htmlSegment;

  });

  con.innerHTML = html;

  graph(effective_dates);

}


// Plot graph
const graph = (param) => {
  var trace1 = {
    x: param,
    y: [20, 14, 23],
    name: 'SF Zoo',
    type: 'bar'
  };

  var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'LA Zoo',
    type: 'bar'
  };

  var data = [trace1, trace2];

  var layout = { barmode: 'stack' };

  Plotly.newPlot('charted', data, layout);

}