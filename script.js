
const inp = document.querySelector(".inp");
const btn = document.querySelector(".btn");

async function checkWeather(city) {
    try {
        
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("City not found. Please enter a valid city name.");
            return;
        }

        const location = geoData.results[0];
        const latitude = location.latitude;
        const longitude = location.longitude;

    
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const current = weatherData.current;

      
        document.querySelector(".city").textContent = location.name;
        document.querySelector(".temp").textContent =
            Math.round(current.temperature_2m) + "°C";

        document.querySelector(".humidity").textContent =
            current.relative_humidity_2m + "%";

        document.querySelector(".wind").textContent =
            current.wind_speed_10m + " km/h";

        console.log(weatherData);

    } catch (error) {
        console.error("Weather error:", error);
        alert("Unable to fetch weather. Please try again.");
    }
}


btn.addEventListener("click", () => {
    checkWeather(inp.value.trim());
});


inp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(inp.value.trim());
    }
});


checkWeather("Delhi");