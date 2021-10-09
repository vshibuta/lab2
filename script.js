document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    // console.log(value);

    //Calls API
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=cb554d9b11910848445590e424d7e288";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        alert("inside json function");

        let results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        for (let i=0; i < json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
        results += '<div id=currentWeatherInfo>';
        results += '<h2 id="currentWeatherTemperature">' + parseInt(json.main.temp) + "<span id='degrees'>&deg;F</span></h2></div>"
        results += '<div id=resultDescription><p id="currentWeatherDescription">'
        results += 'Feels like ' + parseInt(json.main.feels_like) + '<span id="degreesSmaller">&deg;F</span><br>';
        results += 'Min. today ' + parseInt(json.main.temp_min) + '<span id="degreesSmaller">&deg;F</span><br>';
        results += 'Max today ' + parseInt(json.main.temp_max) + '<span id="degreesSmaller">&deg;F</span><br>';
        results += '</p></div>';
  
        results += '<div id="otherInfoContainer"><p class="otherInfo">Humidity: ' + parseInt(json.main.humidity) + '%</p>';
        results += '<p class="otherInfo">Wind: ' + parseInt(json.wind.speed) + 'mph</p></div>';
        for (let i=0; i < json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
            results += ", "
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
        });
        const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=cb554d9b11910848445590e424d7e288";
        fetch(url2)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            let forecast = "";
            for (let i=0; i < json.list.length; i++) {
        forecast += "<div class = 'box'>";
        forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + " F°</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        
        forecast += "</div>";
            }
            document.getElementById("forecastResults").innerHTML = forecast;
          });
          
          
  });
