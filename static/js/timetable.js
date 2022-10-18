// document.getElementById('generateSchedule').addEventListener('onclick', (e) => {
//     // e.preventDefault();
//     console.log('FORM LOGGED');
// });



const handleTimetable = (e) => {
  return console.log('lololo');
}


// CREATING THE FEEDING SCHEDULE
const viewSchedule = async (param) => {

  const timetables = await getListing('timetables');

  timetables.listing.forEach(timetable => {
    if (timetable.id == param) {
      console.log(timetable);
      console.log("😒😊👌💕🤦‍♂️🤦‍♀️😢🎶😎🤞😍😁✌️");
    }
  })
}
