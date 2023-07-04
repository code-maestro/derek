
// viewing THE SCHEDULE
const viewSchedule = async (type, id) => {

  console.log('TYPE : ' + type);
  console.log("ID : " + id);

  const schedules = await getScheduleListing(`${type}`, `${id}`);

  let html = "";
  let htmlSegment = "";
  let con = "";

  console.log(schedules);

  if (type === "feeding") {

    con = document.getElementById('scheduleTable');

    schedules.listing.forEach(schedule => {

      htmlSegment = `
        <tr class="justify-content-center" data-bs-toggle="tooltip" data-bs-title="Disabled tooltip" id="${schedule.id}">
          <td class="text-center"> ${schedule.id} </td>   
          <td class="text-center"> ${dateFrontend(schedule.effective_date)} </td> 
          <td class="text-center"> ${dateFrontend(schedule.next_date)} </td> 
          <td class="text-center"> ${schedule.feeds_quantity} ${schedule.unit} </td>
          <td class="text-center"> ${schedule.feeds_qnty_pending}  ${schedule.unit} </td>
        </tr>
      `;

      html += htmlSegment;

    });

  } else {


    con = document.getElementById('vaxScheduleTable');

    schedules.listing.forEach(schedule => {

      htmlSegment = `
        <tr class="justify-content-center"  data-bs-toggle="tooltip" data-bs-title="Disabled tooltip" id="${schedule.id}">
          <td class="text-center"> ${schedule.id} </td>   
          <td class="text-center"> ${dateFrontend(schedule.effective_date)} </td> 
          <td class="text-center"> ${dateFrontend(schedule.next_date)} </td> 
          <td class="text-center"> ${schedule.vax_qnty} ${schedule.unit} </td>
          <td class="text-center"> ${schedule.vax_qnty_pending}  ${schedule.unit} </td>
        </tr>
      `;

      html += htmlSegment;

    });


  }

  con.innerHTML = html;

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


async function recordFeedingSchedule() {
  
  try {

    const ttData = {
      timetableTitle: document.getElementById('timetableTitle').value,
      feedingCycle: document.getElementById('feeding-cycle').value,
      feedingPeriod: document.getElementById('fPeriod').value,
      feedingQuantityPerCycle: document.getElementById('feeding-quantity').value,
      feedingQuantityPerCycleUnit: document.getElementById('feedQuantityMeasure').value,
      plannedQnty: document.getElementById('plannedQnty').value,
      plannedQntyMeasure: document.getElementById('plannedQntyMeasure').value,
      feedingStartDate: document.getElementById('feedingStartDate').value,
      feedsID: document.getElementById('feeds_id').value
    }


    console.log(ttData);

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(ttData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/newTimeTable`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data);

      if (data.status == 200) {

        $('#successModalToggle').modal('show');
        document.getElementById('success-msg').innerText = data.message;
        $('#newFeedingTimetableModalToggle').modal('hide');
        document.getElementById("newFeedingTT").reset();
        // document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password`;

      } else {

        $('#errModalToggle').modal('show');

        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}


const feedingTTForm = document.forms.namedItem("newFeedingTT");
feedingTTForm.addEventListener("submit", (event) => {
  recordFeedingSchedule();
  event.preventDefault();
},

  false

);