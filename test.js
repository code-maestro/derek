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

// var x=360;
// var y = x==1 ? "DAY" : x==7 ? "WEEK" : x==30 ? "MONTH" : "YEAR";
// console.log(y);


// // crypto module
// const crypto = require("crypto");
// const algorithm = "aes-256-cbc";
// // generate 16 bytes of random data
// const initVector = crypto.randomBytes(16);
// // secret key generate 32 bytes of random data
// const Securitykey = crypto.randomBytes(32);

// const message = "This is a secret message";


// const encryptPassword = (password) => {
//     // the cipher function
//     const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
//     // encrypt the message
//     let encryptedData = cipher.update(password, "utf-8", "hex");
//     encryptedData += cipher.final("hex");

//     return encryptedData;

// }

// console.log(encryptPassword(message));


// // the decipher function
// const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

// let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

// decryptedData += decipher.final("utf8");

// console.log("Decrypted message: " + decryptedData);



// const date = new Date();

// console.log(date);
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();

// // This arrangement can be altered based on how we want the date's format to appear.
// let currentDate = `${day}-${month}-${year}`;
// console.log(currentDate); // "17-6-2022"

// console.log("Add 283 Days to Current Date")
// const d = new Date();
// d.setDate(d.getDate() + 283);
// console.log(d)