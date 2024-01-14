/* From here the script is for Dashboard */ 
const components=["welcome","current","forecast","history","future","marine","astronamy","timezone","sports"];
 async function render(state){
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

    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1500)));
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
            document.getElementById("close").classList.remove("expandMe");

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
const conditionArray=["Good","Moderate","Unhealthy for sensitive group","Unhealthy for all","Very Unhealthy","Hazardous"];
const smiley=[`<i class="fa-regular fa-face-smile-beam"></i>`,`<i class="fa-regular fa-face-smile"></i>`,`<i class="fa-regular fa-face-frown-open"></i>`,`<i class="fa-regular fa-face-frown"></i>`,`<i class="fa-regular fa-face-sad-tear"></i>`,`<i class="fa-regular fa-face-sad-cry"></i>`];







const timer=setInterval(()=>{
     const date=new Date();
    let hours=date.getHours();
    let minutes=date.getMinutes();

    document.getElementById("time").innerHTML=`${hours} : ${minutes>9?minutes:"0"+minutes} ${hours>=12?"PM":"AM"}`;

},1000);

async function dataFromAPI(){
    flexBox.classList.remove("CollapseMe");
    moreDetails.classList.remove("makeVisible");
    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
    loader.style.display="grid";

   await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),3000)));
   
      const data={
        "location": {
            "name": "Pune",
            "region": "Maharashtra",
            "country": "India",
            "lat": 18.53,
            "lon": 73.87,
            "tz_id": "Asia/Kolkata",
            "localtime_epoch": 1705127713,
            "localtime": "2024-01-13 12:05"
        },
        "current": {
            "last_updated_epoch": 1705127400,
            "last_updated": "2024-01-13 12:00",
            "temp_c": 30.3,
            "temp_f": 86.5,
            "is_day": 1,
            "condition": {
                "text": "Sunny",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                "code": 1000
            },
            "wind_mph": 2.2,
            "wind_kph": 3.6,
            "wind_degree": 107,
            "wind_dir": "ESE",
            "pressure_mb": 1014,
            "pressure_in": 29.95,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 30,
            "cloud": 5,
            "feelslike_c": 29.2,
            "feelslike_f": 84.6,
            "vis_km": 10,
            "vis_miles": 6,
            "uv": 8,
            "gust_mph": 6.7,
            "gust_kph": 10.8,
            "air_quality": {
                "co": 841.1,
                "no2": 14.4,
                "o3": 137.3,
                "so2": 26.2,
                "pm2_5": 120.6,
                "pm10": 131,
                "us-epa-index": 4,
                "gb-defra-index": 10
            }
        }
    };

    
      
    
    /* const response=fetch(`https://api.weatherapi.com/v1/current.json?key=2f1a5f47063b4d3c96390406240201&q=${city.value}&aqi=${airCheck.value}`);
    
     response.then((res)=>res.json()).then((data)=>{
        console.log(data);
        */
       
       locationHead.innerHTML=`City - ${data.location.name}, ${data.location.region} <span id="deg">${data.current.temp_c}<sup> o</sup><sub>c</sub></span>`;
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

       loader.style.display="none";

      

    
     /*});*/
     setTimeout(()=>{
        flexBox.classList.add("CollapseMe");
        moreDetails.classList.add("makeVisible");
     },1000);
    
   
}
city.addEventListener("keypress",(event)=>{
    event.key==="Enter"?API.click():"";
});
API.addEventListener("click",dataFromAPI);


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


