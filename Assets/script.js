var APIKey = "66a5b909d490ec3c9ab231a86676904b"



// Event listener for all button elements
$("button").on("click", function () {
  event.preventDefault

  
  var savedCities = JSON.parse(localStorage.getItem("citiesSearched")) || []
  savedCities.push($("#cityName").val())
  // localStorage.setItem("citiesSearched", JSON.stringify(savedCities))
  var citySearched = $("#cityName").val().split(" ").join("+");
  var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&units=imperial&appid=" + APIKey;
  console.log(queryURLCurrent)
  // Performing our AJAX GET request
  $.ajax({
    url: queryURLCurrent,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      $("#cityName").val("")

      // Log the queryURL
      console.log(queryURLCurrent);

      // Log the resulting object
      console.log(response);

      // Storing an array of results in the results variable
      var results = response.data;

      // Transfer content to HTML
      var cityName = response.name;
      var currentIcon = response.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      // var uvIndex = ""

      var key = cityName
      var value = {
        "temperature": temperature,
        "humidity": humidity,
        "icon": iconURL,
        "wind speed": windSpeed
      }
      

      // $("#CityName").text("Name: " + cityName);
      console.log(cityName)
      $("#CityName").append(cityName);

      var Date = moment();
      var currentDate = Date.format("L")
      $("#CityName").append(" (" + currentDate + ")");

      // $("#Temp").text("Temperature: " + temperature);
      console.log(temperature)
      $("#Temp").append(temperature + "°F");

      // $("#Humidity").text("Humidity: " + humidity);
      console.log(humidity)
      $("#Humidity").append(humidity + "%");

      // $("Wind-Speed").text("Wind Speed: " + windSpeed);
      console.log(windSpeed)
      $("#Wind-Speed").append(windSpeed + " MPH");

      // $("icon").text("icon: " + icon);
      console.log(iconURL)
      $("#icon").attr("src", iconURL);

      //UV Index

      var lat = response.coord.lat
      var lon = response.coord.lon

      console.log("lat and lon", lat, lon)
      var queryURLUVI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: queryURLUVI,
        method: "GET"
      })
        .then(function (response) {
         
          console.log(response)
          $("#UVIndex").append(response.value)

          UVIndex = response.value
          console.log(UVIndex)

          value.uvindex = UVIndex
          

          if (UVIndex < 2) {
            $("#UVIndex").addClass("low");
          } else if (UVIndex >= 3 && UVIndex <= 7) {
            $("#UVIndex").addClass("medium");
          } else {
            $("#UVIndex").addClass("high");
          }
        })


      //PERFORM FUTURE FORECAST

      var forecastDate = $(".forecastDate");
      
      var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&units=imperial&appid=" + APIKey;


      // Performing our AJAX GET request
      $.ajax({
        url: queryURLForecast,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function (response) {

          // Log the queryURL
          console.log(queryURLForecast);

          // Log the resulting object
          console.log(response);

          forecastDate.each(function (index) {
            console.log(response);
            var dateStr = response.list[index * 8 + 4].dt_txt;
            var thisForecast = response.list[index * 8 + 4];
            dateStr = dateStr.split(" ");
            dateStr = dateStr[0].split("-");
            dateStr = dateStr[1] + "/" + dateStr[2] + "/" + dateStr[0];
            $(this).append(dateStr);
            console.log('forecastDate.length', forecastDate.length);

            var icon = $(this).siblings('img');
            icon.attr('src', "http://openweathermap.org/img/wn/" + thisForecast.weather[0].icon + "@2x.png");

            var temp = $(this).siblings('p:nth-child(3)');
            var thisTemp = thisForecast.main.temp;
            temp.append("Temp: ", thisTemp + "°F")

            var humidity = $(this).siblings('p:nth-child(4)');
            var thisHumidity = thisForecast.main.humidity;
            humidity.append("Humidity: ", thisHumidity + " %")

            value.futuredate = dateStr
            value.futureicon  = icon
            value.futuretemp = thisTemp
            value.futurehumidity = thisHumidity
            console.log(value)

            localStorage.setItem(key, JSON.stringify(value))

          })
        })
    })



  function addCityList() {
    //append saved cites to list in grey side bar
    //
  }

  

  var cities = []
  function getStoredCities(city) {
    var storedCities = JSON.parse(localStorage.getItem(city))
    cities = storedCities
    console.log(storedCities)

    //onclick event triggers function 
  }
  getStoredCities()
 
})







// // Create the  list group to contain the articles and add the article content for each
// var prevCitiesSearched = $("<ul>");
// prevCitiesSearched.addClass();



// // Add the newly created element to the DOM
// $("#prevSearch").append(prevCitiesSearched);
