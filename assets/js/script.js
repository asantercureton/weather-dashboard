//API Key for OpenWeather One Call API
var apiKey = "2a2e6a7e28b96bcdbaf4d067f7bfb83f";

// VARIABLES
var formEl = document.getElementById('form');
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


var resultCard = document.createElement('div');
resultCard.classList.add('card');

var resultBody = document.createElement('div');
resultBody.classList.add('card-body');

var titleEl = document.createElement('h2');

var bodyContentEl = document.createElement('p');

//     var queryString = document.location.search;
// FUNCTIONS
// search through an index of cities for current weather info
function getSearch(event) {
    event.preventDefault();
    var city = "charlotte";
    var urlQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(urlQuery)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
};





// EVENT LISTENERS
formEl.addEventListener('submit', getSearch);



    // var searchInputVal = document.querySelector('#search-input').value;
    // var formatInputVal = document.querySelector('#format-input').value;

    // if (!searchInputVal) {
    //     console.error('You need a search input value!');
    //     return;
    // }

    // searchApi(searchInputVal, formatInputVal);
