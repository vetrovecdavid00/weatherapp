const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search-bar");

// Function to get weather data from API
const getWeatherData = async (city) => {
  const apiKey = "5e26bb268a45e281f76a8c540593efef"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to update weather information on the page
const updateWeatherInfo = (data) => {
  const city = document.querySelector(".city");
  const temp = document.querySelector(".temp");
  const icon = document.querySelector(".icon");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  
  city.textContent = `Weather in ${data.name}`;
  temp.textContent = `${data.main.temp}°C`;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
};

// Function to handle search button click event
const handleSearchButtonClick = async () => {
  const city = searchInput.value.trim();
  if (city !== "") {
    const weatherData = await getWeatherData(city);
    updateWeatherInfo(weatherData);
  }
};

searchButton.addEventListener("click", handleSearchButtonClick);
