// Taking references for required HTML elements
const searchForMarine = document.getElementById("searchForMarine");
const pointForMarine = document.getElementById("pointForMarine");
const marineAPI = document.getElementById("marineAPI");
const loaderForMarine = document.getElementById("loaderForMarine");
const errorForMarine = document.getElementById("errorForMarine");
const marineDetails = document.getElementById("marineDetails");

//  fetch marine data
async function fetchMarineData() {
    // Hide the questionForMarine, errorForMarine elements
    document.getElementById("questionForMarine").style.display = "none";
    errorForMarine.style.display = "none";
     // Hide marineDetails
     marineDetails.style.display = "none";

    // Extract latitude and longitude from the input
    var point = pointForMarine.value.trim().split(",");
     //reject if the input has letters
   if(/[A-z]+/g.test(point[0])){
        alert(`Kindly enter latitiude and longitude separated by comma(eg.: 23,67.227487)`);
        return;
    }
    //Display loaderForMarine
    loaderForMarine.style.display = "grid";
    // Set the height of loaderForMarine based on the window size
    loaderForMarine.style.height = `${window.innerHeight - document.getElementById("searchForMarine").offsetHeight}px`;

    // Check if the input point is not empty
    if (pointForMarine.value.trim() !== "") {
        // Fetch data from the API
        const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${point[0].trim()}&longitude=${point[1].trim()}&daily=wave_height_max,wave_direction_dominant,wind_wave_height_max,wind_wave_direction_dominant,swell_wave_height_max,swell_wave_direction_dominant&forecast_days=1`);
        const data = await response.json();

        // Check if the response contains daily data
        if (data.hasOwnProperty("daily")) {
            // Update HTML elements with marine data
            document.getElementById("headForMarine").innerHTML = `Coordinates :  lat- ${data.latitude}, long-${data.longitude}`;
            document.getElementById("waveHeightMax").innerHTML = `${data.daily.wave_height_max} ${data.daily_units.wave_height_max}`;
            document.getElementById("waveDirectionDominant").innerHTML = `${data.daily.wave_direction_dominant} ${data.daily_units.wave_direction_dominant}`;
            document.getElementById("windWaveHeightMax").innerHTML =` ${data.daily.wind_wave_height_max} ${data.daily_units.wind_wave_height_max}`;
            document.getElementById("windWaveDirectionDominant").innerHTML =` ${data.daily.wind_wave_direction_dominant} ${data.daily_units.wind_wave_direction_dominant}`;
            document.getElementById("swellWaveHeightMax").innerHTML = `${data.daily.swell_wave_height_max} ${data.daily_units.swell_wave_height_max}`;
            document.getElementById("swellWaveDirectionDominant").innerHTML = `${data.daily.swell_wave_direction_dominant} ${data.daily_units.swell_wave_direction_dominant}`;

            // Simulate loading time with a brief delay
            await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 1000)));

            // Hide loaderForMarine and display marineDetails
            loaderForMarine.style.display = "none";
            marineDetails.style.display = "flex";
        } else {
            // Handle error scenarios
            if (data.error) {
                errorForMarine.innerHTML = `<h3 class="p-4 text-center shadow shadow my-3 rounded">${data.reason}</h3>`;
            }

            // Hide loaderForMarine and display errorForMarine
            loaderForMarine.style.display = "none";
            await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));
            errorForMarine.style.display = "initial";
        }
    } else {
        await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));
        errorForMarine.innerHTML = `<h3 class="p-4 text-center shadow my-3 rounded">Kindly Enter the coordinates...</h3>`;

        // Hide loaderForMarine and display errorForMarine
        loaderForMarine.style.display = "none";
        await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));
        errorForMarine.style.display = "initial";
    }
}

// Event listener for Enter key press on latitude,longitude input
pointForMarine.addEventListener("keypress", (event) => {
    event.key === "Enter" ? marineAPI.click() : "";
});

// Event listener for click on check Marine button
marineAPI.addEventListener("click", fetchMarineData);
