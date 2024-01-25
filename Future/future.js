// Taking references for required HTML elements
const futureAPI = document.getElementById("futureAPI");
const cityForFuture = document.getElementById("cityForFuture");
const futureDate = document.getElementById("futureDate");
const loaderForFuture = document.getElementById("loaderForFuture");
const futureDetails = document.getElementById('futureDetails');
const errorForFuture = document.getElementById("errorForFuture");
const questionForFuture = document.getElementById('questionForFuture');

// fetch future weather data
async function fetchFutureData() {
  // Remove "collapseFuture" class from futureDetails element
  futureDetails.classList.remove("collapseFuture");

  // Hide error message
  errorForFuture.style.display = "none";

  // Check if city and date are provided by the user
  if (!cityForFuture.value.trim() || !futureDate.value) {
    alert("Please enter both city and date to check the weather.");
    return;
  }

  // Validate if the date is within the specified range
  const forecastDate = new Date(futureDate.value);
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  const maxDate = new Date(currentDate);

  // Set the minimum date to 14 days from today
  minDate.setDate(currentDate.getDate() + 14);

  // Set the maximum date to 300 days from today
  maxDate.setDate(currentDate.getDate() + 300);

  if (forecastDate < minDate || forecastDate > maxDate) {
    alert("Please enter a date within the range of 14 days to 300 days from today's date.");
    return;
  }

  // Hide questionForFuture element
  questionForFuture.style.display = "none";

  // Set the height of loaderForFuture based on the window size
  loaderForFuture.style.height = `${window.innerHeight - document.getElementById("searchForFuture").offsetHeight - document.getElementById("daysContainerFuture").offsetHeight}px`;

  await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

  // Display the loaderForFuture element
  loaderForFuture.style.display = "grid";

  await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

  // Continue with the API request
  const response = await fetch(`https://api.weatherapi.com/v1/future.json?key=26fc930a943946f6abb72609242501&q=${cityForFuture.value.trim()}&dt=${futureDate.value}`);
  const data = await response.json();

  // Check if there is no error in the API response
  if (!data.hasOwnProperty("error")) {
    // Update HTML elements with weather data if no error
    document.getElementById("futureHead").innerHTML = ` City - ${data.location.name}, ${data.location.region} <span id="tempForPastHead">${data.forecast.forecastday[0].day.avgtemp_c}<sup> o</sup><sub>c</sub> </span>`;
    document.getElementById("dateDisplay").innerHTML = ` Date: ${futureDate.value}`;
    document.getElementById("conditionFuture").innerHTML = `Condition - ${data.forecast.forecastday[0].day.condition.text}`;
    futureWeatherIcon.src = `${data.forecast.forecastday[0].day.condition.icon}`;
    document.getElementById("avgTempFuture").innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} <sup> o</sup><sub>c</sub></span>`;
    document.getElementById("humidityValueFuture").innerHTML = data.forecast.forecastday[0].day.avghumidity;
    document.getElementById("uvValueFuture").innerHTML = data.forecast.forecastday[0].day.uv;
    document.getElementById("windValueFuture").innerHTML = `${data.forecast.forecastday[0].day.maxwind_kph} km/h`;
    document.getElementById("precipitationValueFuture").innerHTML = `${data.forecast.forecastday[0].day.totalprecip_mm} mm`;

    // Hide the loaderForFuture element
    loaderForFuture.style.display = "none";

    await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

    // Add the "collapseFuture" class to futureDetails element
    futureDetails.classList.add("collapseFuture");

  } else {
    // Display error message
    errorForFuture.innerHTML = `<h3 class="p-2  shadow my-3 rounded text-center">${data.error.message}</h3>`;

    // Hide the loaderForFuture element
    loaderForFuture.style.display = "none";

    await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 800)));

    // Display the errorForFuture element
    errorForFuture.style.display = "initial";
  }
}

// Event listener for Enter key press on city input
cityForFuture.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    futureAPI.click();
  }
});

// Event listener for click on button check future having id futureAPI
futureAPI.addEventListener("click", fetchFutureData);
