// SELECT ELEMENTS
const locationElement = document.querySelector(".location");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const notificationElement = document.querySelector(".notification");
const currentTime = document.getElementById("currenttime");

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
      let currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    // console.log(currentApi);
    // let detailApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely}&appid=${key}`;
    // console.log(api);
    // fetch(api)
    fetch(currentApi)
        .then((response)=> {
            return response.json();
        })
        .then((data)=> {
            t = convertTimestamp(1606016787);
            weather.name = data.name
            weather.main = data.weather.main;
            weather.description = data.weather.description;
            weather.iconId = data.weather.icon;
            weather.temperature = Math.floor(data.main.temp - KELVIN);
            weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
            weather.tempMin = Math.floor(data.main.temp_min - KELVIN);
            weather.tempax = Math.floor(data.main.temp_max - KELVIN);
            weather.pressure = data.main.pressure;
            weather.humidity = data.main.humidity;
            weather.seaLevel = data.main.sea_level;
            weather.groundLevel = data.main.grnd_level;
            weather.visibility = data.visibility;
            weather.windSpeed = data.wind_speed;
            weather.clouds = data.clouds.all;
            weather.dateTime = data.dt;
            weather.country = data.sys.country;
            weather.sunset = data.sys.sunset;
            weather.sunrise = data.sys.sunrise;
            
            weather.dewPoint = data.dew_point;
            weather.uvi = data.uvi;
            weather.clouds = data.clouds;
            
            

        })
        .then(function () {
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
    // iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    // tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
    // descElement.innerHTML = weather.description;
    locationElement.innerHTML = weather.name;

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

    time = h + ':' + min + ' ' + ampm + ',' + dd + '-' + mm + '-' + yyyy;

    return time;
}
