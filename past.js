const pastAPI=document.getElementById("pastAPI");
const cityForPast=document.getElementById("cityForPast");
const pastDate=document.getElementById("pastDate");
const loaderForPast=document.getElementById("loaderForPast");
const pastDetails=document.getElementById('pastDetails');
const errorForPast=document.getElementById("errorForPast");
const questionForPast=document.getElementById('questionForPast');


async function fetchpastData() {

 pastDetails.classList.remove("collapsePast");



   errorForPast.style.display="none";


 if (!cityForPast.value || !pastDate.value) {
   alert("Please enter both city and date to check the weather.");
   return;
 }


 // Validate if the date is past to  the current 
  const forecastDate = new Date(pastDate.value);

 const currentDate = new Date();
 //set limit for forecastDate;
 const maxDate=new Date();

 maxDate.setDate(maxDate.getDate()-7);

 

 
 

 if (forecastDate > currentDate || forecastDate<maxDate) {
   alert("Please enter a date of the past  less than 7 days from current");
   return;
 }
 questionForPast.style.display="none";
 loaderForPast.style.height= `${window.innerHeight-document.getElementById("searchForPast").offsetHeight-document.getElementById("daysContainerPast").offsetHeight}px`;
 await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));

 loaderForPast.style.display="grid";
 await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));

 
 



 // Continue with the API request

 const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=7353f0a0bd6145ac85931954241801&q=${cityForPast.value.trim()}&dt=${pastDate.value}`);

 const data=await response.json();
           
       if(!data.hasOwnProperty("error")){
    

         document.getElementById("pastHead").innerHTML =` City - ${data.location.name}, ${data.location.region} <span id="tempForPastHead">${data.forecast.forecastday[0].day.avgtemp_c}<sup> o</sup><sub>c</sub> </span>`;
         document.getElementById("dateDisplayPast").innerHTML =` Date: ${pastDate.value}`;
         document.getElementById("conditionPast").innerHTML = `Condition - ${data.forecast.forecastday[0].day.condition.text}`;
         pastWeatherIcon.src = `${data.forecast.forecastday[0].day.condition.icon}`;
         document.getElementById("avgTempPast").innerHTML =`${data.forecast.forecastday[0].day.avgtemp_c} <sup> o</sup><sub>c</sub></span>`;
         document.getElementById("humidityValuePast").innerHTML = data.forecast.forecastday[0].day.avghumidity;
         document.getElementById("uvValuePast").innerHTML = data.forecast.forecastday[0].day.uv;
         document.getElementById("windValuePast").innerHTML =  `${data.forecast.forecastday[0].day.maxwind_kph} km/h`;
         document.getElementById("precipitationValuePast").innerHTML =`${data.forecast.forecastday[0].day.totalprecip_mm} mm`;

         loaderForPast.style.display="none";
         await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));
 
     
           pastDetails.classList.add("collapsePast");
        
      




         
       } else {
             
               errorForPast.innerHTML=`<h3 class="p-2  shadow my-3 rounded text-center">${data.error.message}</h3>`;

               loaderForPast.style.display="none";
               await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),800)));
               errorForPast.style.display="initial";
        
          

         
       }
     

   


}


cityForPast.addEventListener("keypress", (event) => {
 if (event.key === "Enter") {
   pastAPI.click();
 }
});

pastAPI.addEventListener("click", fetchpastData);