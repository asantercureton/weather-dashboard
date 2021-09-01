//API Key for OpenWeather One Call API
var apiKey = "2a2e6a7e28b96bcdbaf4d067f7bfb83f";

// VARIABLES
var formEl = document.getElementById('form');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('search-btn');
var currentCity = document.getElementById('current-city');
var currentTemp = document.getElementById('current-temp');
var currentDate = document.getElementById('current-date');
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentUV = document.getElementById('current-uv');
var forecast = document.getElementById('forecast');
var weekDate = document.getElementById('week-date');
var weekTempMin = document.getElementById('week-tempMin');
var weekHumidity = document.getElementById('week-humidity');
var weekWind = document.getElementById('week-wind');
var pastCitySearches = [];


// FUNCTIONS
// Get search info of city for current weather info
function getSearch(event) {
    event.preventDefault();
    // Display the current date
    var currentDate = moment().format("M/D/YYYY");
    //Instructor provided sample
    var coordsURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}`;
    console.log(coordsURL);
    fetch(coordsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (locData) {
            console.log(locData);
            var cityLat = locData.coord.lat;
            var cityLon = locData.coord.lon;
            var part = "minutely,hourly,alerts";
            var urlQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=" + part + "&appid=" + apiKey;
            fetch(urlQuery)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // CURRENT WEATHER ICON
                    var iconWeather = locData.weather[0].icon;
                    var iURL = "http://openweathermap.org/img/w/" + iconWeather + ".png";

                    $('#weather-icon').attr('src', iURL);

                    // DISPLAY CONTENT TO HTML
                    currentCity.textContent = locData.name + " (" + currentDate + ")";
                    currentTemp.textContent = "Temp: " + (((parseInt(locData.main.temp) - 273.15) * 1.80) + 32).toFixed(2) + " °F";
                    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    currentHumidity.textContent = "Humidity: " + data.current.humidity + " %";
                    currentUV.textContent = "UV Index: " + data.current.uvi;
                    currentUV.style.cssText = 'color:white;background-color:green';
                    

                    // SET ITEM TO LOCAL STORAGE                 
                    // SEND TO LOCAL STORAGE
                    // APPEND LOCAL STORAGE TO HTML
                    
                    var pastCity = locData.name;
                    pastCitySearches.push(pastCity);
                    localStorage.setItem("pastCitySearches", JSON.stringify(pastCitySearches));

                    var stored = JSON.parse(localStorage.getItem("pastCitySearches"));
                    

                    // var result = stored;
                    console.log("RESULT", stored);

                    // append new value to the array
                    // pastCitySearches.push(result);

                    document.getElementById("past-city").append(stored);



                    // FOR LOOP TO GET DATA FOR 5-DAY FORECAST
                    for (var i = 0; i < 5; i++) {
                        var minTemp = data.daily[i].temp.min;
                        var maxTemp = data.daily[i].temp.max;
                        var dayHumidity = data.daily[i].humidity;
                        var dayWind = data.daily[i].wind_speed;
                        // USE MOMENT AND ADD 1 DAY THEN FORMAT DATE
                        var dayDate = moment().add(i + 1, "days").format("M/D/YYYY");
                        // WEATHER ICONS
                        var iconCode = data.daily[i].weather[0].icon;
                        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        // IMAGE
                        $('#img' + i).attr('src', iconURL);

                        // DISPLAY CONTENT ON HTML
                        console.log("DATE", dayDate);
                        document.getElementById('week-date' + i).textContent = dayDate;
                        document.getElementById('week-tempMax' + i).textContent = "Max Temp: " + (((parseInt(maxTemp) - 273.15) * 1.80) + 32).toFixed(2) + " °F";
                        document.getElementById('week-tempMin' + i).textContent = "Min Temp: " + (((parseInt(minTemp) - 273.15) * 1.80) + 32).toFixed(2) + " °F";
                        document.getElementById('week-wind' + i).textContent = "Wind: " + dayWind + " MPH";
                        document.getElementById('week-humidity' + i).textContent = "Humidity: " + dayHumidity + " %";
                    }
                });

        })
};



// EVENT LISTENERS
$("#search-btn").on("click", getSearch);

