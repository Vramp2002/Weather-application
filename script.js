const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="da324792115fb55bf9e704f87ba6a5d7";

weatherform.addEventListener("submit", async event=>{
   event.preventDefault();

   const city=cityinput.value;

   if(city){
       try{
           const weatherData =await getweatherData(city);
           displayweatherinfo(weatherData);
       }
       catch(error){
           console.error(error);
           displayError(error);
       }

   }
   else{
       displayError("Please enter a city");
   }

});


async function getweatherData(city){

   const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

   const response=await fetch(apiurl);
   if(!response.ok){
       throw new Error("Could  not fetch weather data");
   }
   return await response.json();

}

function displayweatherinfo(data){

   
   const { name: city,
       main: {temp,humidity},
       weather: [{description,id}]}=data;

       card.textContent="";
       card.style.display="flex";

       const citydisplay=document.createElement("h1");
       const tempdisplay=document.createElement("p");
       const humiditydisplay=document.createElement("p");
       const descdisplay=document.createElement("p");
       const weatheremoji=document.createElement("p");

       citydisplay.textContent=city;
       citydisplay.classList.add("citydisplay");
       tempdisplay.textContent=`${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
       tempdisplay.classList.add("tempdisplay");
       humiditydisplay.textContent=`Humidity: ${humidity}`;
       humiditydisplay.classList.add("humiditydisplay");
       descdisplay.textContent=description;
       descdisplay.classList.add("descdisplay");
       weatheremoji.textContent=getweatherEmoji(id);
       weatheremoji.classList.add("weatherEmoji");

       card.appendChild(citydisplay);
       card.appendChild(tempdisplay);
       card.appendChild(humiditydisplay);
       card.appendChild(descdisplay);
       card.appendChild(weatheremoji);

}
function getweatherEmoji(weatherid){

   switch(true){
       case(weatherid>=200 && weatherid<300):
          return "⛈️";
       case(weatherid>=300 && weatherid<400):
          return "🌧️";
       case(weatherid>=500 && weatherid<600):
          return "🌦️";
       case(weatherid>=600 && weatherid<700):
          return "❄️";
       case(weatherid>=700 && weatherid<800):
          return "🌪️";
       case(weatherid ===800):
          return "☀️";
       case(weatherid>=801 && weatherid<810):
          return "🌥️";
       default:
           return "❓";
   }

   
}
function displayError(message){
   
   const errordisplay=document.createElement("p");

   errordisplay.textContent=message;
   errordisplay.classList.add("errordisplay");

   card.textContent="";
   card.style.display="flex";
   card.append(errordisplay);
}