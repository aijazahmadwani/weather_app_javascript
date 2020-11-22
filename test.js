// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");



// API KEY
const key = '4e027d2fcccd807da22c4507d2dafed5';

let latitude = 34.0837;
let longitude = 74.7974;

getWeather(latitude, longitude);


// GET WEATHER FROM API PROVIDER
function getWeather(lat, lon) {

    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            console.log(data);
    
        })
}


