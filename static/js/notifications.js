
// Function to get All feeds
const getNotifications = async () => {

  const notifications = await getListing('notifications');
  let total = await getCount('totalNotifications');

  document.getElementById("farma-notifications-count").innerHTML = `${total.count[0].COUNT}`;

  document.getElementById("farma-notifications").innerHTML = `<div class="mr-3">
  <div class="icon-circle bg-primary">
      <i class="fas fa-file-alt text-white"></i>
  </div>
</div>
<div>
  <div class="small text-gray-500"> ${dateFrontend(notifications.listing[0].action_date)} </div>
  <span class="font-weight-bold"> ${notifications.listing[0].action} </span>
</div>`;

}