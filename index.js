let now = new Date();
let currentDate = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getUTCFullYear();

let date = document.querySelector("li#date");
date.innerHTML = `${currentDay}, ${currentDate}th ${currentMonth}, ${currentYear}`;

let time = document.querySelector("li#time");
time.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} HRS`;

// 👨‍🏫Your task
//On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", searchCity);

let apiKey = "cf3e506438214bee7911d63659fba7fa";

function searchCity(event) {
  event.preventDefault();
  let searchEngine = document.querySelector("#place-search");
  console.log(searchEngine.value);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchEngine.value}&units=metric`;

  axios.get(`${url}&appid=${apiKey}`).then(searchPlace);

  function searchPlace(response) {
    let searchDisplay = document.querySelector("#placeDisplay");
    searchDisplay.innerHTML = `${searchEngine.value}`;

    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = ` ${temperature}`;

    let description = document.querySelector("#forecast");
    description.innerHTML = `Forecast: ${response.data.weather[0].description}`;

    let tempChange = document.querySelector("#celcius");
    tempChange.addEventListener("click", cel);

    function cel(event) {
      event.preventDefault();
      let tempCel = document.querySelector("#temp");
      tempCel.innerHTML = `${temperature}`;
    }

    let tempChange2 = document.querySelector("#farh");
    tempChange2.addEventListener("click", farh);

    function farh(event) {
      let tempFarh = document.querySelector("#temp");
      let tempFarenheit = Math.round((temperature * 9) / 5 + 32);
      tempFarh.innerHTML = `${tempFarenheit}`;
    }
  }
}

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

let submitBtn = document
  .getElementById("currentLocation")
  .addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(handlePosition);
  });
//submitBtn.addEventListener("click", handlePosition);

function showTemp(response) {
  let city = response.data.name;
  console.log(`Temperature in ${city} is ${response.data.main.temp}`);

  let searchDisplay = document.querySelector("#placeDisplay");
  searchDisplay.innerHTML = `${city}`;
  //console.log(city);

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  let description = document.querySelector("#forecast");
  temperatureElement.innerHTML = ` ${temperature}`;
  description.innerHTML = `Forecast: ${response.data.weather[0].description}`;

  let tempChange = document.querySelector("#celcius");
  tempChange.addEventListener("click", cel);

  function cel(event) {
    event.preventDefault();
    let tempCel = document.querySelector("#temp");
    tempCel.innerHTML = `${temperature}`;
  }

  let tempChange2 = document.querySelector("#farh");
  tempChange2.addEventListener("click", farh);

  function farh(event) {
    let tempFarh = document.querySelector("#temp");
    let tempFarenheit = Math.round((temperature * 9) / 5 + 32);
    tempFarh.innerHTML = `${tempFarenheit}`;
  }
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  console.log(`Latitude: ${latitude}`);
  let longitude = position.coords.longitude;
  console.log(`Longitude: ${longitude}`);

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  axios.get(`${url}&appid=${apiKey}`).then(showTemp);
}
