const cityForForecast=document.getElementById("cityForForecast");
const forecastAPI=document.querySelector("#forecastAPI");
const days=document.querySelector("#days");
const errorForForecast=document.getElementById("errorForForecast");
const forecastDetails=document.getElementById("forecastDetails");
const loaderForForecast=document.getElementById("loaderForForecast");

async function fetchForecastData(){
    
    
 while(forecastDetails.hasChildNodes()){
    forecastDetails.removeChild(forecastDetails.firstChild);
 }

    forecastDetails.style.display="none";
    errorForForecast.style.display="none";
    loaderForForecast.style.display="grid";
    document.getElementById("questionForForecast").style.display="none";

    loaderForForecast.style.height=`${window.innerHeight-document.getElementById("searchForForecast").offsetHeight-document.getElementById("daysContainer").offsetHeight}px`;



    const response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForForecast.value.trim()}&days=${days.value}&aqi=no&alerts=no`);
    const data=await response.json();
    console.log(data);
    if(data.hasOwnProperty("forecast")){
        let size=data.forecast.forecastday.length;
        let header=document.createElement("div");
        header.classList.add(...["col-12" ,"my-3","p-2"]);
        header.innerHTML=`<h2 class="p-4 shadow text-center">City - ${data.location.name}, ${data.location.region}</h2>`;
        forecastDetails.appendChild(header);
        let classes=[];
               if(size===1){
                 classes=["col-lg-10","col-md-6","col-sm-12","col-xs-12","p-2","mx-auto"];

               }
               else if(size===2){
              classes=["col-lg-6","col-md-6","col-sm-12","col-xs-12","p-2"];
               }
               else{
              classes=["col-lg-4","col-md-6","col-sm-12","col-xs-12","p-2"];
               }



        for(let i in data.forecast.forecastday){
            let div=document.createElement("div");
            div.classList.add(...classes);

         

            div.innerHTML=`   
        <div class="col-12  shadow p-2 rounded">
            <div class="col-12 p-2 text-center" >
            <h3  class="p-1 border rounded my-2">${data.forecast.forecastday[i].day.condition.text}</h3> 
            <h5 class="p-1 text-center bg-light"> ${data.forecast.forecastday[i].date}</h5>
            
            </div>
            <div class="col-12 p-2  "><img  class="img-fluid  d-block mx-auto" alt="weatherIcon" src="${data.forecast.forecastday[i].day.condition.icon}"></div>
            
      
           <div  class="row p-3">
            <p class="col-12 p-2 border-bottom my-2"> <span>Average Temperature </span> <span id="avgTemp">${data.forecast.forecastday[i].day.avgtemp_c} <sup>O</sup><sub>C</sub></span></p>
            <p class="col-12 p-2 border-bottom my-2"> <span>Wind Speed </span><span id="maxWind">${data.forecast.forecastday[i].day.maxwind_kph} kmph</span></p>
            <p class="col-12 p-2 border-bottom my-2"> <span>Uv </span><span id="uv"> ${data.forecast.forecastday[i].day.uv}</span></p>
            <p class="col-12 p-2 border-bottom my-2"> <span>Snow </span><span id="totSnow"> ${data.forecast.forecastday[i].day.totalsnow_cm} cm</span></p>
            <p class="col-12 p-2 border-bottom my-2"> <span>avgvis_km </span><span id="avgVis"> ${data.forecast.forecastday[i].day.avgvis_km} km</span></p>
            <p class="col-12 p-2 border-bottom my-2"> <span>Humidity </span><span id="avgHum">${data.forecast.forecastday[i].day.avghumidity} </span></p>
            <p class="col-12 p-2 border-bottom my-2"> <span>Precipitation </span><span id="totPrecip">${data.forecast.forecastday[i].day.totalprecip_mm} mm</span></p>


            </div>    
        </div>`;
           forecastDetails.appendChild(div);

     
        

    
        }


        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
        loaderForForecast.style.display="none";
        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
         forecastDetails.style.display="initial";
        
        
        
        

    }else{

        if(data.error.code===1003){
            errorForForecast.innerHTML=`<h3 class="p-3 text-center shadow">Kindly enter relevant details...</h3>`;
        }
        else{
            errorForForecast.innerHTML=`<h3 class="p-3 text-center shadow">${data.error.message}</h3>`;
        }

        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
        loaderForForecast.style.display="none";

        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));

              errorForForecast.style.display="initial";
        


    }
}

cityForForecast.addEventListener("keypress",(event)=>{
    event.key==="Enter"?forecastAPI.click():"";
})

forecastAPI.addEventListener("click",fetchForecastData);
