//API Key for OpenWeather One Call API
var apiKey = "eebc865f1c6aa0621cdf3e0afb3d3b5a";

// VARIABLES
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('search-btn');
var currentCity = document.getElementById('current-city');
var currentTemp = document.getElementById('current-temp');
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentUV = document.getElementById('current-uv');
var forecast = document.getElementById('forecast');
var weekDate = document.getElementById('week-date');
var weekTemp = document.getElementById('week-temp');
var weekHumidity = document.getElementById('week-humidity');
var weekWind = document.getElementById('week-wind');
var city = searchInput;

// FUNCTIONS
// search through an index of cities for current weather info
var getSearch = function () {
    var queryString = document.location.search;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(queryString);
    fetch(queryURL)
        .then(function (queryURL) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        }

// EVENT LISTENERS
searchBtn.addEventListener('click', getSearch);


