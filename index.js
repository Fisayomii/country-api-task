const showCountries = document.getElementById("card-container");
const button = document.getElementById("click");

const handleClick = () => {
  fetchCountries();
  console.log("button");
};
button.addEventListener("click", handleClick);
let allCountries = [];
async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const countriesData = await response.json()
    const result = countriesData.map((item) => {
      return {
        name: item.name.common,
        population: item.population.toLocaleString(),
        continent: item.continents,
        capital: item.capital,
        flag: item.flags.png,
        code: item.cca3
      };
    });
    

   showCountries.innerHTML = result.map((country) => `
   <a href="country.html?country=${country.code} ">
        <div class="card">
        <div class="imgdiv">
           <img src="${country.flag}" alt="Flag of ${country.name}" class="countryimage" />
           </div>                
                    <div class="details">
                    <h2 class="p-details">${country.name}</h2>
                    <p class="p-details">Population: ${country.population}<p>
                    <p class="p-details">Continent: ${country.continent}<p>
                    <p class="p-details">Capital: ${country.capital}<p>                
            </div>
            </div>
            </a>`)
    displayCountries(result);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}


fetchCountries();

