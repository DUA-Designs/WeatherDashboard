

/* From here the script is for Dashboard */ 
const components=[ "welcome","current","forecast","history","future","marine","astronomy","timezone","sports"];

//function to display selected component from dashboard
 async function render(state){

    //remove all displayed components
    for(let i in components){
       document.getElementById(components[i]).style.display="none";
        }
    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
    //reduce the mobile dashboard size back to normal after selecting a component.
    document.getElementById("dashboard").classList.remove("expandMe");
    //remove the cross Icon.
    document.getElementById("close").classList.remove("expandMe");
    
    
    //display loader for some UI action O.O
    document.getElementById("componentLoader").style.display="grid";

    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
       //remove the component loader
    document.getElementById("componentLoader").style.display="none";

    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
  
    //display selected component
    document.getElementById(state).style.display="block";
    //clearing all other components in case the render function is triggered in short amount of time than it's running time.
    for(let i in components){
      if(components[i]!==state){
        document.getElementById(components[i]).style.display="none";
      }
       }

     

}


 /*Mobile Dashboard */
      //add an event to bars Icon
    document.getElementById("dashToggle").addEventListener("click",()=>{

        //increase the size to allow user to select elements
       document.getElementById("dashboard").classList.add("expandMe");
        //make cross Icon visible
       document.getElementById("close").classList.add("expandMe");

    });
     //add an event to cross Icon
    document.getElementById("close").addEventListener("click",()=>{
          //remove the cross Icon
        document.getElementById("dashboard").classList.remove("expandMe");
           

    });
/* End of Dashboard */
 

/*From here the script is for Current Weather */

//selected the required html elements
const locationHead=document.getElementById("locationHead");
const flexBox=document.getElementById("flex-box");
const API=document.getElementById("weatherAPI");
const weatherIcon=document.getElementById("weatherIcon");
const temp=document.getElementById("temp");
const realfeel=document.getElementById("realfeel");
const humidityValue=document.getElementById("humidityValue");
const uvValue=document.getElementById("uvValue");
const windValue=document.getElementById("windValue");
const weather=document.getElementById("weather");
const city=document.getElementById('city');
const cloudValue=document.getElementById("cloudValue");
const precipitationValue=document.getElementById("precipitationValue");
const windDegreeValue=document.getElementById("windDegreeValue");
const pressureValue=document.getElementById("pressureValue");
const more=document.getElementById("more");
const moreDetails=document.getElementById("moreDetails");
const airCheck=document.getElementById("airCheck");
const airQualityDetails=document.getElementById("airQualityDetails");
const coValue=document.getElementById("coValue");
const no2Value=document.getElementById("no2Value");
const o3Value=document.getElementById("o3Value");
const so2Value=document.getElementById("so2Value");
const pm10Value=document.getElementById("pm10Value");
const usEpa =document.getElementById("us-epa-indexValue");
const loader=document.getElementById("loader");
const condition=document.getElementById("condition");
const time=document.getElementById("time");
const conditionArray=["Good","Moderate","Unhealthy for sensitive group","Unhealthy for all","Very Unhealthy","Hazardous"];
const smiley=[`<i class="fa-regular fa-face-smile-beam"></i>`,`<i class="fa-regular fa-face-smile"></i>`,`<i class="fa-regular fa-face-frown-open"></i>`,`<i class="fa-regular fa-face-frown"></i>`,`<i class="fa-regular fa-face-sad-tear"></i>`,`<i class="fa-regular fa-face-sad-cry"></i>`];






 
 //function to fetch the data

async function fetchCurrentData(){


   // clearing all elements for smooth transition.
    document.getElementById("questionForCurrent").style.display="none";
    document.getElementById("errorForCurrent").style.display="none";
    flexBox.classList.remove("CollapseMe");
    moreDetails.classList.remove("makeVisible");

    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
    //displaying loader
    loader.style.height= `${window.innerHeight-document.getElementById("searchForCurrent").offsetHeight}px`;
    //changing the view point to the details.
    document.getElementById("comeHere").scrollIntoView({behavior:"smooth"});
    loader.style.display="grid";
  


    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
 
     
    
      
    
     const response= await fetch(`https://api.weatherapi.com/v1/current.json?key=2f1a5f47063b4d3c96390406240201&q=${city.value.trim()}&aqi=${airCheck.value}`);
    
            const data=await response.json();
        //if no error we proceed with adding the details
       if(data.current){
       locationHead.innerHTML=`City - ${data.location.name}, ${data.location.region} <span id="deg"  >${data.current.temp_c}<sup>o</sup><sub>c</sub></span>`;
       weatherIcon.src=`${data.current.condition.icon}`;
       temp.innerHTML=data.current.temp_c;
       realfeel.innerHTML=`Realfeel ${data.current.feelslike_c}`;
       humidityValue.innerHTML=data.current.humidity;
       uvValue.innerHTML=data.current.uv;
       windValue.innerHTML=`${data.current.wind_dir} ${data.current.wind_kph} km/h`;
       gustValue.innerHTML=`${data.current.gust_kph} km/h`;
       weather.innerHTML=`Condition - ${data.current.condition.text}`;
       windDegreeValue.innerHTML= `${data.current.wind_degree}`;
       cloudValue.innerHTML=`${data.current.cloud} %`;
       pressureValue.innerHTML=`${data.current.pressure_mb} mb`;
       precipitationValue.innerHTML=`${data.current.precip_mm} mm`;
       const timeCheck=data.location.localtime.split(" ")[1].split(":")[0];

       time.innerHTML=`${data.location.localtime} ${timeCheck>=12?"PM":"AM"}`;



                  // if user needs air quality
                if(airCheck.value==="yes"){
                         coValue.innerHTML=data.current.air_quality.co;   
                         no2Value.innerHTML=data.current.air_quality.no2;
                         o3Value.innerHTML=data.current.air_quality.o3;
                 so2Value.innerHTML=data.current.air_quality.so2;
                  pm10Value.innerHTML=data.current.air_quality.pm10;
                  let ind=data.current.air_quality["us-epa-index"];
         
                 usEpa.innerHTML=data.current.air_quality["us-epa-index"];
                 condition.innerHTML=`As per the "US - EPA standard" the condition seems to be "${conditionArray[ind>=6?5:ind-1]}" ${smiley[ind>=6?5:ind-1]}`;
          
          
                //displaying air quality
                 document.getElementById("req").style.display="flex";
                 //removing not requested section
                 document.getElementById("notReq").style.display="none";



              }
              //otherwise for air quality
              else{
                    //removing air quality details
                  document.getElementById("req").style.display="none";
                    //displaying not requested section 
                document.getElementById("notReq").style.display="block";
                }

       await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
         //removing the loader
       loader.style.display="none";

         //expanding the flexbox as a dropdown (lookup the css for clarity) 
       flexBox.classList.add("CollapseMe");
         //just a timeout for moreDetails section to make  smooth transition 
       setTimeout(()=>{
       
        moreDetails.classList.add("makeVisible");
       },500); 
   
    }
    //otherwise for api response
    else{
          //handling errors
       if(data.error.code===1003){
        document.getElementById("errorForCurrent").innerHTML=`<h3 class="p-4 shadow rounded text-center">Kindly enter relevant details.</h3>`;
       }
       else{  
        document.getElementById("errorForCurrent").innerHTML=`<h3 class="p-4 shadow rounded text-center">${data.error.message}</h3>`;

       }
      


        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
        loader.style.display="none";
         //returning the viewpoint to the search 
        document.getElementById("searchForCurrent").scrollIntoView({behavior:"smooth"});
         //displaying the error section
        document.getElementById("errorForCurrent").style.display="initial";

       
       
    
    }
     

      

    
  
    
}

//Event Listener for Enter keypress on the city input
city.addEventListener("keypress",(event)=>{
    event.key==="Enter"?API.click():"";
});

//Event Listener for button

API.addEventListener("click",fetchCurrentData);

//Event Listener for more button
more.addEventListener("click",()=>{
 //toggling the dropdown of moreDetails section
 moreDetails.classList.toggle("CollapseMe");

 //conditions to change innerHTML of more button
 if(moreDetails.classList.contains("CollapseMe")){
    more.innerHTML=`Less Details <i class="fa-solid fa-up-down"></i>`;
 }
 else{
    more.innerHTML=`More Details <i class="fa-solid fa-up-down"></i>`;

  }
});
/*End of the  script  for Current Weather */


