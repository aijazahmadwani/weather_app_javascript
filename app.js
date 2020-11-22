// SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const locationElement = document.getElementById("location");
const iconElement = document.getElementById("weather-icon");
const tempElement = document.getElementById("temperature-value");
const descElement = document.getElementById("temperature-description");
const currentTimeElement = document.getElementById("currenttime");
const feelsLikeElement = document.getElementById("feels-like");
const highByLow = document.getElementById("highbylow");
const pressureElement= document.getElementById("pressure");
const humidityElement = document.getElementById("humidity");
const sealevelElement = document.getElementById("sealevel");
const groundLevelElement = document.getElementById("groundlevel");
const visibilityElement = document.getElementById("visibility");
const windspeedElement = document.getElementById("windspeed");
const cloudsElement = document.getElementById("clouds");
const sunsetElement = document.getElementById("sunset");
const temperatureMainElement = document.getElementById("temerature-main");
const sunriseElement = document.getElementById("sunrise");
// App data
const weather = {};

weather.unit = "celsius";

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = '4e027d2fcccd807da22c4507d2dafed5';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Your Browser doesn't Support Geolocation. Please update your browser to latest version.</p>";
}

// SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(lat, lon) {
    //let currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    // console.log(currentApi);
    // let detailApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely}&appid=${key}`;
    // console.log(api);
    
    fetch('data/currentApi.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            t = convertTimestamp(1606016787);
            weather.location = data.name;
            weather.country = data.sys.country;
            weather.main = data.weather[0].main;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.temperature = Math.floor(data.main.temp - KELVIN);
            weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
            weather.tempMin = Math.floor(data.main.temp_min - KELVIN);
            weather.tempMax = Math.floor(data.main.temp_max - KELVIN);
            weather.pressure = data.main.pressure;
            weather.humidity = data.main.humidity;
            weather.seaLevel = data.main.sea_level;
            weather.groundLevel = data.main.grnd_level;
            weather.visibility = data.visibility;
            weather.windSpeed = data.wind.speed;
            weather.clouds = data.clouds.all;
            weather.dateTime = convertTimestamp(data.dt);
            weather.country = data.sys.country;
            weather.sunset = data.sys.sunset;
            weather.sunrise = data.sys.sunrise;
        })
        .then(function () {
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
    iconElement.src =  `./icons/${weather.iconId}.png`;
    // tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
    tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
    locationElement.innerHTML = weather.location + ', ' +  weather.country;
    currentTimeElement.innerHTML += weather.dateTime;
    highByLow.innerHTML = `${weather.tempMax}° / ${weather.tempMin}°`;

}

// C to F conversion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
// tempElement.addEventListener("click", function () {
//     if (weather.temperature === undefined) return;

//     if (weather.unit == "celsius") {
//         let fahrenheit = celsiusToFahrenheit(weather.temperature);
//         fahrenheit = Math.floor(fahrenheit);

//         tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
//         weather.unit = "fahrenheit";
//     } else {
//         tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
//         weather.unit = "celsius"
//     }
// });







//function to convert unix timestamp to local time and date
function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    //time = h + ':' + min + ' ' + ampm + ',' + dd + '-' + mm + '-' + yyyy;
    time = h + ':' + min + ' ' + ampm;

    return time;
}
