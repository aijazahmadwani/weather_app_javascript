const hourlyDataElement = document.getElementById("hourly-data");
let data = [];
const KELVIN = 273;
data = JSON.parse(localStorage.getItem("hourlyData"));

for (let i = 0; i < 48; i++) {
    hourlyDataElement.innerHTML += `
    <tr>
        <th scope="row">${convertTimestamp(data.hourly[i].dt)}</th>
        <td>${Math.floor(data.hourly[i].temp - KELVIN)} °C </td>
        <td><img src="./icons/${data.hourly[i].weather[0].icon}.png" width="32px"alt="..."> </img></td>
        <td>${data.hourly[i].weather[0].main}</td>
    </tr>`
}

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