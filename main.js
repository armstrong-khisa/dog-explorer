const dogAPI = 'https://dogapi.dog/api/v2'
const loadfact = document.getElementById('load-fact')
const loadbreeds  =  document.getElementById('load-breeds')
const dogsgroups = document.getElementById('dogs-groups')
const dogFact = document.getElementById('dog-facts')
const loadBreedDetails = document.getElementById('load-breeds-details')
const dogBreeds = document.getElementById('breeds')
const dogBreedDetails = document.getElementById('breed-details')
const loadGroups = document.getElementById('load-groups')
const errorMessage = document.getElementById('error')


loadfact.addEventListener('click', async () => {
    try {
        const response = await fetch(`${dogAPI}/facts`)
        const datafact = await response.json()
        dogFact.textContent = datafact.data[0].attributes.body
        
    } catch (error) {
        errorMessage.style.display = 'block'
        errorMessage.textContent = 'Failed to load dog facts. Please try again.'
    }});

loadbreeds.addEventListener('click', async () => {
    try {
        const response = await fetch(`${dogAPI}/breeds`);
        const databreeds = await response.json();

        dogBreeds.innerHTML = ""; // clear previous list

        // get 5 random breeds
        const randomBreeds = databreeds.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        // add to DOM
        randomBreeds.forEach(breed => {
            const listItem = document.createElement('li');
            listItem.textContent = breed.attributes.name;
            dogBreeds.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching dog breeds:', error);
    }
});

loadBreedDetails.addEventListener('click', async () => {
    try {
        const response = await fetch(`${dogAPI}/breeds`);
        const databreedsDetails = await response.json();
        dogBreedDetails.innerHTML = ""; // clear previous details

        // get a random breed
        const randomBreed = databreedsDetails.data[Math.floor(Math.random() * databreedsDetails.data.length)];
        const breedInfo = randomBreed.attributes;

        // display breed details
        dogBreedDetails.innerHTML = `
            <p>Name: ${breedInfo.name}</p>
            <p>Life Span: ${breedInfo.life.max || 'N/A'}</p>
            <p>Hypoallergenic: ${breedInfo.hypoallergenic || 'N/A'}</p>
            <p>Male Weight: ${breedInfo.male_weight.max || 'N/A'}</p>
            <p>Female Weight: ${breedInfo.female_weight.max || 'N/A'}</p>
        `;

    } catch (error) {
        errorMessage.style.display = 'block'
        errorMessage.textContent = 'Failed to load breed details. Please try again.'
    }
});

loadGroups.addEventListener('click', async () => {
    try {
        const response = await fetch(`${dogAPI}/groups`);
        const datagroups = await response.json();
        dogsgroups.innerHTML = ""; // clear previous list

        // get 5 random groups
        const randomGroups = datagroups.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        // add to DOM
        randomGroups.forEach(group => {
            const listItem = document.createElement('li');
            listItem.textContent = group.attributes.name;
            dogsgroups.appendChild(listItem);
        });

    } catch (error) {
        errorMessage.style.display = 'block'
        errorMessage.textContent = 'Failed to load dog groups. Please try again.'
    }
});