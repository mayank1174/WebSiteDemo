
const weatherform = document.querySelector('.weatherform');
const cityinput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const apiKey="a99ccc62b048ebaeaf954c70d56bc5d6";

 
weatherform.addEventListener('submit', async event =>{
    event.preventDefault();
    
    const cityName = cityinput.value;

     if(cityName){
        try{
        const weatherdata = await getweatherdata(cityName);
        displayWeather(weatherdata);
       }
         catch(error){  
            displayError('Please enter a valid city name');
        }
    }
     
     else{
        displayError('Unable to fetch weather data. Please try again.');
    }

});

async function getweatherdata(cityname){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;
    const response = await fetch (apiurl);
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

function displayWeather(data){
    
    weatherResult.style.display = 'block';
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('description').textContent = `${data.weather[0].description}`;
    document.getElementById('weathericon').textContent = getweathericon(data.weather[0].id);
    
    
    
}

function getweathericon(weatherId){
    if(weatherId >= 200 && weatherId < 300){
        return '⛈️'; // Thunderstorm
    }
    else if(weatherId >= 300 && weatherId < 500){
        return '🌦️'; // Drizzle
    }
    else if(weatherId >= 500 && weatherId < 600){
        return '🌧️'; // Rain
    }
    else if(weatherId >= 600 && weatherId < 700){
        return '❄️'; // Snow
    }
    else if(weatherId >= 700 && weatherId < 800){
        return '🌫️'; // Fog
    }
    else if(weatherId === 800){
        return '☀️'; // Clear sky
    }
    else{
        return '❓'; // Unknown weather condition
    }
    

}

function displayError(message){
    weatherResult.style.display = 'block';
    document.getElementById('error').textContent =  message ;
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('weathericon').textContent = '';
}