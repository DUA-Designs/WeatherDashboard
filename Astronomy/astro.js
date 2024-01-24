// Taking references for required HTML elements
const loaderForAstro = document.getElementById("loaderForAstro");
const astroAPI = document.getElementById("astroAPI");
const cityForAstro = document.getElementById("cityForAstro");
const userDate = document.getElementById("userDate");
const errorForAstronomy = document.getElementById("errorForAstronomy");
const astroDetails = document.getElementById("astroDetails");
const questionForAstronomy = document.getElementById("questionForAstronomy");

// fetch astronomy data
async function fetchAstronomyData() {
    // Hide the questionForAstronomy,errorForAstronomy elements 
    questionForAstronomy.style.display = "none";
    errorForAstronomy.style.display = "none";

    // Hide astroDetails and display loaderForAstro
    astroDetails.style.display = "none";
    loaderForAstro.style.display = "grid";
    // Set the height of loaderForAstro based on the window size
    loaderForAstro.style.height = `${window.innerHeight - document.getElementById("searchForAstro").offsetHeight}px`;

    // Check if userDate is not empty
    if (userDate.value !== "") {
        // Fetch data from the API
        const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForAstro.value.trim()}&dt=${userDate.value}`);
        const data = await response.json();

        // Check if the response contains astronomy data
        if (data.hasOwnProperty("astronomy")) {
            // Update HTML elements with astronomy data
            document.getElementById("headForAstro").innerHTML = `City - ${data.location.name}, ${data.location.region}, ${data.location.country}`;
            document.getElementById("sunrise").innerHTML = data.astronomy.astro.sunrise;
            document.getElementById("sunset").innerHTML = data.astronomy.astro.sunset;
            document.getElementById("moonrise").innerHTML = data.astronomy.astro.moonrise;
            document.getElementById("moonset").innerHTML = data.astronomy.astro.moonset;
            document.getElementById("moonPhase").innerHTML = data.astronomy.astro.moon_phase;
            document.getElementById("moonIllumination").innerHTML = data.astronomy.astro.moon_illumination;
            document.getElementById("isMoonUp").innerHTML = data.astronomy.astro.is_moon_up === 1 ? "Yes" : "No";
            document.getElementById("isSunUp").innerHTML = data.astronomy.astro.is_sun_up === 1 ? "Yes" : "No";

            // Simulate loading time with a brief delay
            await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 1000)));

            // Hide loaderForAstro and display astroDetails
            loaderForAstro.style.display = "none";
            astroDetails.style.display = "flex";
        } else {
            // check error
            if (data.error.code === 1003) {
                errorForAstronomy.innerHTML = `<h3 class="p-4 text-center shadow shadow rounded my-3">Kindly enter relevant details</h3>`;
            } else {
                errorForAstronomy.innerHTML = `<h3 class="p-4 text-center shadow shadow rounded my-3">${data.error.message}</h3>`;
            }

            // Hide loaderForAstro and display errorForAstronomy
            loaderForAstro.style.display = "none";
            await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));
            errorForAstronomy.style.display = "initial";
        }
    } else {
        await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));
        errorForAstronomy.innerHTML = `<h3 class="p-4 text-center shadow rounded my-3">Kindly mention the date...</h3>`;

        // Hide loaderForAstro and display errorForAstronomy
        loaderForAstro.style.display = "none";
        await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));
        errorForAstronomy.style.display = "initial";
    }
}

// Event listener for Enter key press on city input
cityForAstro.addEventListener("keypress", (event) => {
    event.key === "Enter" ? astroAPI.click() : "";
});

// Event listener for click on check Astronamy button
astroAPI.addEventListener("click", fetchAstronomyData);
