// Specific date
var date = new Date();
// Add ten days to specified date
date.setDate(date.getDate() + 10);

const validateQnty = (param1, param2) => {
    if (document.getElementById(param1).value < document.getElementById(param2).value) {

        console.log("lalallalallllalallallalal");

        document.getElementById(param2).setAttribute('value', '');
    }
}