
const loadVets = async () => {
    console.log("😂");
}

const addVet = async (e) => {
    e.preventDefault();
    console.log("😊😊😊😊😊😊");
    console.log("affsdfsa");
    const form = document.getElementById('newVetForm');
    console.log("😊😊😊😊😊😊");
    const formData = new FormData(form);

    console.log(formData);

    // fetch('/newVet', {
    //     method: "POST",
    //     body: JSON.stringify(_data),
    //     headers: { "Content-type": "application/json; charset=UTF-8" }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    //     .catch (err => console.log(err));

}