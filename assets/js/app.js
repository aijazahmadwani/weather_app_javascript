// SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const locationElement = document.getElementById("location");
const districtElement = document.getElementById("district");
const iconElement = document.getElementById("weather-icon");
const mainTempElement = document.getElementById("main-temperature");
const weatherMainElement = document.getElementById("weather-main");
const currentTimeElement = document.getElementById("currenttime");
const feelsLikeElement = document.getElementById("feels-like");
const pressureElement = document.getElementById("pressure");
const humidityElement = document.getElementById("humidity");
const sealevelElement = document.getElementById("sea-level");
const groundLevelElement = document.getElementById("ground-level");
const visibilityElement = document.getElementById("visibility");
const windspeedElement = document.getElementById("wind-speed");
const windDirectionElement = document.getElementById("wind-direction");
const cloudsElement = document.getElementById("clouds");
const sunsetElement = document.getElementById("sunset");
const sunriseElement = document.getElementById("sunrise");
const hourlyDataElement = document.getElementById("hourly-data");
const weekDataElement = document.getElementById("week-data");
// App data
const weather = {};
let hourlyTemp = [];
let hour = [];
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
    notificationElement.innerHTML = `<p> How can i detect your location</p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(lat, lon) {
    let currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    // console.log(currentApi);
    let detailApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}`;

    fetch(currentApi)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            weather.location = data.name;
            weather.country = data.sys.country;
            weather.weatherMain = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.temperature = Math.floor(data.main.temp - KELVIN);
            weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
            weather.pressure = data.main.pressure;
            weather.humidity = data.main.humidity;
            weather.seaLevel = data.main.sea_level;
            weather.groundLevel = data.main.grnd_level;
            weather.visibility = data.visibility;
            weather.windSpeed = data.wind.speed;
            weather.windDeg = data.wind.deg;
            weather.clouds = data.clouds.all;
            weather.dateTime = convertTimestamp(data.dt);
            weather.country = data.sys.country;
            weather.sunset = convertTimestamp(data.sys.sunset);
            weather.sunrise = convertTimestamp(data.sys.sunrise);
        })
        .then(() => {
                displayWeather();
                hourlyData(detailApi);
            })
}
function hourlyData(detailApi) {
    fetch(detailApi)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("hourlyData",JSON.stringify(data));               
            for (let i = 0; i < 4; i++) {
                let color;
                // hourlyTemp.push(Math.floor(data.hourly[i].temp - KELVIN));
                // hour.push(convertTimestamp(data.hourly[i].dt))
                if(i%2===0){
                    color = '#323544';
                }
                else{
                    color='#2D303D';
                }
                hourlyDataElement.innerHTML += `<div class="col col-md-2 mt-1 mr-1" style="background-color: ${color};">
                        <h5 class="card-title mt-2">${convertTimestamp(data.hourly[i].dt)}</h5>
                        <h3>${Math.floor(data.hourly[i].temp - KELVIN)} °C </h3>
                        <img src="./assets/animated_icons/${data.hourly[i].weather[0].icon}.svg" width="50%" class="img-fluid" alt="...">
                        <p class="card-text">${data.hourly[i].weather[0].description}</p>
                    </div>`

            }
            for (let i = 0; i < 7; i++) {
                let color;
                // hourlyTemp.push(Math.floor(data.hourly[i].temp - KELVIN));
                // hour.push(convertTimestamp(data.hourly[i].dt))
                if(i%2===0){
                    color = '#323544';
                }
                else{
                    color='#2D303D';
                }
                weekDataElement.innerHTML += `<div class="col floatLeft col-sm-4 col-md-2 mt-1 mr-1 mb-1" style="background-color: ${color};>
                        <p class="card-title mt-2">${convertToDate(data.daily[i].dt)}</p>
                        <h3>${Math.floor(data.daily[i].temp.day - KELVIN)} °C / ${Math.floor(data.daily[i].temp.night - KELVIN)} °C</h3>
                        <img src="./assets/animated_icons/${data.daily[i].weather[0].icon}.svg" width="50%" class="img-fluid" alt="...">
                        <p class="card-text">${data.daily[i].weather[0].description}</p>
                    </div>`
                    

            }

        })
}
// DISPLAY WEATHER TO UI
function displayWeather() {
    iconElement.src = `./assets/animated_icons/${weather.iconId}.svg`;
    districtElement.innerHTML = weather.location;
    mainTempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
    locationElement.innerHTML = weather.location + ', ' + weather.country;
    currentTimeElement.innerHTML += weather.dateTime;
    feelsLikeElement.innerHTML = `${weather.feelsLike}°<span>C</span>`;
    weatherMainElement.innerHTML = weather.weatherMain;
    pressureElement.innerHTML = `${weather.pressure} hPa`;
    humidityElement.innerHTML = `${weather.humidity} %`;
    sealevelElement.innerHTML = `${weather.seaLevel} hPa`;
    groundLevelElement.innerHTML = `${weather.groundLevel} hPa`;
    visibilityElement.innerHTML = `${weather.visibility} m`;
    windspeedElement.innerHTML = `${weather.windSpeed} m/s`;
    windDirectionElement.innerHTML = `${weather.windDeg} °`;
    cloudsElement.innerHTML = `${weather.clouds} %`;
    sunsetElement.innerHTML += weather.sunset;
    sunriseElement.innerHTML += weather.sunrise;

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
//function to convert unix timestamp to local time and date
function convertToDate(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        day = weekday[d.getDay()];

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
    date = day + ' '+dd + '-' + mm;

    return date;
}
