
// CREATING THE SCHEDULE
const viewSchedule = async (param) => {

  const timetables = await getListing('timetables');
  let html = "";
  let htmlSegment = "";

  const con = document.getElementById('ttable');

  timetables.listing.forEach(timetable => {

    if (timetable.id == param) {

      let n = timetable.quantity;

      while (n > 0) {
        htmlSegment = `
        <tr class="justify-content-center" id="${timetable.id}">
          <td class="text-center"> ${timetable.id} </td>
          <td class="text-center"> ${timetable.first_feed_date} </td>
          <td class="text-center"> ${dateFrontend(timetable.next_feed_date)} </td>
          <td class="text-center"> ${n} </td>
        </tr>
      `;

        html += htmlSegment;

        console.log(n);

        n = n - 4;

      }

      console.log("😒😊👌💕🤦‍♂️🤦‍♀️😢🎶😎🤞😍😁✌️");

    }
  })

  con.innerHTML = html;

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