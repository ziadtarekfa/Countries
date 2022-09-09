
// function toggleDark() {
//     document.documentElement.style.setProperty("--primaryColor", "#202d36");
//     document.documentElement.style.setProperty("--secondaryColor", "#2b3743");
//     document.documentElement.style.setProperty("--blackColor", "#ffffff");
// }
// var element = document.getElementsByTagName("button")[0];
// element.addEventListener("click", toggleDark);\


let countriesContainer = document.getElementsByClassName("countries-container")[0];
let searchedCountry = document.getElementById("search");
let selectedRegion = document.getElementById("region-selector");




async function getAllCountries() {
    //https://restcountries.com/v2/all?fields=name,capital,region,population,flags
    const reponse = await fetch("https://restcountries.com/v2/all");
    const data = await reponse.json();
    return data;
}

let i = 0;
getAllCountries().then((data) => {
    console.log("we got data successfully", data[0]);


    data.map((country) => {
        const card = document.createElement("div");
        card.className = 'card';
        card.addEventListener("click", () => handleCardClick(country));
        card.innerHTML =
            `<div class="card-image">
            <img src="${country.flags.svg}" alt="Egypt flag" />
        </div>
        <div class="card-content">
            <h1>${country.name}</h1>
            <p><strong>Population: </strong>${country.population}</p>
            <p id="country-region"><strong>Region: </strong>${country.region}</p>
            <p><strong>Capital: </strong>${country.capital}</p>
        </div>`;

        countriesContainer.append(card);

    });
});

searchedCountry.addEventListener("input", (e) => {

    let input = e.target.value.toLowerCase();
    // console.log(input);
    const countryNames = document.querySelectorAll(".card-content h1");

    countryNames.forEach((countryName) => {
        if (countryName.innerText.toLowerCase().includes(input)) {
            countryName.parentElement.parentElement.style.display = 'block';
        }
        else {
            countryName.parentElement.parentElement.style.display = 'none';
        }
    });
});

selectedRegion.addEventListener("input", (e) => {

    let input = e.target.value;
    console.log(input);
    let countryRegions = document.querySelectorAll("#country-region");
    countryRegions.forEach((countryRegion) => {
        if (countryRegion.innerText.includes(input)) {
            countryRegion.parentElement.parentElement.style.display = 'block';
            console.log(countryRegion.innerText);
        }
        else {
            countryRegion.parentElement.parentElement.style.display = 'none';
        }

    });
});

function handleCardClick(country) {
    console.log("you clicked");
    console.log(country);

    window.location.href = "./CountryDetails.html";


};

