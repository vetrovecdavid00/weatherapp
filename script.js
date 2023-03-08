let weather = {
  apiKey: "5e26bb268a45e281f76a8c540593efef",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
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
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

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

weather.fetchWeather("Denver");

// Get references to the search bar input and search button elements
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search button');

// Define a function to handle the retrieval of the user's location
function handleLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Use the OpenCage Geocoding API to retrieve the city name based on the coordinates
  const apiKey = 'Y48c1d42ee901416e94637f4bdf559db8';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = data.results[0].components.city;
      searchBar.value = city;
      searchButton.click();
    })
    .catch(error => console.error(error));
}

// Define a function to handle errors in location retrieval
function handleLocationError(error) {
  console.error(error);
}

// Attach a click event listener to the search button
searchButton.addEventListener('click', event => {
  event.preventDefault();
  
  // Use the OpenWeatherMap API to retrieve weather information for the searched city
  const apiKey = '5e26bb268a45e281f76a8c540593efef';
  const city = searchBar.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update the weather card with the retrieved data
      const city = data.name;
      const temperature = `${Math.round(data.main.temp)}°C`;
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      const description = data.weather[0].description;
      const humidity = `Humidity: ${data.main.humidity}%`;
      const windSpeed = `Wind speed: ${data.wind.speed} km/h`;

      const weatherCard = document.querySelector('.weather');
      weatherCard.classList.remove('loading');
      weatherCard.querySelector('.city').textContent = `Weather in ${city}`;
      weatherCard.querySelector('.temp').textContent = temperature;
      weatherCard.querySelector('.icon').setAttribute('src', icon);
      weatherCard.querySelector('.description').textContent = description;
      weatherCard.querySelector('.humidity').textContent = humidity;
      weatherCard.querySelector('.wind').textContent = windSpeed;
    })
    .catch(error => console.error(error));
});

// Ask the user for their location using the Geolocation API when the page loads
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError);
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
});
