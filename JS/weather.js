// fetches weather data from openWeatherMapApi
function fetchWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=3c586f64c7ed29e2cb7d04b14b44d77a&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(weather => {
                const location = weather.name
                const temperature = (weather.main.temp).toFixed(0)
                const description = weather.weather[0].description
                const weatherIcon = weather.weather[0].icon
    
                const weatherHtml = `
                    <img class="weather-icon" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
                    <p class="temperature">${temperature}°</p>
                    <h2 class="weather-location">${location}</h2>
                   `
                document.getElementById("weather-results").innerHTML = weatherHtml
            })
            .catch(err => {
                console.error(err) 
            }) 
                
    })
}

export {fetchWeather}