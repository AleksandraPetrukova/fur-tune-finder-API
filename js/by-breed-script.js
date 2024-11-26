const breedsUrl = "https://api.thecatapi.com/v1/breeds/";
const imagesUrl = "https://api.thecatapi.com/v1/images/search?breed_ids=";
const main = document.querySelector("main");
const breedSearch = document.getElementById("breedSearch");
const searchResultsDiv = document.getElementById("searchResultsDiv");
const breedInfoDiv = document.getElementById("breedInfoDiv");

let matchedBreeds = []; // Variable to store the currently matched breeds

const fetchBreeds = async () => {
    const response = await fetch(breedsUrl);
    const breeds = await response.json();
    return breeds;
};

const filterBreeds = (breeds, searchTerm) => {
    return breeds.filter((breed) =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const getimgURL = async (imgID) => {
    const breedIMGLInk = `https://api.thecatapi.com/v1/images/${imgID}`;
    const imgResponce = await fetch(breedIMGLInk);
    const randomBreedImg = await imgResponce.json();

    console.log(randomBreedImg);
    return randomBreedImg.url; // Return the image URL from the response
};

const displayMatchedBreeds = (breeds) => {
    searchResultsDiv.innerHTML = ""; // Clear the matched breed results
    matchedBreeds = breeds; // Store the matched breeds for later use
    breeds.forEach((breed) => {
        const breedDiv = document.createElement("div");
        breedDiv.textContent = breed.name;
        breedDiv.classList.add("breed-option");
        searchResultsDiv.appendChild(breedDiv);

        // Add click event to each matched breed div to show breed info and clear the search bar
        breedDiv.addEventListener("click", async () => {
            try {
                const imgURL = await getimgURL(breed.reference_image_id);
                breedInfoDiv.innerHTML = "";
                displayCatInfo(breed, imgURL);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
            searchResultsDiv.innerHTML = ""; // Hide matched breed results when a breed is clicked
            breedSearch.value = ""; // Clear the search bar's value
        });
    });
};

// const displayCatInfo = (data, imgURL) => {
//     // Display breed info here using 'data'
//     // For example:
//     console.log(data);
//     breedInfoDiv.innerHTML = `
//     <img src="${imgURL}">
//     <h2>${data.name}</h2>
//     <p><b>Description:</b> ${data.description}</p>`;
// };

const handleSearchInput = async () => {
    const searchTerm = breedSearch.value;
    if (!searchTerm) {
        searchResultsDiv.innerHTML = ""; // Clear the matched breed results
    }

    const breeds = await fetchBreeds();
    const filteredBreeds = filterBreeds(breeds, searchTerm);
    displayMatchedBreeds(filteredBreeds);
};

const hideMatchedBreeds = () => {
    searchResultsDiv.innerHTML = ""; // Clear the matched breed results
};

// Add event listener to handle search input
breedSearch.addEventListener("input", handleSearchInput);

// Add global click event listener to hide matched results when clicking anywhere on the screen
document.addEventListener("click", () => {
    hideMatchedBreeds();
    breedSearch.value = ""; // Clear the search bar's value when clicking anywhere
});

const displayCatInfo = (data, dataimg) => {
    // console.log(dataimg);
    console.log(data.alt_names);

    //show image of the random cat breed
    let section_img = document.createElement("section");
    section_img.innerHTML = `<img src="${dataimg}" alt="image of cat">`;
    breedInfoDiv.appendChild(section_img);

    let section_name = document.createElement("section");
    if (data.alt_names && data.name !== data.alt_names) {
        section_name.innerHTML = `<h2 class="breed-name">${data.name}</h2><h3 class="breed-altname">${data.alt_names}</h3>`;
    } else {
        section_name.innerHTML = `<h2 class="breed-name">${data.name}</h2>`;
    }
    breedInfoDiv.appendChild(section_name);

    let section_info = document.createElement("section");
    let hypoallergenic;
    if (data.hypoallergenic == 0) {
        hypoallergenic = `Hypoallergenic: No`;
    } else {
        hypoallergenic = `Hypoallergenic: Yes`;
    }
    section_info.innerHTML = `
        <h4>Origin: ${data.origin}</h4>
        <h4>Life Span: ${data.life_span} years</h4>
        <h4>Weight: ${data.weight.metric}kg.</h4>
        <h4>${hypoallergenic}</h4>
        <h4>Temperament: ${data.temperament}</h4>
        <div class="line"></div>
        <h4>Description: ${data.description}</h4>
    `;
    breedInfoDiv.appendChild(section_info);

    let section_level = document.createElement("section");
    section_level.classList.add("section-lvl");
    let key = "circle-cont";

    let affection_level = document.createElement("div");
    let info_number_af = data.affection_level;
    affection_level.classList.add("lvl-card");
    affection_level.innerHTML = `<h4>Affection:</h4>`;
    affection_level.appendChild(createCircle(info_number_af, key)); // Append the circle_container element
    section_level.appendChild(affection_level);

    let energy_level = document.createElement("div");
    let info_number_en = data.energy_level;
    energy_level.classList.add("lvl-card");
    energy_level.innerHTML = `<h4>Energy:</h4>`;
    energy_level.appendChild(createCircle(info_number_en, key));
    section_level.appendChild(energy_level);

    let intelligence_level = document.createElement("div");
    let info_int = data.intelligence;
    intelligence_level.classList.add("lvl-card");
    intelligence_level.innerHTML = `<h4>Intelligence:</h4>`;
    intelligence_level.appendChild(createCircle(info_int, key));
    section_level.appendChild(intelligence_level);

    let social_needs_level = document.createElement("div");
    let info_soc = data.social_needs;
    social_needs_level.classList.add("lvl-card");
    social_needs_level.innerHTML = `<h4>Social needs:</h4>`;
    social_needs_level.appendChild(createCircle(info_soc, key));
    section_level.appendChild(social_needs_level);

    let child_friendly_level = document.createElement("div");
    let info_chf = data.child_friendly;
    child_friendly_level.classList.add("lvl-card");
    child_friendly_level.innerHTML = `<h4>Child friendly:</h4>`;
    child_friendly_level.appendChild(createCircle(info_chf, key));
    section_level.appendChild(child_friendly_level);

    let dog_friendly_level = document.createElement("div");
    let info_df = data.dog_friendly;
    dog_friendly_level.classList.add("lvl-card");
    dog_friendly_level.innerHTML = `<h4>Dog friendly:</h4>`;
    dog_friendly_level.appendChild(createCircle(info_df, key));
    section_level.appendChild(dog_friendly_level);

    let grooming_level = document.createElement("div");
    let info_gr = data.grooming;
    grooming_level.classList.add("lvl-card");
    grooming_level.innerHTML = `<h4>Grooming:</h4>`;
    grooming_level.appendChild(createCircle(info_gr, key));
    section_level.appendChild(grooming_level);

    let shedding_level = document.createElement("div");
    let info_shed = data.shedding_level;
    shedding_level.classList.add("lvl-card");
    shedding_level.innerHTML = `<h4>Shedding:</h4>`;
    shedding_level.appendChild(createCircle(info_shed, key));
    section_level.appendChild(shedding_level);

    let health_issues_level = document.createElement("div");
    let info_hli = data.health_issues;
    health_issues_level.classList.add("lvl-card");
    health_issues_level.innerHTML = `<h4>Health issues:</h4>`;
    health_issues_level.appendChild(createCircle(info_hli, key));
    section_level.appendChild(health_issues_level);

    let vocalisation_level = document.createElement("div");
    let info_voc = data.vocalisation;
    vocalisation_level.classList.add("lvl-card");
    vocalisation_level.innerHTML = `<h4>Vocalisation:</h4>`;
    vocalisation_level.appendChild(createCircle(info_voc, key));
    section_level.appendChild(vocalisation_level);

    let adaptability = document.createElement("div");
    let info_adap = data.adaptability;
    adaptability.classList.add("lvl-card");
    adaptability.innerHTML = `<h4>Adaptability:</h4>`;
    adaptability.appendChild(createCircle(info_adap, key));
    section_level.appendChild(adaptability);

    let stranger_friendly_level = document.createElement("div");
    let info_strfr = data.stranger_friendly;
    stranger_friendly_level.classList.add("lvl-card");
    stranger_friendly_level.innerHTML = `<h4>Stranger friendly:</h4>`;
    stranger_friendly_level.appendChild(createCircle(info_strfr, key));
    section_level.appendChild(stranger_friendly_level);

    breedInfoDiv.appendChild(section_level);

    let section_wiki = document.createElement("section");
    section_wiki.innerHTML = `<a href="${data.wikipedia_url}" target="_blank" class="wiki-link">Cat-astic facts on Wikipedia! 🐱</a>`;
    breedInfoDiv.appendChild(section_wiki);
};

const createCircle = (number, key) => {
    let circle_container = document.createElement("div");
    circle_container.classList.add(key);
    for (let i = 1; i <= 5; i++) {
        let circle = document.createElement("div");
        circle.classList.add("circle");
        if (number >= i) {
            circle.classList.add("active");
        }
        circle_container.appendChild(circle);
    }
    return circle_container;
};
