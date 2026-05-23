const apiKey = "d77f80180f503a3fad7d2f17690b6b95";
const city = "Lagos";
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;


async function getCurrentWeather(){
   try{
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();
        // console.table(data);
        displayCurrentWeather(data);
   } catch(error){
    console.error("error fetching current weather data:", error)
   }
}

function displayCurrentWeather(weatherData){
    const weatherSection = document.querySelector(".weather-section");
    const temp = document.getElementById("temperature").textContent = weatherData.main.temp;
    const imgIcon = document.getElementById("weather-icon").src =`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const description = document.getElementById("description").textContent = weatherData.weather[0].description;
        


}

getCurrentWeather();

async function getForecastWeather(){
   try{
        const response = await fetch(forecastWeatherUrl);
        const data = await response.json();
        const forecast = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0,3);
        // console.table(data);
        displayForecastWeather(forecast); 
   } catch(error){
    console.error("error fetching forecast weather data:", error)
   }
} 

function displayForecastWeather(forecastData) {
    const forecastContainer = document.getElementById("forecast-weather");
    forecastContainer.innerHTML = "";
    
    forecastData.forEach(entry => {
        const dayName = new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        const temp = entry.main.temp;
        const description = entry.weather[0].description;
        const icon = entry.weather[0].icon;

        const card = document.createElement("div");
        card.classList.add("forecast-card");
        card.innerHTML = `
            <p class="forecast-day">${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <p class="forecast-temp">${temp}°C</p>
            <p class="forecast-desc">${description}</p>
        `;
        forecastContainer.appendChild(card);
    });
}



getForecastWeather();