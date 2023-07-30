async function recordVet() {
    try {
        // post body data 
        const vetData = {
            vetFname: document.getElementById('vet-fname').value,
            vetLname: document.getElementById('vet-lname').value,
            vetPhone: document.getElementById('vet-phone-no').value,
            vetEmail: document.getElementById('vet-mail').value,
            vetStation: document.getElementById('vet-station').value
        };

        console.log(vetData);
        console.log(document.getElementById('vet-phone-no'));
        console.log(document.getElementById('vet-phone-no').value);

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

            if (data.status == 200) {

                $('#successModalToggle').modal('show');
                document.getElementById('success-msg').innerText = data.message;
                $('#newVetToggle').modal('hide');
                document.getElementById("recordNewVet").reset();

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


async function editSelectedVet() {
    try {
        // post body data 
        const vetData = {
            editVetFname: document.getElementById('edit-vet-fname').value,
            editVetLname: document.getElementById('edit-vet-lname').value,
            editVetPhone: document.getElementById('edit-vet-phone').value,
            editVetEmail: document.getElementById('edit-vet-mail').value,
            editVetStation: document.getElementById('edit-vet-station').value,
            editVetID: document.getElementById('edit-vet-uuid').value
        };

        // request options
        const options = {
            method: 'POST',
            body: JSON.stringify(vetData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(`/updateVet`, options);

        if (!response.ok) {

            console.log(`HTTP error: ${response.status}`);

        } else {

            const data = await response.json();

            if (data.status == 200) {

                $('#successModalToggle').modal('show');
                document.getElementById('success-msg').innerText = data.message;
                $('#editVetToggle').modal('hide');
                document.getElementById("updateVetForm").reset();
                

            } else {

                $('#errModalToggle').modal('show');

                document.getElementById('errors-msg').innerText = data.message;

            }

        }

    }

    catch (error) { console.log(error); }

}


const editVetForm = document.forms.namedItem("updateVetForm");
editVetForm.addEventListener("submit", (event) => {
    editSelectedVet();
    event.preventDefault();
},
    false
);
