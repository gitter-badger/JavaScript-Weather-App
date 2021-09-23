let weather = {
  apiKey: "98089c814ceb7377bc0bbd0ba68651ec",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found at your location.");
          throw new Error("No weather found at your location.");
        }
        return response.json();
      })
      .then((data) => displayWeather(data));
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText =
    "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind speed: " + speed + " km/h";
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + description + " weather" + "')";
  // document.body.style.backgroundImage = url(`../img/${description}.jpg`);
}

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


//Checking Current Location Of The User

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  alert("Browser doesn't Support Geolocation");
}



// SET USER'S POSITION
function setPosition(position){
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    .then((response) => {
      locationJson = response.json();
      return locationJson;
    })
    .then((locationJson) => detLocation(locationJson));
}

//Determine USER'S LOCATION
function detLocation(locationJson) {
  locationcity = locationJson.locality;
  initialWeatherCall(locationcity);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
function initialWeatherCall(locationCity) {
  weather.fetchWeather(locationCity);
}





  // // SELECT ELEMENTS
// const iconElement = document.querySelector(".icon");
// const tempElement = document.querySelector(".temp");
// const descElement = document.querySelector(".description");
// const city = document.querySelector(".city");
// const humidity = document.querySelector(".humidity");
// const wind = document.querySelector(".wind");
// const weather = document.querySelector(".weather");
// const searchBtn = document.querySelector(".search button");
// const searchBar = document.querySelector(".search-bar");
// // TEMP IN KELVIN
// const KELVIN = 273;
// // API KEY
// const key = "98089c814ceb7377bc0bbd0ba68651ec";

// weather.fetchWeather("Mumbai");
