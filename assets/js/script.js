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
var stored = [];


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


                    // CHANGE STATE OF UV INDEX COLOR
                    if (data.current.uvi <= 2) {
                        currentUV.style.cssText = 'color:white;background-color:green';
                        currentUV.textContent = "UV Index: " + data.current.uvi + " LOW";
                    } else if (3 <= data.current.uvi <= 5) {
                        currentUV.style.cssText = 'color:orange;background-color:yellow';
                        currentUV.textContent = "UV Index: " + data.current.uvi + " MODERATE";
                    } else if (6 <= data.current.uvi <= 7) {
                        currentUV.style.cssText = 'color:yellow;background-color:orange';
                        currentUV.textContent = "UV Index: " + data.current.uvi + " HIGH";
                    } else if (8 <= data.current.uvi <= 10) {
                        currentUV.style.cssText = 'color:yellow;background-color:red';
                        currentUV.textContent = "UV Index: " + data.current.uvi + " VERY HIGH";
                    } else {
                        currentUV.style.cssText = 'color:yellow;background-color:purple';
                        currentUV.textContent = "UV Index: " + data.current.uvi + " EXTREME";
                    };


                    // SET ITEM TO LOCAL STORAGE                 
                    var pastCity = locData.name;
                    pastCitySearches.push(pastCity);
                    localStorage.setItem("pastCitySearches", JSON.stringify(pastCitySearches));
                    

                    // RETRIEVE PAST CITY FROM LOCAL STORAGE
                    // var stored = localStorage.getItem("pastCitySearches");
                    // console.log("PAST", stored);
                    document.getElementById("past-city").textContent = stored;
                   
                        // var getPast = stored[i];
                    //     console.log("RESULT", stored);
                    

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
                        // console.log("DATE", dayDate);
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

