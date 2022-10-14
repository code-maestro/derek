
// Function to get All feeds
const getBreedAnimals = async () => {
    const animals = await getListing('notHeavyAnimals');

    let tagListed = '';
    let tagList = `<option selected disabled> Choose an Animal Tag ...</option>`;

    const tag_lstd = document.getElementById('breeding_animal');

    animals.listing.forEach(animal => {

        document.getElementById('breeding_animal_id').value = animal.id;
        document.getElementById('gestation_period').value = animal.period;

        tagListed = ` <option id="${animal.id}" value="${animal.animal_tag}">  ${animal.animal_tag} </option> `;
        tagList += tagListed;
    });

    tag_lstd.innerHTML = tagList;

}


// Funciton invoked on changes
const getGender = async () => {
    const notHeavyAnimals = await getListing('notHeavyAnimals');

    const the_animal = document.getElementById('breeding_animal');

    const the_genders = [];
    const the_tags = [];

    // PUSHING TO VACCINES ARRAY
    notHeavyAnimals.listing.forEach(notheavy => {
        the_genders.push(notheavy.gender);
        the_tags.push(notheavy.animal_tag);
    });

    console.log(the_animal.value);
    if (the_tags.includes(the_animal.value)) {
        let getIndex = the_tags.indexOf(the_animal.value);

        console.log(getIndex);

        console.log(the_genders.at(getIndex));

        document.getElementById('breeding_gender').setAttribute('value', the_genders.at(getIndex));

    }

}


// Function to calculate the due date based on the gestation period of the animal type selected
const calcDueDate = () => {
    const due_date = new Date();
    due_date.setDate(due_date.getDate() + parseInt(document.getElementById('gestation_period').value));
    document.getElementById('expected_due_date').value = formatDate(due_date);

    console.log(document.getElementById('expected_due_date').value);

}