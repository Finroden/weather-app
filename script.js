const input = document.querySelector('.city-input');
const button = document.querySelector('.find-btn');
const errorMessage = document.querySelector('.error-message');
const weatherContainer = document.querySelector('.weather-container');

button.addEventListener('click', () => {
    const city = input.value.trim();

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.classList.remove('hidden');
        weatherContainer.classList.add('hidden');
        return;
    }

    errorMessage.classList.add('hidden');
    fetchWeather(city);
});

async function fetchWeather(city) {
    const apiKey = 'dd92fc3176e94df98c4147655b98d97b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        document.querySelector('.city-name').textContent = data.name;
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.description').textContent = data.weather[0].description;
        document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind-speed').textContent = `${data.wind.speed} m/s`;
        document.querySelector('.pressure').textContent = `${data.main.pressure} hPa`;
        document.querySelector('.perceived-temp').textContent = `${Math.round(data.main.feels_like)}°C`;

        weatherContainer.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        input.placeholder = 'Enter another city';
    } catch (error) {
        errorMessage.textContent = 'City not found. Try again.';
        errorMessage.classList.remove('hidden');
        weatherContainer.classList.add('hidden');
    }
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        button.click();
    }
});
