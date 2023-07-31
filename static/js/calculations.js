// Specific date
var date = new Date();
// Add ten days to specified date
date.setDate(date.getDate() + 10);

const validateQnty = (param1, param2, param3) => {

    const dbQnty = document.getElementById(`${param3}`).value;
    const plannedQnty = document.getElementById(`${param1}`).value * document.getElementById(`${param2}`).value;

    // SHOWS TOAST 
    const showClear = (param) => {
        const toastLiveExample = document.getElementById('ttoast');
        const toast = new bootstrap.Toast(toastLiveExample, { delay: 3500 });

        toast.show();

        document.getElementById(`${param1}`).value = '';
        document.getElementById(`${param2}`).value = '';

        document.getElementById('err_msg').innerText = param;

    }

    if (plannedQnty > dbQnty) {
        showClear(" PLease a value less than or equal to the amount stocked ");
        document.getElementById(`${param1}`).value = '';
        document.getElementById(`${param2}`).value = '';

    } else {
        console.log("🤣🤣🤣🤣🤣🤣🤣🤣🤣");
        document.getElementById(`plannedQntyReal`).value = document.getElementById(`${param1}`).value * document.getElementById(`${param2}`).value;
    }

}