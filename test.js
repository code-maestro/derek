// var date = new Date();
// console.log(date);
// var date2= new Date('2013-02-11T10:12:50.5000z');

// // console.log(date.toLocaleDateString('YYYY-MM-dd'));'2/10/2015'

// const formatYmd = date.toISOString().slice(0, 10); // Example formatYmd(new Date())

// function daysIntoYear(date){
//   return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date2.getFullYear(),date2.getMonth(), date2.getDate())) / 24 / 60 / 60 / 1000;
// }

// console.log(daysIntoYear(date, date2));

// console.log(2022-2000);

// console.log(new Intl.DateTimeFormat('en-CA').format(new Date()));
// console.log(formatYmd);

// const aran = 'vaccine'

// const queries = {
//   vaccine: `DELETE FROM vaccine`,
//   animal: `DELETE FROM animal `
// }

// console.log(); // John

var x=360;
var y = x==1 ? "DAY" : x==7 ? "WEEK" : x==30 ? "MONTH" : "YEAR";
console.log(y);