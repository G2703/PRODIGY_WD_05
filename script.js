function getWeather() {
    const apiKey = '8a3ad4a76486384a76c84f20f5e1974a';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

// function displayWeather(data) {
//     const tempDivInfo = document.getElementById('temp-div');
//     const weatherInfoDiv = document.getElementById('weather-info');
//     const weatherIcon = document.getElementById('weather-icon');
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');

//     // Clear previous content
//     weatherInfoDiv.innerHTML = '';
//     hourlyForecastDiv.innerHTML = '';
//     tempDivInfo.innerHTML = '';

//     if (data.cod === '404') {
//         weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//     } else {
//         const cityName = data.name;
//         const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
//         const description = data.weather[0].description;
//         const iconCode = data.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//         const temperatureHTML = `
//             <p>${temperature}°C</p>
//         `;

//         const weatherHtml = `
//             <p>${cityName}</p>
//             <p>${description}</p>
//         `;

//         tempDivInfo.innerHTML = temperatureHTML;
//         weatherInfoDiv.innerHTML = weatherHtml;
//         weatherIcon.src = iconUrl;
//         weatherIcon.alt = description;

//         showImage();
//     }
// }


function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const bodyElement = document.body; // or any specific element you want to change the background of

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Set the background image based on weather conditions
        const backgroundImageUrl = bodyElement.style.backgroundImage = getBackgroundImage(iconCode);
        setBackgroundStyles(backgroundImageUrl,iconCode);

        showImage();
    }
}

function getBackgroundImage(iconCode) {
    // Define different backgrounds for different weather conditions
    const backgrounds = {
        '01d': 'url(day-clear.avif)', // clear sky day
        '01n': 'url(night-clear.avif)', // clear sky night
        '02d': 'url(day-cloudy.avif)', // few clouds day
        '02n': 'url(night-cloudy.avif)', // few clouds night
        '09d': 'url(day-rainy.avif)', // shower rain
        '09n': 'url(night-rainy.avif)', // shower rain night
        '10d': 'url(day-r.jpg)', // rain day
        '10n': 'url(night-r.jpg)', // rain night
        '11d': 'url(thunderstorm.webp)', // thunderstorm
        '13d': 'url(day-snow.avif)', // snow
        '50d': 'url(day-mist.jpg)', // mist
        '50n': 'url(night-mist.jpg)' // mist night
    };
    return backgrounds[iconCode] || 'url(default.jpg)'; // Default background if no match
}

function setBackgroundStyles(backgroundUrl, iconCode) {
    const bodyElement = document.body;
    bodyElement.style.backgroundImage = backgroundUrl;
    bodyElement.style.backgroundSize = 'cover';
    bodyElement.style.backgroundPosition = 'center center';
    bodyElement.style.backgroundRepeat = 'no-repeat';
    if (iconCode.endsWith('n')) {
        bodyElement.style.color = 'white'; // Night time: use white font
    } else {
        bodyElement.style.color = 'black'; // Day time: use black font
    }
}


function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}