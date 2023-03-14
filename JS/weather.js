// fetches weather data from openWeatherMapApi
function fetchWeather() {
    return fetch("https://api.openweathermap.org/data/2.5/weather?lat=51.595172&lon=-0.378002&appid=3c586f64c7ed29e2cb7d04b14b44d77a&units=metric")
        .then(res => res.json())
}

// renders the weather data on the page
function renderWeather() {
    fetchWeather().then(weather => {
        const location = weather.name
        const temperature = (weather.main.temp).toFixed(0)
        const description = weather.weather[0].description
        const weatherIcon = weather.weather[0].icon

        const weatherHtml = `
            <h2 class="weather-location">${location}</h2>
            <p class="temperature">${temperature}°</p>
            <p class="weather-description">${description}</p>
            <img class="weather-icon" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
            `

        document.getElementById("weather-results").innerHTML = weatherHtml
    })
}

export {fetchWeather, renderWeather}