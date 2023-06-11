
// Function to get All feeds
const getNotifications = async () => {

  const notifications = await getListing('notifications');
  let total = await getCount('totalNotifications');

  let html = "";
  let htmlSegment = "";
  let notis = [];
  const con = document.getElementById('all-notis');

  total === null || total === undefined ? document.getElementById("farma-notifications-count").innerHTML = 0 : document.getElementById("farma-notifications-count").innerHTML = `${total.count[0].COUNT}`;

  notifications === null || notifications === undefined ? console.log("nothing found") : notis = notifications.listing;

  notis.forEach(data => {
    htmlSegment = `
      <span class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1"> ${data.action} </h5>
        <small class="text-body-secondary"> x </small>
      </div>
      <p class="mb-1">${data.names} - ${dateFrontend(data.action_date)}  </p>
    </span>`;

    html += htmlSegment;

  });

  con.innerHTML = html;

  document.getElementById("farma-notifications").innerHTML = `
      <div class="mr-3">
        <div class="icon-circle bg-primary"> <i class="fas fa-file-alt text-white"></i>  </div>
      </div>
      <div>
        <div class="small text-gray-500"> ${dateFrontend(notifications.listing[0].action_date)} </div>
        <span class="font-weight-bold"> ${notifications.listing[0].action} </span>
      </div>`;

}
