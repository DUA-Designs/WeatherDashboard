 
const searchForMarine=document.getElementById("searchForMarine");

const pointForMarine=document.getElementById("pointForMarine");
const marineAPI=document.getElementById("marineAPI");
const loaderForMarine=  document.getElementById("loaderForMarine");
const errorForMarine=document.getElementById("errorForMarine");
const marineDetails=document.getElementById("marineDetails");
 
  
  

async function fetchMarineData(){
    document.getElementById("questionForMarine").style.display="none";
    var point=pointForMarine.value.trim().split(",");
    marineDetails.style.display="none";
    loaderForMarine.style.display="grid";
    errorForMarine.style.display="none";
    loaderForMarine.style.height=`${window.innerHeight-document.getElementById("searchForMarine").offsetHeight}px`;
    

  if(pointForMarine.value.trim()!==""){
    
    const response= await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${point[0].trim()}&longitude=${point[1].trim()}&daily=wave_height_max,wave_direction_dominant,wind_wave_height_max,wind_wave_direction_dominant,swell_wave_height_max,swell_wave_direction_dominant&forecast_days=1`);
    const data=await response.json();
    
 
 
      
         if( data.hasOwnProperty("daily")){
            document.getElementById("headForMarine").innerHTML=`Coordinates :  lat- ${data.latitude}, long-${data.longitude}`;
            document.getElementById("waveHeightMax").innerHTML=`${data.daily.wave_height_max} ${data.daily_units.wave_height_max}`;
            document.getElementById("waveDirectionDominant").innerHTML=`${data.daily.wave_direction_dominant} ${data.daily_units.wave_direction_dominant}`;
            document.getElementById("windWaveHeightMax").innerHTML=`${data.daily.wind_wave_height_max} ${data.daily_units.wind_wave_height_max}`;
            document.getElementById("windWaveDirectionDominant").innerHTML=`${data.daily.wind_wave_direction_dominant} ${data.daily_units.wind_wave_direction_dominant}`;
            document.getElementById("swellWaveHeightMax").innerHTML=`${data.daily.swell_wave_height_max} ${data.daily_units.swell_wave_height_max}`;
            document.getElementById("swellWaveDirectionDominant").innerHTML=`${data.daily.swell_wave_direction_dominant} ${data.daily_units.swell_wave_direction_dominant}`;

            await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
            loaderForMarine.style.display="none";
            marineDetails.style.display="flex";


         }
         else{

                  
                if(data.error){
                    errorForMarine.innerHTML=`<h3 class="p-4 text-center shadow">${data.reason}</h3>`;
                }       
                
                loaderForMarine.style.display="none";
                await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
                errorForMarine.style.display="initial";

            }

        }
            else{
                await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
                errorForMarine.innerHTML=`<h3 class="p-4 text-center shadow">Kindly Enter the coordinates...</h3>`;
                loaderForMarine.style.display="none";
                await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
                errorForMarine.style.display="initial";


            }


    
}

 
pointForMarine.addEventListener("keypress",(event)=>{
    event.key==="Enter"?marineAPI.click():"";
})

marineAPI.addEventListener("click",fetchMarineData);


 

 