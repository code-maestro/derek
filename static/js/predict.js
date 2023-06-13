// Function Adding new Feed
async function getPredictions(param1, param2) {

  try {

    // Prompt Text
    const prompt_text = document.getElementById(`${param1}`).value;

    console.log(prompt_text);

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

      if (data.status == 201) {

        let html = "";
        let htmlSegment = "";

        const con = document.getElementById(`${param2}`);

        if (param1 === 'ssText') {

          let htmlSegment2 = "";
          let html2 = "";
          const conn = document.getElementById(`predicted_symptoms`);

          (data.data).forEach(data => {

            htmlSegment2 = `${data.DESCRIPTION} `;

            html2 += htmlSegment2;

          });

          conn.innerHTML = html2;

          console.log(html2);

          (data.data).forEach(data => {
            
            htmlSegment = `${data.DISEASE_NAME}`;

            html += htmlSegment;

          });

          con.value = html;

        } else {

          (data.data).forEach(data => {
            htmlSegment = `
              <span class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"> ${data.DISEASE_NAME} </h5>
              </div>
              <p class="mb-1"> ${data.DESCRIPTION}  </p>
            </span>`;

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
  getPredictions("prompt_text", "getPredictionForm");
  event.preventDefault();
},
  false
);