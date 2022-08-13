// Get data from backend endpoint
async function getUsers() {
  let url = '/getData';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error.json());
  }
}

async function renderUsers() {
  let users = await getUsers();
  if (![false, 0, "", null, undefined, NaN].includes(users)) {
    const animals_at_farm = JSON.parse(JSON.stringify(users));
    animals_at_farm.forEach(animal => {
      console.log(animal);
      document.getElementById('allCount').innerText = animal;
    });
  } else {
    return null;
  }
}

renderUsers()