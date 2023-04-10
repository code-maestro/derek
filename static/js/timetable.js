
// viewing THE SCHEDULE
const viewSchedule = async (param) => {

  const schedules = await (`${param}`);

  let html = "";
  let htmlSegment = "";

  console.log(schedules);

  const con = document.getElementById('scheduleTable');

  schedules.listing.forEach(schedule => {

    htmlSegment = `
    <tr class="justify-content-center" id="${schedule.id}">
      <td class="text-center"> ${schedule.id} </td>   
      <td class="text-center"> ${dateFrontend(schedule.effective_date)} </td> 
      <td class="text-center"> ${dateFrontend(schedule.next_date)} </td> 
      <td class="text-center"> ${schedule.feeds_quantity} ${schedule.unit} </td>
      <td class="text-center"> ${schedule.feeds_qnty_pending}  ${schedule.unit} </td>
    </tr>
  `;

    html += htmlSegment;

  });

  con.innerHTML = html;

}


// VALIDATION OF WEIG QNTY
const validateQuantity = async (param) => {

  console.log(param);

  const plannedQnty = document.getElementById('plannedQnty');
  const ogFeedsQnty = document.getElementById('feeds-quantity');


}

async function recordSchedule() {
  try {

      // post body data 
      const scheduleData = {
        vaxID: document.getElementById('vaxID').value,
        scheduled_first_date: document.getElementById('scheduled_first_date').value,
        animalTag: document.getElementById('all-animals-tag').value,
        vetID: document.getElementById('vetID').value
      };

      console.log(scheduleData);

      // request options
      const options = {
          method: 'POST',
          body: JSON.stringify(scheduleData),
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const response = await fetch(`/scheduleVaccination`, options);

      if (!response.ok) {

          console.log(`HTTP error: ${response.status}`);

      } else {

          const data = await response.json();

          console.log(data);

          if (data.status == 200) {

              $('#successModalToggle').modal('show');
              document.getElementById('success-msg').innerText = data.message;
              $('#vaccinateModalToggle').modal('hide');
              document.getElementById("recordVaxSchedule").reset();
              // document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password`;

          } else {

              $('#errModalToggle').modal('show');

              document.getElementById('errors-msg').innerText = data.message;

          }

      }

  }

  catch (error) { console.log(error); }

}


const scheduleForm = document.forms.namedItem("recordSchedule");

scheduleForm.addEventListener("submit", (event) => {

  recordSchedule();

  event.preventDefault();

},

  false

);