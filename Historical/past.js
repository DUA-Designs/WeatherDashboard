// Taking references for all HTML elements
const pastAPI = document.getElementById("pastAPI");
const cityForPast = document.getElementById("cityForPast");
const pastDate = document.getElementById("pastDate");
const loaderForPast = document.getElementById("loaderForPast");
const pastDetails = document.getElementById('pastDetails');
const errorForPast = document.getElementById("errorForPast");
const questionForPast = document.getElementById('questionForPast');

// Function to fetch past weather data
async function fetchpastData() {
  // Removes "collapsePast" class from pastDetails element
  pastDetails.classList.remove("collapsePast");

  // Hide error message
  errorForPast.style.display = "none";

  // Check if city and date are given by the user
  if (!cityForPast.value || !pastDate.value) {
    alert("Please enter both city and date to check the weather.");
    return;
  }

  // Validate if the date is in the past within the last 7 days
  const forecastDate = new Date(pastDate.value);
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 7);

  // Check if the forecast date is within the valid range
  if (forecastDate > currentDate || forecastDate < maxDate) {
    alert("Please enter a date of the past less than 7 days from the current date.");
    return;
  }

  
  questionForPast.style.display = "none";

  // Set the height of loaderForPast based on the window size
  loaderForPast.style.height = `${window.innerHeight - document.getElementById("searchForPast").offsetHeight - document.getElementById("daysContainerPast").offsetHeight}px`;

  
  await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

  loaderForPast.style.display = "grid";

  await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

  // Continue with the API request
  const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=7353f0a0bd6145ac85931954241801&q=${cityForPast.value.trim()}&dt=${pastDate.value}`);
  const data = await response.json();

  // Check if there is no error in the API response
  if (!data.hasOwnProperty("error")) {
    // Update HTML elements with weather data if no error
    document.getElementById("pastHead").innerHTML = ` City - ${data.location.name}, ${data.location.region} <span id="tempForPastHead">${data.forecast.forecastday[0].day.avgtemp_c}<sup> o</sup><sub>c</sub> </span>`;
    document.getElementById("dateDisplayPast").innerHTML = ` Date: ${pastDate.value}`;
    document.getElementById("conditionPast").innerHTML = `Condition - ${data.forecast.forecastday[0].day.condition.text}`;
    pastWeatherIcon.src = `${data.forecast.forecastday[0].day.condition.icon}`;
    document.getElementById("avgTempPast").innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} <sup> o</sup><sub>c</sub></span>`;
    document.getElementById("humidityValuePast").innerHTML = data.forecast.forecastday[0].day.avghumidity;
    document.getElementById("uvValuePast").innerHTML = data.forecast.forecastday[0].day.uv;
    document.getElementById("windValuePast").innerHTML = `${data.forecast.forecastday[0].day.maxwind_kph} km/h`;
    document.getElementById("precipitationValuePast").innerHTML = `${data.forecast.forecastday[0].day.totalprecip_mm} mm`;

    loaderForPast.style.display = "none";

    await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

    // Add the "collapsePast" class to pastDetails element
    pastDetails.classList.add("collapsePast");

  } else {
    // Display error message
    errorForPast.innerHTML = `<h3 class="p-3  shadow my-3 rounded text-center">${data.error.message}</h3>`;
    
    loaderForPast.style.display = "none";

    await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

    // Display the errorForPast element
    errorForPast.style.display = "initial";
  }
}

// Event listener for Enter key press on city input
cityForPast.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    pastAPI.click();
  }
});

// Event listener for click on button having pastAPI as id
pastAPI.addEventListener("click",fetchpastData);
