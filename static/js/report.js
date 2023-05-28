// Function to get All feeds
const getReportTypes = async () => {

  const reportTypes = await getListing('report_types');

  let tagListed = '';
  let tagList = `<option selected disabled> Choose a Report Type ...</option>`;

  const tag_lstd = document.getElementById('rpt_type');

  reportTypes.listing.forEach(report_type => {
    tagListed = ` <option id="${report_type.name}" value="${report_type.name}">  ${report_type.name} </option> `;
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

    const response = await fetch(`/rpt_data?from_dt='${from_dt}'&to_dt='${to_dt}'&type=${rpt_type}`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      if (data.status == 200) {

        console.log(data.data);

        populateReport(data.data);

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) {
    console.log(`${error}`);
  }

}


const rpt = document.forms.namedItem("filterReport");
rpt.addEventListener("submit", (event) => {
  getReportData();
  event.preventDefault();
},

  false

);

const populateReport = (param) => {

  let html = "";
  let htmlSegment = "";
  const con = document.getElementById('reportListing');

  param.forEach(data => {

    htmlSegment = `
        <tr class="justify-content-center" id="${data.id}">
          <td class="text-center"> ${data.id} </td>
          <td class="text-center"> ${dateFrontend(data.effective_dt)} </td>
        </tr>

      `;

    html += htmlSegment;

  });

  con.innerHTML = html;
}