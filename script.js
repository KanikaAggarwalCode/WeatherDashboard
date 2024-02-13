// This is our API key
var APIKey = "29e6817d7796a0db3136cccecebc01d6";

// Here we are listening for the click on the submit button
$("#search-button").on("click", function (cityToSearch) {
  cityToSearch.preventDefault();
  var cityname = $('#search-input').val();
  searchCity(cityname,APIKey);
    })

// Here we are querying the lat and lon for the city entered by the user
  function searchCity(cityname,APIKey) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var lat = data.coord.lat;
    var lon = data.coord.lon;

   
   
   fiveDayForecast(lat,lon,APIKey);
   currentWeatherData(data); 
  });
}
  
// Here we are querying the five day forecast for the city entered by the user
function fiveDayForecast(lat,lon,APIKey) {

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

//adding forecast date in forecast weather

    for (let i = 1, j=0; i < 5,j < 33; i = i + 1, j= j+8) 
    {
console.log(i);
      let forecastDate = $(`.forecastDate-${i}`);
      var datePart = data.list[j].dt_txt.split(" ")[0];
      forecastDate.text(datePart);
   
      let forecastTemp = $(`.forecastTemp-${i}`);
      forecastTemp.text("Temp :  " + data.list[j].main.temp + " 'C");

      let forecastWind = $(`.forecastWind-${i}`);
      forecastWind.text("Wind :  " + data.list[j].wind.speed + " KPH");

      let forecastHumidity = $(`.forecastHumidity-${i}`);
      forecastHumidity.text("Humidity :  " + data.list[j].main.humidity + " %");

    }


  });
}

// Here we are extractig the current weather data for the city entered by the user
function currentWeatherData(data) {

const iconCode = data.weather[0].icon;
console.log(iconCode); 
// / Extract the icon code from the API response
const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

console.log(iconUrl);
$('#weatherIcon').attr('src', iconUrl);


  $("#today").text(data.name + " (" + moment().format('MM/DD/YYYY') + ")");
  var currentTemp = data.main.temp;
  var currentWind = data.wind.speed;
  var currentHumidity = data.main.humidity
  $("#today").append("<p>" + "Temp :  " + currentTemp + " 'C" + "</p>" );
  $("#today").append("<p>" + "Wind :  " + currentWind + " KPH" + "</p>");
  $("#today").append("<p>" + "Humidity :  " + currentHumidity + " %" + "</p>");

}

