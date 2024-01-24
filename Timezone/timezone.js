// Taking reference for required HTML elements
const NameValue = document.getElementById("NameValue");
const RegionValue = document.getElementById("RegionValue");
const CountryValue = document.getElementById("CountryValue");
const LatitudeValue = document.getElementById("LatitudeValue");
const LongitudeValue = document.getElementById("LongitudeValue");
const TimezoneValue = document.getElementById("TimezoneValue");
const LocalValue = document.getElementById("LocalValue");
const timezoneAPI = document.getElementById("timezoneAPI");
const cityForTimezone = document.getElementById("cityForTimezone");
const loaderForTimezone = document.getElementById("loaderForTimezone");
const timeDetails = document.getElementById('timeDetails');

// fetch timezone data
async function fetchTimezoneData() {
  // Hide questionForTimezone, timeDetails, and errorForTimezone elements
  document.getElementById("questionForTimezone").style.display = "none";
  timeDetails.style.display = "none";
  document.getElementById('errorForTimezone').style.display = "none";

  await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));

  // Display the loaderForTimezone element
  loaderForTimezone.style.display = "grid";
  // Set the height of loaderForTimezone based on the window size
  loaderForTimezone.style.height = `${window.innerHeight - document.getElementById("searchForTimezone").offsetHeight}px`;


  await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));

  // Continue with the API request
  const response = await fetch(`https://api.weatherapi.com/v1/timezone.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForTimezone.value.trim()}`);
  const dataFromAPI = await response.json();

  if (dataFromAPI.hasOwnProperty("location")) {
    // Update HTML elements with timezone data
    NameValue.innerHTML = dataFromAPI["location"]["name"];
    RegionValue.innerHTML = dataFromAPI["location"]["region"];
    CountryValue.innerHTML = dataFromAPI["location"]["country"]
    LatitudeValue.innerHTML = dataFromAPI["location"]["lat"];
    LongitudeValue.innerHTML = dataFromAPI["location"]["lon"];
    TimezoneValue.innerHTML = dataFromAPI["location"]["tz_id"];
    LocalValue.innerHTML = dataFromAPI["location"]["localtime"];

    await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));

    // Hide the loaderForTimezone element and display timeDetails
    loaderForTimezone.style.display = "none";
    timeDetails.style.display = "flex";
  } else {
    // check error
    if (dataFromAPI.error.code === 1003) {
      document.getElementById("errorForTimezone").innerHTML = `<h3 class="p-2">Kindly enter relevant details...</h3>`;
    } else {
      document.getElementById("errorForTimezone").innerHTML = `<h3 class="p-2">${dataFromAPI.error.message}</h3>`;
    }

    await new Promise(resolve => setTimeout(() => setTimeout(() => resolve("This is for loading Time"), 500)));

    // Hide the loaderForTimezone and timeDetails elements, and display errorForTimezone
    loaderForTimezone.style.display = "none";
    timeDetails.style.display = "none";
    document.getElementById("errorForTimezone").style.display = "initial";
  }
}

// Event listener for Enter key press on city input
cityForTimezone.addEventListener("keypress", (event) => {
  event.key === "Enter" ? timezoneAPI.click() : "";
});

// Event listener for click on check Timezone button
timezoneAPI.addEventListener("click", fetchTimezoneData);