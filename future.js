 const futureAPI=document.getElementById("futureAPI");
 const cityForFuture=document.getElementById("cityForFuture");
const futureDate=document.getElementById("futureDate");
const loaderForFuture=document.getElementById("loaderForFuture");
const futureDetails=document.getElementById('futureDetails');
const errorForFuture=document.getElementById("errorForFuture");
const questionForFuture=document.getElementById('questionForFuture');
 

 async function fetchFutureData() {

  futureDetails.classList.remove("collapseFuture");

 
 
    errorForFuture.style.display="none";


  if (!cityForFuture.value || !futureDate.value) {
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
  

  if (forecastDate < minDate ||   forecastDate > maxDate) {
    alert("Please enter a date within the range of 14 days to 300 days from today's date.");
    return;
  }
  questionForFuture.style.display="none";
  loaderForFuture.style.height= `${window.innerHeight-document.getElementById("searchForFuture").offsetHeight-document.getElementById("daysContainerFuture").offsetHeight}px`;
  await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));

  loaderForFuture.style.display="grid";
  await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));
 
  
  
 


  // Continue with the API request
 
  const response = await fetch(`https://api.weatherapi.com/v1/future.json?key=7353f0a0bd6145ac85931954241801&q=${cityForFuture.value.trim()}&dt=${futureDate.value}`);
  const data=await response.json();
            
        if(!data.hasOwnProperty("error")){
     

          document.getElementById("futureHead").innerHTML =` City - ${data.location.name}, ${data.location.region} <span id="tempForPastHead">${data.forecast.forecastday[0].day.avgtemp_c}<sup> o</sup><sub>c</sub> </span>`;
          document.getElementById("dateDisplay").innerHTML =` Date: ${futureDate.value}`;
          document.getElementById("conditionFuture").innerHTML = `Condition - ${data.forecast.forecastday[0].day.condition.text}`;
          futureWeatherIcon.src = `${data.forecast.forecastday[0].day.condition.icon}`;
          document.getElementById("avgTempFuture").innerHTML =`${data.forecast.forecastday[0].day.avgtemp_c} <sup> o</sup><sub>c</sub></span>`;
          document.getElementById("humidityValueFuture").innerHTML = data.forecast.forecastday[0].day.avghumidity;
          document.getElementById("uvValueFuture").innerHTML = data.forecast.forecastday[0].day.uv;
          document.getElementById("windValueFuture").innerHTML =  `${data.forecast.forecastday[0].day.maxwind_kph} km/h`;
          document.getElementById("precipitationValuePast").innerHTML =`${data.forecast.forecastday[0].day.totalprecip_mm} mm`;

          loaderForFuture.style.display="none";
          await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));
          
      
            futureDetails.classList.add("collapseFuture");
       


 

          
        } else {
              
                errorForFuture.innerHTML=`<h3 class="p-2  shadow my-3 rounded text-center">${data.error.message}</h3>`;

                loaderForFuture.style.display="none";
                await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));
                errorForFuture.style.display="initial";
           

          
        }
      
 
    

 
}


cityForFuture.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    futureAPI.click();
  }
});

futureAPI.addEventListener("click", fetchFutureData);
 