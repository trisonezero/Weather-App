openWeatherApiKey = "1e2cb3c6f90875e3709b54ae9422e33b";

const searchBtn = document
  .getElementById("searchBtn")
  .addEventListener("click", function () {
    getLoc(document.getElementById("loc").value);
  });

const searchBtnEnter = document
  .getElementById("loc")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
    }
  });

function getLoc(loc) {
  const geoFetch = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=${openWeatherApiKey}`;
  fetch(geoFetch)
    .then((geoResponse) => geoResponse.json())
    .then((geoData) => {
      lat = geoData[0].lat;
      lon = geoData[0].lon;

      const weaFetch = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
      fetch(weaFetch)
        .then((weaResponse) => weaResponse.json())
        .then((weaData) => {
          d =
            Math.round(weaData["main"].temp) +
            "\u2103\t" +
            weaData["weather"][0].description;
          document.getElementById("basicWeather").innerText = d;
          document.getElementById(
            "descIco"
          ).src = `https://openweathermap.org/img/wn/${weaData["weather"][0].icon}@2x.png`;
          if (String(weaData["weather"][0].id).charAt(0) == "7") {
            weatherType = "Atmosphere";
          } else {
            weatherType = weaData["weather"][0].main;
          }
          document.body.style.backgroundImage = `url('pictures/${weatherType}.jpg')`;
          document.getElementById("basicWeather").style.color = "white";

        });
    })
    .catch(
      (err) => (
        (document.getElementById("basicWeather").innerText = "Invalid City"),
        (document.getElementById("basicWeather").style.color = "red")
      )
    );
}
