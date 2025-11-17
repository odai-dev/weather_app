import './styles.css';

const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('.search-btn');
const errorDiv = document.querySelector('.error');

const addressEl = document.querySelector('#address');
const tempEl = document.querySelector('#temp');
const descriptionEl = document.querySelector('#desc');
const humidityEl = document.querySelector('#humidity');


getWeather('sanaa');

searchBtn.addEventListener('click', () => {
    console.log('clicked');
    let city = cityInput.value;
    console.log(city)

    const weatherJson = getWeather(city);
    console.log(weatherJson);
    weatherJson.then(result => {
        if ( result) {
            console.log(refineWeatherJson(result));
            const weather = refineWeatherJson(result); 
            addressEl.textContent = `City: ${weather.address}`;
            tempEl.textContent = `Temperature: ${weather.temp}`;
            descriptionEl.textContent = `description: ${weather.desc}`;
            humidityEl.textContent = `humidity: ${weather.humidity}`;            
        }     
    })
})




async function getWeather(location = '') {
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=PHZ8Y8U6SV33HGUPQP4UBV99B&unitGroup=uk`);
       
        if(!response.ok) {
            if (response.status == 400) {
                throw new Error(`Invalid City!`);
            }
            throw new Error(`API Error: ${response.status}`);
        }
        errorDiv.textContent = '';
        return await response.json();

    } catch(e) {
        errorDiv.textContent = e;
        console.error(`Fetch error: ${e}`);
    }
}

function refineWeatherJson(weatherJson = {}) {
    return {
        address: weatherJson.resolvedAddress , 
        temp: weatherJson.currentConditions.temp,
        condition: weatherJson.currentConditions.condition, 
        desc: weatherJson.description,
        icon: weatherJson.currentConditions.icon,
        humidity: weatherJson.currentConditions.humidity,
        days: weatherJson.days,
        precipitation:  weatherJson.precipitation
    }
}

