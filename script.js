

/* From here the script is for Dashboard */ 
const components=[ "welcome","current","forecast","history","future","marine","astronomy","timezone","sports"];
 async function render(state){

    
    for(let i in components){
       document.getElementById(components[i]).style.display="none";
        }
    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
    document.getElementById("dashboard").classList.remove("expandMe");
    document.getElementById("close").classList.remove("expandMe");
    
    let selected=null;
    for(let i in components){
        if(state===components[i]){
        selected=components[i];
        }
        else{
         document.getElementById(components[i]).style.display="none";
        }
}

    document.getElementById("componentLoader").style.display="grid";

    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
    document.getElementById("componentLoader").style.display="none";

    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),500)));
  
  
    document.getElementById(selected).style.display="block";
    for(let i in components){
        if(state===components[i]){
        selected=components[i];
        }
        else{
         document.getElementById(components[i]).style.display="none";
        }
}

 }


 /*Mobile Dashboard */

          document.getElementById("dashToggle").addEventListener("click",()=>{
            console.log("This is working");
      document.getElementById("dashboard").classList.add("expandMe");
      document.getElementById("close").classList.add("expandMe");

          });

          document.getElementById("close").addEventListener("click",()=>{
            document.getElementById("dashboard").classList.remove("expandMe");
           

          });
/* End of Dashboard */
 

/*From here the script is for Current Weather */
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
const  loader=document.getElementById("loader");
const condition=document.getElementById("condition");
const time=document.getElementById("time");
const conditionArray=["Good","Moderate","Unhealthy for sensitive group","Unhealthy for all","Very Unhealthy","Hazardous"];
const smiley=[`<i class="fa-regular fa-face-smile-beam"></i>`,`<i class="fa-regular fa-face-smile"></i>`,`<i class="fa-regular fa-face-frown-open"></i>`,`<i class="fa-regular fa-face-frown"></i>`,`<i class="fa-regular fa-face-sad-tear"></i>`,`<i class="fa-regular fa-face-sad-cry"></i>`];






 
 

async function fetchCurrentData(){


   
    document.getElementById("questionForCurrent").style.display="none";
    document.getElementById("errorForCurrent").style.display="none";
    flexBox.classList.remove("CollapseMe");
    moreDetails.classList.remove("makeVisible");
    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
    loader.style.height= `${window.innerHeight-document.getElementById("searchForCurrent").offsetHeight}px`;
    document.getElementById("comeHere").scrollIntoView({behavior:"smooth"});
    loader.style.display="grid";
  


   await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
 
     
    
      
    
     const response= await fetch(`https://api.weatherapi.com/v1/current.json?key=2f1a5f47063b4d3c96390406240201&q=${city.value.trim()}&aqi=${airCheck.value}`);
    
            const data=await response.json();
        
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



       
    if(airCheck.value==="yes"){
               coValue.innerHTML=data.current.air_quality.co;   
               no2Value.innerHTML=data.current.air_quality.no2;
               o3Value.innerHTML=data.current.air_quality.o3;
       so2Value.innerHTML=data.current.air_quality.so2;
        pm10Value.innerHTML=data.current.air_quality.pm10;
        let ind=data.current.air_quality["us-epa-index"];
       usEpa.innerHTML=data.current.air_quality["us-epa-index"];
       condition.innerHTML=`As per the "US - EPA standard" the condition seems to be "${conditionArray[ind>6?6:ind]}" ${smiley[ind>6?6:ind]}`;


       
       document.getElementById("req").style.display="flex";
       document.getElementById("notReq").style.display="none";



       }
       else{
        document.getElementById("req").style.display="none";
       document.getElementById("notReq").style.display="block";
       }

       await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
       loader.style.display="none";

       
       flexBox.classList.add("CollapseMe");
       setTimeout(()=>{
       
        moreDetails.classList.add("makeVisible");
     },500); 
   
    }
    else{

       if(data.error.code===1003){
        document.getElementById("errorForCurrent").innerHTML=`<h3 class="p-4 shadow rounded text-center">Kindly enter relevant details.</h3>`;
       }
       else{  
        document.getElementById("errorForCurrent").innerHTML=`<h3 class="p-4 shadow rounded text-center">${data.error.message}</h3>`;

       }



        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
        loader.style.display="none";
        document.getElementById("searchForCurrent").scrollIntoView({behavior:"smooth"});
        document.getElementById("errorForCurrent").style.display="initial";

       
        setTimeout(()=>{
        
         moreDetails.classList.add("makeVisible");
      },500); 
    
    }
     

      

    
  
    
}

city.addEventListener("keypress",(event)=>{
    event.key==="Enter"?API.click():"";
});
API.addEventListener("click",fetchCurrentData);


more.addEventListener("click",()=>{

moreDetails.classList.toggle("CollapseMe");
if(moreDetails.classList.contains("CollapseMe")){
    more.innerHTML=`Less Details <i class="fa-solid fa-up-down"></i>`;
}
else{
    more.innerHTML=`More Details <i class="fa-solid fa-up-down"></i>`;

}
});
/*End of the  script  for Current Weather */


