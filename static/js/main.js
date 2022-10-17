// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

})()


const getAuditTrail = async () => {
  let events = await getListing("systemAudit");

  let html = '';
  let htmlSegment = '';

  const con = document.getElementById('events');

  events.listing.forEach(event => {

    console.log(event);
    
    htmlSegment = `
        <li style="font-size: 14px;" class="list-group-item font-monospace fw-normal"> ${event.action} at ${formatDate(event.action_date) + ' ' +formatTime(event.action_date)} </li>
      `;

    html += htmlSegment;

  });

  con.innerHTML = html;
}

setInterval(getAuditTrail, 5000);