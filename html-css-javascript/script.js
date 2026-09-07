
// Get HTML elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherInfo = document.getElementById("weatherInfo");
const weatherIcon = document.getElementById("weatherIcon");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

// When Search button is clicked
searchBtn.addEventListener("click", searchWeather);


// Main function
async function searchWeather() {

    // Get city name from input
    const city = cityInput.value.trim();

    // Check if input is empty
    if (city === "") {
        errorMsg.textContent = "Please enter a city name.";
        return;
    }

    // Remove old error
    errorMsg.textContent = "";

    try {

        const cityUrl =
            "https://geocoding-api.open-meteo.com/v1/search?name="
            + city
            + "&count=1&language=en&format=json";

        const cityResponse = await fetch(cityUrl);

        const cityData = await cityResponse.json();

        // Check if city was found
        if (!cityData.results) {
            throw new Error("City not found.");
        }

        // Get first city result
        const place = cityData.results[0];

        const weatherUrl =
            "https://api.open-meteo.com/v1/forecast?latitude="
            + place.latitude
            + "&longitude="
            + place.longitude
            + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m"
            + "&timezone=auto";

        const weatherResponse = await fetch(weatherUrl);

        const weatherData = await weatherResponse.json();

        // Get current weather
        const current = weatherData.current;


        cityName.textContent = place.name;

        temperature.textContent =
            Math.round(current.temperature_2m) + "°C";

        feelsLike.textContent =
            Math.round(current.apparent_temperature) + "°C";

        humidity.textContent =
            current.relative_humidity_2m + "%";

        windSpeed.textContent =
            Math.round(current.wind_speed_10m) + " km/h";


        if (current.weather_code === 0) {

            condition.textContent = "Clear Sky";
            weatherIcon.src =
                "3d-illustration-sunny-sun-weather-png.webp";

        } else if (current.weather_code <= 3) {

            condition.textContent = "Cloudy";
            weatherIcon.src =
                "windy-cloudy-day-3d-render-weather-icons-set-png.webp";

        } else if (current.weather_code >= 51 && current.weather_code <= 67) {

            condition.textContent = "Rain";
            weatherIcon.src =
                "3d-illustration-of-rainy-weather-png.png";

        } else if (current.weather_code >= 71 && current.weather_code <= 86) {

            condition.textContent = "Snow";
            weatherIcon.src =
                "windy-cloudy-day-3d-render-weather-icons-set-png.webp";

        } else if (current.weather_code >= 95) {

            condition.textContent = "Thunderstorm";
            weatherIcon.src =
                "3d-illustration-of-rainy-weather-png.png";

        } else {

            condition.textContent = "Unknown";
        }


        // Show weather information
        weatherInfo.style.display = "block";

    } catch (error) {

        // Show error message
        errorMsg.textContent = error.message;
    }
}


// Search when Enter key is pressed
cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchWeather();
    }

});

