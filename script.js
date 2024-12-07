document.addEventListener("DOMContentLoaded", async() => {
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "541fb41a4f608d350aac0301e88c0422"; //env variables

    getWeatherButton.addEventListener("click", async() => {
        const city = cityInput.value.trim();
        if(!city) return;

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch (error){
            showError();
        }
    });

    async function fetchWeatherData(city){

        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("Response:" , response);
        
        if (!response.ok){
            throw new Error("city not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(Data){
        console.log(Data);
        const {name , main , weather} = Data;
        cityName.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }

})