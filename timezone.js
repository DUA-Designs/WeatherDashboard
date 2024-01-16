 
const data={
    "location": {
        "name": "Cairo",
        "region": "Al Qahirah",
        "country": "Egypt",
        "lat": 30.05,
        "lon": 31.25,
        "tz_id": "Africa/Cairo",
        "localtime_epoch": 1705396030,
        "localtime": "2024-01-16 11:07"
    }
};
const NameValue=document.getElementById("NameValue");
const RegionValue=document.getElementById("RegionValue");
const CountryValue=document.getElementById("CountryValue");
const LatitudeValue=document.getElementById("LatitudeValue");
const LongitudeValue=document.getElementById("LongitudeValue");
const TimezoneValue=document.getElementById("TimezoneValue");
const LocalValue=document.getElementById("LocalValue");
const timezoneAPI=document.getElementById("timezoneAPI");
const cityForTimezone=document.getElementById("cityForTimezone");
const loaderForTimezone=document.getElementById("loaderForTimezone");
const timeDetails=document.getElementById('timeDetails');


 

 async function fetchTimezoneData(){
    await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));
    loaderForTimezone.style.height= `${window.innerHeight-document.getElementById("searchForTimezone").offsetHeight}px`;
    document.getElementById("loaderForTimezone").scrollIntoView({behavior:"smooth"});
    loaderForTimezone.style.display="grid";
  


   await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),3000)));
   /*const response=fetch(`http://api.weatherapi.com/v1/timezone.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForTimezone.value}`);
    
     response.then((res)=>res.json()).then((data)=>{
        console.log(data);*/
        NameValue.innerHTML=data["location"]["name"];
 RegionValue.innerHTML=data["location"]["region"];
 CountryValue.innerHTML=data["location"]["country"]
 LatitudeValue.innerHTML=data["location"]["lat"];
 LongitudeValue.innerHTML=data["location"]["lon"];
 TimezoneValue.innerHTML=data["location"]["tz_id"];
 LocalValue.innerHTML=data["location"]["localtime"];
    
    /*});*/
        await new Promise(resolve=>setTimeout(()=>setTimeout(()=>resolve("This is for loading Time"),1000)));

        loaderForTimezone.style.display="none";
        timeDetails.style.display="flex";


 }
 cityForTimezone.addEventListener("keypress",(event)=>{
    event.key==="Enter"?timezoneAPI.click():"";
});
 timezoneAPI.addEventListener("click",fetchTimezoneData );






 


