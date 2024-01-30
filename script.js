// This is our API key
var APIKey = "29e6817d7796a0db3136cccecebc01d6";
var lat = "";
var lon = "";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function (cityToSearch) {
  cityToSearch.preventDefault();
  var cityname = $('#search-input').val();
  searchCity(cityname,APIKey);
  })


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
  
function fiveDayForecast(lat,lon,APIKey) {

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.list[0].dt_txt);
    console.log(data.list[0].main.temp);
    console.log(data.list[0].main.humidity);
      console.log(data.list[0].wind.speed);
   
  });
}


  


// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" 
// + lat + "&lon=" + lon + "&appid=" + APIKey;

// Fetch call to the OpenWeatherMap API
// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {


//     console.log(data);

    
//   });