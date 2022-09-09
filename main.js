
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


function showCountries() {
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
}
showCountries();

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

    let backButton = document.getElementsByClassName("back-btn")[0];
    let filterContainer = document.getElementsByClassName("filter-container")[0];
    console.log(filterContainer);

    filterContainer.style.setProperty("display", "none");
    backButton.style.setProperty("display", "block");

    backButton.addEventListener("click", () => {


        filterContainer.style.setProperty("display", "flex");
        backButton.style.display = "none";
        countriesContainer.innerHTML = ``;
        countriesContainer.className = 'countries-container';
        showCountries();
    });







    countriesContainer.className = "container";
    countriesContainer.innerHTML =
        `<section class="flag">
    <img src="${country.flags.svg}" />
</section>

<section class="details-content">

    <h1>Belgium</h1>
    <section class="left-section">
        <p><strong>Native Name: </strong>${country.name}</p>
        <p><strong>Population: </strong>${country.population}</p>
        <p><strong>Region: </strong>${country.region}</p>
        <p><strong>Sub Region: </strong>${country.subregion}</p>
        <p><strong>Capital: </strong>${country.capital}</p>

    </section>
    <section class="right-section">
        <p><strong>Top Level Domain: </strong>${country.topLevelDomain}</p>
        <p><strong>Currencies: </strong>${country.currency}</p>
        <p><strong>Langauges: </strong>Dutch,French,German</p>
    </section>
    <section class="border-countries">
        <h4>Border Countries:</h4>
        <div>France</div>
        <div>France</div>
        <div>France</div>
    </section>
</section>`

};

