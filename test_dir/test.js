// const oneDay = 1000 * 60 * 60 * 24;

// var day1 = new Date("08/22/2021");
// var day2 = new Date("08/22/2022");

// var difference= Math.abs(day2-day1);
// days = difference/(1000 * 3600 * 24)

// //console.log(days);

// if (days < 365) {
//   if (days > 30) {
//     console.log(days/30 + ' MONTHS');
//   }else {
//     console.log(days + ' DAYS');
//   }
// }else {
//   if (days/365 == 1) {
    
//   }
//   console.log(days/365 + ' YEARS');
// }

// const today = new Date();
// const yy = today.getFullYear();

// console.log(yy)




// console.log(fruits.includes("Mango"));

// if (fruits.includes("Mango") == true ) {
//   console.log("eeeee");
// }else{
//   console.log("la farge");
// }

// const word = ' +* we THERE!!!'

// console.log(word.replace(/[^\w]/g, ""))

// var myArr = [{x1:0,x2:2000,y:300},{x1:50,x2:250,y:500}];

// console.log(myArr);
// console.log(" ");
// console.log("************");
// console.log(" ");
// console.log(" ");

// for (const i of myArr) {
//   console.log(i.x1);
// }

// console.log(" ");
// console.log(" ");

// console.log("******** 8 ******* ");

// // myArrString = JSON.stringify(myArr);

// // console.log(myArrString);

// function animalDetails(id, array) {
//   console.log(id);
//   console.log(array);
// }

// animalDetails(2, myArr);

// const animal_at_farm = [{
//   type: "req.body.animal_type",
//   number: "req.body.number",
//   image_url: "storage.getItem('img_url')",
//   desc: "req.body.description"
// }];

// console.log(JSON.stringify(animal_at_farm));

const re = /(?<=@).*$/
const from_mail = "mail@mail.com".replace(re, "").replace('@', '');

console.log(from_mail);
