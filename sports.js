
const sportsAPI=document.getElementById("sportsAPI");
const sportsDetails=document.getElementById("sportsDetails");
const cityForSports=document.getElementById("cityForSports");
const cricket=document.getElementById("cricket");
const football=document.getElementById("football");
const golf=document.getElementById("golf");
const loaderForSports=document.getElementById("loaderForSports");
const noSports=document.getElementById('noSports');

async function fetchSportsData(){


    document.getElementById("questionForSports").style.display="none";
    
    cricket.style.display="none";
    football.style.display="none";
    golf.style.display="none";
    document.getElementById("noSports").style.display="none";
   

    while  (football.firstChild) {
        football.firstChild.remove();
    }
    while (cricket.firstChild) {
        cricket.firstChild.remove();
    }
    while (golf.firstChild) {
        golf.firstChild.remove();
        
    }
    const styles=["p-2","shadow"];
    loaderForSports.style.height=`${window.innerHeight-document.getElementById("searchForSports").offsetHeight}px`;
    loaderForSports.style.display="grid";
    await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),500));
   
   
    
   

 
 

 
   const response= await fetch(`https://api.weatherapi.com/v1/sports.json?key=2f1a5f47063b4d3c96390406240201&q=${cityForSports.value.trim()}`);
           const obj= await response.json();
     

    if(!obj.hasOwnProperty("error")){
          let classes=["col-lg-4","col-md-6", "col-sm-12", "col-xs-12", "p-3","my-3"];
          if(obj.football.length>0){
          let head=document.createElement("h3");
          head.classList.add("col-12");
          head.innerHTML="FOOTBALL";
                football.appendChild(head);
               for(let i in obj.football){
                       let div=document.createElement("div");

                             div.classList.add(...classes);
                            div.innerHTML=`<div class="p-2 shadow rounded"> 
                                     <h4  class="col-12 text-center"><span >Country - </span><span   class="countryValue">${obj.football[i].country===""?"No data":obj.football[i].country}</span></h4>
                                <p class="col-12  border-bottom p-2"><span >Stadium - </span><span   class="stadiumValue">${obj.football[i].stadium===""?"No data":obj.football[i].stadium}</span></p>
                                <p class="col-12  border-bottom p-2"><span >Region - </span><span   class="regionValue">${obj.football[i].region===""?"No data":obj.football[i].region}</span></p>
                               <p class="col-12  border-bottom p-2"><span >Tournament - </span><span  class="tournamentValue">${obj.football[i].tournament===""?"No data":obj.football[i].tournament}</span></p>
                               <p class="col-12  border-bottom p-2"><span >Start - </span><span  class="startValue" >${obj.football[i].start===""?"No data":obj.football[i].start}</span></p>
                                 <p class="col-12  border-bottom p-2"><span >Match - </span><span   class="matchValue">${obj.football[i].match===""?"No data":obj.football[i].match}</span></p>
                                 </div>`;
                                      football.appendChild(div);
                               }
                               }

                             if(obj.cricket.length>0){ 
                             let headForCricket=document.createElement("h3");
                             headForCricket.classList.add("col-12");
                             headForCricket.innerHTML="CRICKET";
                             cricket.appendChild(headForCricket);
                             for(let i in obj.cricket){
                             let div=document.createElement("div");

                             div.classList.add(...classes);
                             div.innerHTML=` <div class="p-2 shadow rounded"> 
                             <h4  class="col-12  "><span >Country - </span><span   class="countryValue">${obj.cricket[i].country===""?"No data":obj.cricket[i].country}</span></h4>
                             <p class="col-12  border-bottom p-2"><span >Stadium - </span><span   class="stadiumValue">${obj.cricket[i].stadium===""?"No data":obj.cricket[i].stadium}</span></p>
                             <p class="col-12  border-bottom p-2"><span >Region - </span><span   class="regionValue">${obj.cricket[i].region===""?"No data":obj.cricket[i].region}</span></p>
                             <p class="col-12  border-bottom p-2"><span >Tournament - </span><span  class="tournamentValue">${obj.cricket[i].tournament===""?"No data":obj.cricket[i].tournament}</span></p>
                             <p class="col-12  border-bottom p-2"><span >Start - </span><span  class="startValue" >${obj.cricket[i].start===""?"No data":obj.cricket[i].start}</span></p>
                             <p class="col-12  border-bottom p-2"><span >Match - </span><span   class="matchValue">${obj.cricket[i].match===""?"No data":obj.cricket[i].match}</span></p>
                             </div>`;
   

 
   


                             cricket.appendChild(div);



                             }
                             }

                             if(obj.golf.length>0){
                             let headForGolf=document.createElement("h3");
                             headForGolf.classList.add("col-12");
                             headForGolf.innerHTML="GOLF";
                              golf.appendChild(headForGolf);
                             for(let i in obj.golf){
                             let div=document.createElement("div");

                            div.classList.add(...classes);
                            div.innerHTML=` <div class="p-2 shadow rounded"> 
                            <h4  class="col-12  "><span >Country - </span><span   class="countryValue">${obj.golf[i].country===""?"No data":obj.golf[i].country}</span></h4>
                            <p class="col-12 border-bottom p-2"><span >Stadium - </span><span   class="stadiumValue">${obj.cricket[i].stadium===""?"No data":obj.golf[i].stadium}</span></p>
                            <p class="col-12 border-bottom p-2"><span >Region - </span><span   class="regionValue">${obj.golf[i].region===""?"No data":obj.golf[i].region}</span></p>
                            <p class="col-12 border-bottom p-2"><span >Tournament - </span><span  class="tournamentValue">${obj.golf[i].tournament===""?"No data":obj.golf[i].tournament}</span></p>
                            <p class="col-12 border-bottom p-2"><span >Start - </span><span  class="startValue" >${obj.golf[i].start===""?"No data":obj.golf[i].start}</span></p>
                            <p class="col-12 border-bottom p-2"><span >Match - </span><span   class="matchValue">${obj.golf[i].match===""?"No data":obj.golf[i].match}</span></p>
                            </div>`;
   

 
   


                            golf.appendChild(div);



                            }
                            }

                            await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),800));

                            loaderForSports.style.display="none";
                            
                            
                            if(obj.cricket.length===0 && obj.football.length===0 && obj.golf.length===0){
                                cricket.classList.remove(...styles);
                                football.classList.remove(...styles);
                                golf.classList.remove(...styles);
                                football.style.display="none";
                                cricket.style.display="none";
                                golf.style.display="none";
                            noSports.innerHTML=`<h4 class="p-4 shadow my-3">Looks like no event is scheduled.</h4>`;
                            noSports.style.display="initial";
                          
                           
                            
                            }
                            else{
                               

                                noSports.style.display="none";
                                
                                if(obj.cricket.length!==0){
                                    cricket.style.display="initial";
                                cricket.classList.add(...styles);
                                }
                                else{
                                    cricket.classList.remove(...styles);
                                }
                                
                                if(obj.football.length!==0){
                                football.style.display="initial";
                                football.classList.add(...styles);
                                }
                                else{
                                    football.classList.remove(...styles);
                                }
                                
                                if(obj.golf.length!==0){
                                    golf.classList.add(...styles);
                                golf.style.display="initial";
                                }
                                else{
                                      golf.classList.remove(...styles);
                                }
                            
                            
                            }
                            
                            
                           
                            
                            
                                       
                            
                               
            }

           else{  
            if(obj.error.code===1003){
               noSports.innerHTML=`<h4 class="p-4 shadow my-3">Kindly enter relevant details...</h4>`;
            }
            else{
                  noSports.innerHTML=`<h4 class="p-4 shadow my-3">${obj.error.message}</h4>`;
             }
       
      

      
              
              football.style.display="none";
              cricket.style.display="none";
              golf.style.display="none";
             
              await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),500));
           
              loaderForSports.style.display="none";
              await new Promise(resolve=>setTimeout(()=> resolve("This is for loading Time"),500));
              noSports.style.display="initial";

   }

}

sportsAPI.addEventListener("click",fetchSportsData);
cityForSports.addEventListener("keypress",(event)=>{

event.key==="Enter"?sportsAPI.click():"";
});




