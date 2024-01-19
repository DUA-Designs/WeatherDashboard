
const sportsAPI=document.getElementById("sportsAPI");
const sportsDetails=document.getElementById("sportsDetails");
const cityForSports=document.getElementById("cityForSports");

async function fetchSportsData(){
    document.getElementById("questionForSports").style.display="none";

    while (document.getElementById("football").firstChild) {
        document.getElementById("football").firstChild.remove();
    }
    while (document.getElementById("cricket").firstChild) {
        document.getElementById("cricket").firstChild.remove();
    }
    while (document.getElementById("golf").firstChild) {
        document.getElementById("golf").firstChild.remove();
        
    }
    const styles=["p-2","shadow"];

    document.getElementById("football").style.display="none";
    document.getElementById("cricket").style.display="none";
    document.getElementById("golf").style.display="none";
    
    document.getElementById("noSports").style.display="none";
   

   await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),1000));
   document.getElementById("loaderForSports").style.display="grid";
   document.getElementById("loaderForSports").style.height=`${window.innerHeight-document.getElementById("searchForSports").offsetHeight}px`;

 
 

 
   const response= await fetch(`https://api.weatherapi.com/v1/sports.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForSports.value}`);
           const obj= await response.json();
console.log(obj);

   if(!obj.hasOwnProperty("error")){
    let classes=["col-lg-4","col-md-6", "col-sm-12", "col-xs-12", "p-3","mx-auto"];
   if(obj.football.length>0){
        let head=document.createElement("h3");
       head.classList.add("col-12");
       head.innerHTML="FOOTBALL";
       document.getElementById("football").appendChild(head);
for(let i in obj.football){
let div=document.createElement("div");

div.classList.add(...classes);
div.innerHTML=` 
<h4  class="col-12"><span >Country - </span><span   class="countryValue">${obj.football[i].country===""?"No data":obj.football[i].country}</span></h4>
<p class="col-12"><span >Stadium - </span><span   class="stadiumValue">${obj.football[i].stadium===""?"No data":obj.football[i].stadium}</span></p>
<p class="col-12"><span >Region - </span><span   class="regionValue">${obj.football[i].region===""?"No data":obj.football[i].region}</span></p>
<p class="col-12"><span >Tournament - </span><span  class="tournamentValue">${obj.football[i].tournament===""?"No data":obj.football[i].tournament}</span></p>
<p class="col-12"><span >Start - </span><span  class="startValue" >${obj.football[i].start===""?"No data":obj.football[i].start}</span></p>
<p class="col-12"><span >Match - </span><span   class="matchValue">${obj.football[i].match===""?"No data":obj.football[i].match}</span></p>`;
  


  


document.getElementById("football").appendChild(div);



}
}

if(obj.cricket.length>0){ 
let headForCricket=document.createElement("h3");
headForCricket.classList.add("col-12");
headForCricket.innerHTML="CRICKET";
document.getElementById("cricket").appendChild(headForCricket);
for(let i in obj.cricket){
let div=document.createElement("div");

div.classList.add(...classes);
div.innerHTML=` 
<h4  class="col-12"><span >Country - </span><span   class="countryValue">${obj.cricket[i].country===""?"No data":obj.cricket[i].country}</span></h4>
<p class="col-12"><span >Stadium - </span><span   class="stadiumValue">${obj.cricket[i].stadium===""?"No data":obj.cricket[i].stadium}</span></p>
<p class="col-12"><span >Region - </span><span   class="regionValue">${obj.cricket[i].region===""?"No data":obj.cricket[i].region}</span></p>
<p class="col-12"><span >Tournament - </span><span  class="tournamentValue">${obj.cricket[i].tournament===""?"No data":obj.cricket[i].tournament}</span></p>
<p class="col-12"><span >Start - </span><span  class="startValue" >${obj.cricket[i].start===""?"No data":obj.cricket[i].start}</span></p>
<p class="col-12"><span >Match - </span><span   class="matchValue">${obj.cricket[i].match===""?"No data":obj.cricket[i].match}</span></p>`;
   

 
   


document.getElementById("cricket").appendChild(div);



}
}
if(obj.golf.length>0){
let headForGolf=document.createElement("h3");
headForGolf.classList.add("col-12");
headForGolf.innerHTML="GOLF";
document.getElementById("golf").appendChild(headForGolf);
for(let i in obj.golf){
let div=document.createElement("div");

div.classList.add(...classes);
div.innerHTML=` 
<h4  class="col-12"><span >Country - </span><span   class="countryValue">${obj.golf[i].country===""?"No data":obj.golf[i].country}</span></h4>
<p class="col-12"><span >Stadium - </span><span   class="stadiumValue">${obj.cricket[i].stadium===""?"No data":obj.golf[i].stadium}</span></p>
<p class="col-12"><span >Region - </span><span   class="regionValue">${obj.golf[i].region===""?"No data":obj.golf[i].region}</span></p>
<p class="col-12"><span >Tournament - </span><span  class="tournamentValue">${obj.golf[i].tournament===""?"No data":obj.golf[i].tournament}</span></p>
<p class="col-12"><span >Start - </span><span  class="startValue" >${obj.golf[i].start===""?"No data":obj.golf[i].start}</span></p>
<p class="col-12"><span >Match - </span><span   class="matchValue">${obj.golf[i].match===""?"No data":obj.golf[i].match}</span></p>`;
   

 
   


document.getElementById("golf").appendChild(div);



}
}

await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),1000));

document.getElementById("loaderForSports").style.display="none";


if(obj.cricket.length===0 && obj.football.length===0 && obj.golf.length===0){
document.getElementById("noSports").innerHTML=`<h4 class="p-4 shadow my-3">Looks like no event is scheduled.</h4>`;
document.getElementById("noSports").style.display="initial";
document.getElementById("football").style.display="none";
document.getElementById("cricket").style.display="none";
document.getElementById("golf").style.display="none";

}
else{
document.getElementById("noSports").style.display="none";


}


if(obj.cricket.length!==0){


document.getElementById("cricket").style.display="initial";
document.getElementById("cricket").classList.add(...styles);
}
else{
    document.getElementById("cricket").classList.remove(...styles);
}

if(obj.football.length!==0){
document.getElementById("football").style.display="initial";
document.getElementById("football").classList.add(...styles);
}
else{
    document.getElementById("football").classList.remove(...styles);
}

if(obj.golf.length!==0){
    document.getElementById("golf").classList.add(...styles);
document.getElementById("golf").style.display="initial";
}
else{
      document.getElementById("golf").classList.remove(...styles);
}


           

   
   }

   else{
  

  
      
 
       if(obj.error.code===1003){
        document.getElementById("noSports").innerHTML=`<h4 class="p-4 shadow my-3">Kindly enter relevant details...</h4>`;
       }
       else{
        document.getElementById("noSports").innerHTML=`<h4 class="p-4 shadow my-3">${obj.error.message}</h4>`;
       }
       
      

     
      document.getElementById("cricket").classList.remove(...styles);
document.getElementById("football").classList.remove(...styles);
document.getElementById("golf").classList.remove(...styles);
      document.getElementById("football").style.display="none";
      document.getElementById("cricket").style.display="none";
      document.getElementById("golf").style.display="none";
      await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),1000));
   
      document.getElementById("loaderForSports").style.display="none";
      document.getElementById("noSports").style.display="initial";

   }



      
 
 
  
  




}

sportsAPI.addEventListener("click",fetchSportsData);
cityForSports.addEventListener("keypress",(event)=>{

event.key==="Enter"?sportsAPI.click():"";
});




