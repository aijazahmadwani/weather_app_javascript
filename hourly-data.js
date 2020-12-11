const hourlyDataElement = document.getElementById("hourly-data");
let data =[];
data = JSON.parse(localStorage.getItem("hourlyData"));
console.log(data);

// console.log(data.values())
// for(a in data){
//     console.log(Object.keys(a));
// }

// for (let i = 0; i < 4; i++) {
//     let color;
//     // hourlyTemp.push(Math.floor(data.hourly[i].temp - KELVIN));
//     // hour.push(convertTimestamp(data.hourly[i].dt))
//     if(i%2===0){
//         color = '#323544';
//     }
//     else{
//         color='#2D303D';
//     }
//     hourlyDataElement.innerHTML += `<div class="col col-md-2 mt-1 mr-1" style="background-color: ${color};">
//             <h5 class="card-title mt-2">${convertTimestamp(data.hourly[i].dt)}</h5>
//             <h3>${Math.floor(data.hourly[i].temp - KELVIN)} °C </h3>
//             <img src="./icons/${data.hourly[i].weather[0].icon}.png" class="img-fluid" alt="...">
//             <p class="card-text">${data.hourly[i].weather[0].main}</p>
//         </div>`

// }





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
