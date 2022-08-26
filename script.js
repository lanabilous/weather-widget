"use strict";

const weatherBlock = document.querySelector("#weather");

async function loadWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=4f77248d5d7fa83f0c041bbb87c24976`;

  const response = await fetch(apiUrl, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}
function getWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `<div class="weather__header">
  <div class="weather__main">
    <div class="weather__city">${location}</div>
    <div class="weather__status">${weatherStatus}</div>
  </div>
  <div class="weather__icon">
    <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
  </div>
</div>
<div class="weather__temp">${temp}</div>
<div class="weather__feels-like">Feels like: ${feelsLike}</div>
`;
  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather("Khmelnytskyi");
}

// ---------------------------
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    if (searchInput.value.length >= 2) {
      console.log(searchInput.value);
      loadWeather(searchInput.value);
    }
  }
});
