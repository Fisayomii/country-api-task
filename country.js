const countryDetails = document.getElementById("details-container")
const countryCode = window.location.search.split("=")[1];
console.log(countryCode)

async function fetchCountryDetails() {
    try {
        if (!countryCode) {
            alert("Country code not found! Returning to home screen")
            window.location.href = '/'
        } else {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countriesData = await response.json()
    const country = countriesData.find(el => el.cca3 == countryCode)
    console.log(country)
    const result = {
            name: country.name.common,
            population: country.population.toLocaleString(),
            continent: country.continents,
            capital: country.capital,
            flag: country.flags.png,
            nativeName: Object.entries(country.name.nativeName)[0][1].common,
            region: country.region,
            subregion: country.subregion,
            borderCountries: formatBorderCountries(data, country.borders)
        }
    
    // result.forEach(country => {
    //     // console.log(country.name);
    // });
    console.log(result)
    displayDetails(result)}
} catch(error) {
    console.error('There has been a problem with your fetch operation:', error);
}

}


function displayDetails(obj) {
    let countrydetails =''
        countrydetails += `
        <div class="flex">
        <div>
                <img src="${obj.flag}" alt="Flag of ${obj.name}" class = "countryimage">
                </div>
                <div>
                <h2>Country: ${obj.name}</h2>
                <p>Population: ${obj.population}<p>
                <p>Continent: ${obj.continent}<p>
                <p>Capital: ${obj.capital}<p>
                <p>Capital: ${obj.nativeName}<p>
                <p>Region: ${obj.region}<p>
                <p>Subregion: ${obj.subregion}<p>
                <div>
        </div>`
    countryDetails.innerHTML = countrydetails
}

fetchCountryDetails()