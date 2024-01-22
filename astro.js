const loaderForAstro=  document.getElementById("loaderForAstro");
const astroAPI=document.getElementById("astroAPI");
const cityForAstro=document.getElementById("cityForAstro");
const userDate=document.getElementById("userDate");
const errorForAstronomy=document.getElementById("errorForAstronomy");
const astroDetails=document.getElementById("astroDetails");
const questionForAstronomy=document.getElementById("questionForAstronomy");

async function  fetchAstronomyData(){
  questionForAstronomy.style.display="none";
    astroDetails.style.display="none";
    loaderForAstro.style.display="grid";
    errorForAstronomy.style.display="none";
    loaderForAstro.style.height=`${window.innerHeight-document.getElementById("searchForAstro").offsetHeight}px`;
    

  if(userDate.value!==""){
    const response=await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForAstro.value.trim()}&dt=${userDate.value}`);
    const data=await response.json();
    console.log(data);
 
 
      
         if( data.hasOwnProperty("astronomy")){

            document.getElementById("headForAstro").innerHTML=`City - ${data.location.name}, ${data.location.region}, ${data.location.country}`;
            document.getElementById("sunrise").innerHTML=data.astronomy.astro.sunrise;
            document.getElementById("sunset").innerHTML=data.astronomy.astro.sunset;
            document.getElementById("moonrise").innerHTML=data.astronomy.astro.moonrise;
            document.getElementById("moonset").innerHTML=data.astronomy.astro.moonset;
            document.getElementById("moonPhase").innerHTML=data.astronomy.astro.moon_phase;
            document.getElementById("moonIllumination").innerHTML=data.astronomy.astro.moon_illumination;
            document.getElementById("isMoonUp").innerHTML=data.astronomy.astro.is_moon_up===1?"Yes":"No";
            document.getElementById("isSunUp").innerHTML=data.astronomy.astro.is_sun_up===1?"Yes":"No";

            await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
            loaderForAstro.style.display="none";
            astroDetails.style.display="flex";


         }
         else{
            if(data.error.code===1003){
                errorForAstronomy.innerHTML=`<h3 class="p-4 text-center shadow">Kindly enter relevant details</h3>`;

            }
          else{         
            errorForAstronomy.innerHTML=`<h3 class="p-4 text-center shadow">${data.error.message}</h3>`;
          }
              
                loaderForAstro.style.display="none";
                await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
                errorForAstronomy.style.display="initial";

            }

        }
            else{
                
                errorForAstronomy.innerHTML=`<h3 class="p-4 text-center shadow">Kindly mention the date...</h3>`;
                loaderForAstro.style.display="none";
                await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
                errorForAstronomy.style.display="initial";


            }

          

       




            
}

cityForAstro.addEventListener("keypress",(event)=>{
    event.key==="Enter"?astroAPI.click():"";
})

astroAPI.addEventListener("click",fetchAstronomyData);


 

 