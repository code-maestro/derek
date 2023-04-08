async function recordVet() {
    try {

        // post body data 
        const vetData = {
            vetFname: document.getElementById('vet-fname').value,
            vetLname: document.getElementById('vet-lname').value,
            vetPhone: document.getElementById('vet-phone').value,
            vetEmail: document.getElementById('vet-mail').value,
            vetStation: document.getElementById('vet-station').value
        };

        console.log(vetData);

        // request options
        const options = {
            method: 'POST',
            body: JSON.stringify(vetData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(`/newVet`, options);

        if (!response.ok) {

            console.log(`HTTP error: ${response.status}`);

        } else {

            const data = await response.json();

            console.log(data);

            if (data.status == 200) {

                $('#successModalToggle').modal('show');
                document.getElementById('success-msg').innerText = data.message;
                $('#newVetToggle').modal('hide');
                // document.getElementById("wrongCredentials").innerText = `Incorrect Email or Password`;

            } else {

                $('#errModalToggle').modal('show');

                document.getElementById('errors-msg').innerText = data.message;

            }

        }

    }

    catch (error) { console.log(error); }

}


const vetForm = document.forms.namedItem("recordVet");

vetForm.addEventListener("submit", (event) => {

    recordVet();

    event.preventDefault();

},

    false

);
