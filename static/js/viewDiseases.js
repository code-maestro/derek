// TODO run tests on this function
const viewDiseases = async () => {
  let html = '';
  let htmlSegment = '';
  const con = document.getElementById('diseasesListing');

  let list = await getListing('disease');

  list.diseases.forEach(disease => {
    htmlSegment = `
        <tr class="justify-content-center" id="${disease.id}">
        <th scope="col" class="text-center"> ID </th>
        <th scope="col" class="text-center"> Disease Name </th>
        <th scope="col" class="text-center"> Type </th>
        <th scope="col" class="text-center"> Signs </th>
        <th scope="col" class="text-center"> Symptoms </th>
        <th scope="col" class="text-center"> Cause </th>
        <th scope="col" class="text-center"> Infection Area </th>
        </tr>
      `;
    html += htmlSegment;
  });

  con.innerHTML = html;

}