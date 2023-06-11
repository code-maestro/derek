// Function Adding new Feed
async function getPredictions() {

  try {

    // Prompt Text
    const prompt_text = document.getElementById('prompt_text').value;

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
        const con = document.getElementById('chat_bot_convo');


        (data.data).forEach(data => {
          htmlSegment = `
            <span class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"> ${data.expiry_timestamp} </h5>
              <small class="text-body-secondary"> x </small>
            </div>
            <p class="mb-1"> ${data.otp}  </p>
          </span>`;

          html += htmlSegment;

        });

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
  getPredictions();
  event.preventDefault();
},
  false
);
