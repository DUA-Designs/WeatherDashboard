// Taking references for required HTML elements
const sportsAPI = document.getElementById("sportsAPI");
const sportsDetails = document.getElementById("sportsDetails");
const cityForSports = document.getElementById("cityForSports");
const cricket = document.getElementById("cricket");
const football = document.getElementById("football");
const golf = document.getElementById("golf");
const loaderForSports = document.getElementById("loaderForSports");
const noSports = document.getElementById('noSports');

// fetch sports data
async function fetchSportsData() {
    // Hide the questionForSports element and specific sports categories
    document.getElementById("questionForSports").style.display = "none";
    cricket.style.display = "none";
    football.style.display = "none";
    golf.style.display = "none";
    noSports.style.display = "none";

    // Clear the contents of sports categories
    while (football.firstChild) {
        football.firstChild.remove();
    }
    while (cricket.firstChild) {
        cricket.firstChild.remove();
    }
    while (golf.firstChild) {
        golf.firstChild.remove();
    }

    const styles = ["p-2", "my-3", "shadow"];

    // Set the height and display loaderForSports
    loaderForSports.style.height = `${window.innerHeight - document.getElementById("searchForSports").offsetHeight}px`;
    loaderForSports.style.display = "grid";

    await new Promise(resolve => setTimeout(() => resolve("This is for loading Time"), 500));

    // Fetch data from the API
    const response = await fetch(`https://api.weatherapi.com/v1/sports.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForSports.value.trim()}`);
    const obj = await response.json();

    // Check if there is no error in the API response
    if (!obj.hasOwnProperty("error")) {
        let classes = ["col-lg-4", "col-md-6", "col-sm-12", "col-xs-12", "p-2", "my-3"];
        
        // Show football data if available
        if (obj.football.length > 0) {
            let head = document.createElement("h3");
            head.classList.add("col-12");
            head.innerHTML = "FOOTBALL";
            football.appendChild(head);

            for (let i in obj.football) {
                let div = document.createElement("div");
                div.classList.add(...classes);
                div.innerHTML = `<div class="p-1 shadow rounded col-12 mx-auto"> 
                    <h4 class=" text-center"><span>Country - </span><span class="countryValue">${obj.football[i].country === "" ? "No data" : obj.football[i].country}</span></h4>
                    <p class=" border-bottom p-2"><span>Stadium - </span><span class="stadiumValue">${obj.football[i].stadium === "" ? "No data" : obj.football[i].stadium}</span></p>
                    <p class=" border-bottom p-2"><span>Region - </span><span class="regionValue">${obj.football[i].region === "" ? "No data" : obj.football[i].region}</span></p>
                    <p class=" border-bottom p-2"><span>Tournament - </span><span class="tournamentValue">${obj.football[i].tournament === "" ? "No data" : obj.football[i].tournament}</span></p>
                    <p class=" border-bottom p-2"><span>Start - </span><span class="startValue" >${obj.football[i].start === "" ? "No data" : obj.football[i].start}</span></p>
                    <p class=" border-bottom p-2"><span>Match - </span><span class="matchValue">${obj.football[i].match === "" ? "No data" : obj.football[i].match}</span></p>
                </div>`;
                football.appendChild(div);
            }
        }

        // Show cricket data if available
        if (obj.cricket.length > 0) {
            let headForCricket = document.createElement("h3");
            headForCricket.classList.add("col-12");
            headForCricket.innerHTML = "CRICKET";
            cricket.appendChild(headForCricket);

            for (let i in obj.cricket) {
                let div = document.createElement("div");
                div.classList.add(...classes);
                div.innerHTML = `<div class="p-2 shadow rounded col-12 mx-auto"> 
                    <h4 class=""><span>Country - </span><span class="countryValue">${obj.cricket[i].country === "" ? "No data" : obj.cricket[i].country}</span></h4>
                    <p class=" border-bottom p-2"><span>Stadium - </span><span class="stadiumValue">${obj.cricket[i].stadium === "" ? "No data" : obj.cricket[i].stadium}</span></p>
                    <p class=" border-bottom p-2"><span>Region - </span><span class="regionValue">${obj.cricket[i].region === "" ? "No data" : obj.cricket[i].region}</span></p>
                    <p class=" border-bottom p-2"><span>Tournament - </span><span class="tournamentValue">${obj.cricket[i].tournament === "" ? "No data" : obj.cricket[i].tournament}</span></p>
                    <p class=" border-bottom p-2"><span>Start - </span><span class="startValue" >${obj.cricket[i].start === "" ? "No data" : obj.cricket[i].start}</span></p>
                    <p class=" border-bottom p-2"><span>Match - </span><span class="matchValue">${obj.cricket[i].match === "" ? "No data" : obj.cricket[i].match}</span></p>
                </div>`;
                cricket.appendChild(div);
            }
        }

        // Show golf data if available
        if (obj.golf.length > 0) {
            let headForGolf = document.createElement("h3");
            headForGolf.classList.add("col-12");
            headForGolf.innerHTML = "GOLF";
            golf.appendChild(headForGolf);

            for (let i in obj.golf) {
                let div = document.createElement("div");
                div.classList.add(...classes);
                div.innerHTML = `<div class="p-2 shadow rounded col-12 mx-auto"> 
                    <h4 class=""><span>Country - </span><span class="countryValue">${obj.golf[i].country === "" ? "No data" : obj.golf[i].country}</span></h4>
                    <p class=" border-bottom p-2"><span>Stadium - </span><span class="stadiumValue">${obj.cricket[i].stadium === "" ? "No data" : obj.golf[i].stadium}</span></p>
                    <p class=" border-bottom p-2"><span>Region - </span><span class="regionValue">${obj.golf[i].region === "" ? "No data" : obj.golf[i].region}</span></p>
                    <p class=" border-bottom p-2"><span>Tournament - </span><span class="tournamentValue">${obj.golf[i].tournament === "" ? "No data" : obj.golf[i].tournament}</span></p>
                    <p class=" border-bottom p-2"><span>Start - </span><span class="startValue" >${obj.golf[i].start === "" ? "No data" : obj.golf[i].start}</span></p>
                    <p class=" border-bottom p-2"><span>Match - </span><span class="matchValue">${obj.golf[i].match === "" ? "No data" : obj.golf[i].match}</span></p>
                </div>`;
                golf.appendChild(div);
            }
        }

        await new Promise(resolve => setTimeout(() => resolve("This is for loading Time"), 800));

        // Hide the loaderForSports
        loaderForSports.style.display = "none";

        // Check if there are no sports events scheduled
        if (obj.cricket.length === 0 && obj.football.length === 0 && obj.golf.length === 0) {
            // Remove styles and hide sports categories
            cricket.classList.remove(...styles);
            football.classList.remove(...styles);
            golf.classList.remove(...styles);
            football.style.display = "none";
            cricket.style.display = "none";
            golf.style.display = "none";

            // Display a message if no events are scheduled
            noSports.innerHTML = `<h4 class="p-4 shadow my-3">Looks like no event is scheduled.</h4>`;
            noSports.style.display = "initial";
        } else {
            // Hide the noSports message
            noSports.style.display = "none";

            // Display sports categories if events are scheduled
            if (obj.cricket.length !== 0) {
                cricket.style.display = "initial";
                cricket.classList.add(...styles);
            } else {
                cricket.classList.remove(...styles);
            }

            if (obj.football.length !== 0) {
                football.style.display = "initial";
                football.classList.add(...styles);
            } else {
                football.classList.remove(...styles);
            }

            if (obj.golf.length !== 0) {
                golf.classList.add(...styles);
                golf.style.display = "initial";
            } else {
                golf.classList.remove(...styles);
            }
        }
    } else {
        // Handle API error response
        if (obj.error.code === 1003) {
            noSports.innerHTML = `<h4 class="p-4 shadow my-3">Kindly enter relevant details...</h4>`;
        } else {
            noSports.innerHTML = `<h4 class="p-4 shadow my-3">${obj.error.message}</h4>`;
        }

        // Hide sports categories
        football.style.display = "none";
        cricket.style.display = "none";
        golf.style.display = "none";

       
        await new Promise(resolve => setTimeout(() => resolve("This is for loading Time"), 500));

        // Hide the loaderForSports
        loaderForSports.style.display = "none";

        noSports.style.display = "initial";
    }
}

// Add event listeners
sportsAPI.addEventListener("click", fetchSportsData);
cityForSports.addEventListener("keypress", (event) => {
    // Trigger fetchSportsData on Enter key press
    event.key === "Enter" ? sportsAPI.click():"";
});