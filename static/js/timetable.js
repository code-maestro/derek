
// CREATING THE SCHEDULE
const viewSchedule = async (param) => {

  const schedules = await getScheduleListing(`${param}`);

  let html = "";
  let htmlSegment = "";

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

// // DELETING A TABLE ROW
// function createschedule(param) {
//   const url = `/schedule`;
//   // post body data
//   const user = {
//     id: param
//   };

//   // request options
//   const options = {
//     method: 'POST',
//     body: JSON.stringify(user),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }

//   fetch(url, options)
//     .then(function (response) {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         console.log("😎😎😎😜");
//       }
//       return response;
//     }).then(function (response) {
//       console.log("ok");
//       console.log(response);

//     }).catch(function (error) {
//       console.log(error);
//     });

// }

// Function to get All schedules