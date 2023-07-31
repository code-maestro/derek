// Function Adding new Feed
async function getPredictions(param1, param2) {

  try {
    // Prompt Text
    const prompt_text = document.getElementById(`${param1}`).value;

    // request options
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/predict_disease?prompt=${prompt_text}`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      console.log(data.data);

      if (data.status == 201) {

        let html = "";
        let htmlSegment = "";

        let diseaseList = `<option selected disabled id='default-sick' value=0 > Select suspected Disease ... </option>`;

        const con = document.getElementById(`${param2}`);

        if (param1 === 'ssText') {

          let diseaseListed = "";
          // let htmlSegment2, diseaseListed, html2 = "";
          // const conn = document.getElementById(`predicted_symptoms`);

          // const diseases = await getListing('allDiseases');
          const disease_lstd = document.getElementById('disease_suspected');

          // (data.data).forEach(data => {
          //   htmlSegment2 = `${data.DESCRIPTION} `;
          //   html2 += htmlSegment2;
          // });

          // conn.innerHTML = html2;
          
          (data.data).forEach(disease => {
            console.log(disease);

            diseaseListed = ` <option id="${disease.disease_id}" value="${disease.disease_id}">  ${disease.DISEASE_NAME} </option> `;
            diseaseList += diseaseListed;
            htmlSegment = `${disease.DISEASE_NAME}`;
            html += htmlSegment;
          });

          disease_lstd.innerHTML = diseaseList;
          con.value = html;

        } else {

          (data.data).forEach(data => {
            htmlSegment = `
                <div class="card text-bg-light mb-3">
                  <div class="card-body">
                  <p class="card-text"> Hello, here are similar symptoms, </p>
                  <span>  ${data.DESCRIPTION} </span>.
                  <p> your ${data.animal_type} could be suffering from </p> 
                  <span> ${data.DISEASE_NAME}.</span> 
                  </div>
                </div>`;

            html += htmlSegment;

          });

        }

        con.innerHTML = html;

        // $('#successModalToggle').modal('show');
        // document.getElementById('success-msg').innerText = data.message;
        // $('#addProductTypeModalToggle').modal('hide');
        // document.getElementById("recordNewProductType").reset();

      } else {

        $('#errModalToggle').modal('show');
        document.getElementById('errors-msg').innerText = data.message;

      }

    }

  }

  catch (error) { console.log(error); }

}

const predictionForm = document.forms.namedItem("getPredictionForm");
predictionForm.addEventListener("submit", (event) => {

  // document.getElementById('prompts').innerText = document.getElementById('prompt_text').value;

  getPredictions("prompt_text", "chat_bot_convo");
  event.preventDefault();
},
  false
);

async function getPredictedVaccine() {
  // Predicted Disease
  const predicted_disease = document.getElementById(`disease_suspected`).value;

  try {
    // request options
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(`/predict_vaccine?prompt=${predicted_disease}`, options);

    if (!response.ok) {

      console.log(`HTTP error: ${response.status}`);

    } else {

      const data = await response.json();

      if (data.status == 201) {

        console.log(data);

        (data.data).forEach(vax => {
          document.getElementById(`vaccine-namen`).value = vax.DESCRIPTION;
        });

      } else {

        console.log("errrrrr");

      }

    }


  } catch (error) {

    $('#errModalToggle').modal('show');
    document.getElementById('errors-msg').innerText = data.message;

  }

}