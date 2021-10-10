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

        let results = "";
        results += '<div class = weatherbox><h2 class = evenbigger>' + json.name;
        for (let i=0; i < json.weather.length; i++) {
            results += '<img class = "weathericon" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/></h2>';
        }
        results += '<h2 class = bigtemp>' + json.main.temp + " &deg;F</h2>"
        results += "<p class = pipoca>"
        results += '<strong>Feels like:</strong> ' + parseInt(json.main.feels_like) + '<span>&deg;F</span><br>';
        results += '<strong>Min. Temperature</strong>: ' + parseInt(json.main.temp_min) + '<span>&deg;F</span><br>';
        results += '<strong>Max. Temperature</strong>: ' + parseInt(json.main.temp_max) + '<span>&deg;F</span><br>';
       
  
        results += '<div><p class = "pipoca"><strong>Humidity:</strong> ' + parseInt(json.main.humidity) + '%</p>';
        results += '<p> <strong>Wind:</strong> ' + parseInt(json.wind.speed) + 'mph</p>';
        for (let i=0; i < json.weather.length; i++) {
            results += json.weather[i].description
            if (i !== json.weather.length - 1)
            results += ", "
        }
        results += "</p></div>";
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
