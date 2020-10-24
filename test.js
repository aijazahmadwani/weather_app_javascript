// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");



// API KEY
const key = '4e027d2fcccd807da22c4507d2dafed5';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Your Browser doesn't Support Geolocation. Please update your browser to latest version.</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}
    `;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data);
        })
}


