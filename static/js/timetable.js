
// CREATING THE SCHEDULE
const viewSchedule = async (param) => {

  const timetables = await getListing('timetables');
  let html = "";
  let htmlSegment = "";

  const con = document.getElementById('ttable');

  timetables.listing.forEach(timetable => {
    
    console.log(timetable);

    if (timetable.id == param) {

      let n = timetable.quantity;
      let the_date = timetable.first_feed_date;
      let id = timetable.id;

      do {

        while (condition) {
          
        }
        htmlSegment = `
        <tr class="justify-content-center" id="${timetable.id}">
          <td class="text-center"> ${id++} </td>
          <td class="text-center"> ${dateFrontend(the_date)} </td>
          <td class="text-center"> ${dateFrontend(addDays(the_date, timetable.period))} </td>
          <td class="text-center"> ${n} </td>
        </tr>
      `;

        html += htmlSegment;

        console.log(n);

        n = n - timetable.quantity_per_cycle;
        
      } while (n > 0);

      // while (n > 0) {
      //   htmlSegment = `
      //   <tr class="justify-content-center" id="${timetable.id}">
      //     <td class="text-center"> ${id++} </td>
      //     <td class="text-center"> ${dateFrontend(the_date)} </td>
      //     <td class="text-center"> ${dateFrontend(addDays(the_date, timetable.period++))} </td>
      //     <td class="text-center"> ${n} </td>
      //   </tr>
      // `;

      //   html += htmlSegment;

      //   console.log(n);

      //   n = n - timetable.quantity_per_cycle;

      // }

      console.log("😒😊👌💕🤦‍♂️🤦‍♀️😢🎶😎🤞😍😁✌️");

    }

  })

  con.innerHTML = html;

}


// VALIDATION OF WEIG QNTY
const validateQuantity = async (param) => {

  console.log(param);

  const plannedQnty = document.getElementById('plannedQnty');
  const ogFeedsQnty = document.getElementById('feeds-quantity');


}

// // DELETING A TABLE ROW
// function createTimetable(param) {
//   const url = `/timetable`;
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

// Function to get All timetables