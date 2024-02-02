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

for (let i = 1; i < 6; i++) 
{
  let forecastDate = $(`.forecastDate-${i}`);
  // console.log(forecastDate);
  forecastDate.text(data.list[i].dt);
}


    currentWeatherData(data);

  });
}

// Here we are extractig the current weather data for the city entered by the user
function currentWeatherData(data) {
  $("#today").text(data.city.name + " (" + moment().format('MM/DD/YYYY') + ")");
  var currentTemp = data.list[0].main.temp;
  var currentWind = data.list[0].wind.speed;
  var currentHumidity = data.list[0].main.humidity
  $("#today").append("<p>" + "</p>");
  $("#today").append("<p>" + "Temp :  " + currentTemp + " 'C" + "</p>" );
  $("#today").append("<p>" + "Wind :  " + currentWind + " KPH" + "</p>");
  $("#today").append("<p>" + "Humidity :  " + currentHumidity + " %" + "</p>");

}

var h5Text = $('.weather-card-1').find('.card-title').text();
    console.log(h5Text); 