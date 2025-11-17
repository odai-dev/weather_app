import './styles.css';

const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('.search-btn');



searchBtn.addEventListener('click', () => {
    console.log('clicked');
    let city = cityInput.value;
    console.log(city)

    const weatherJson = getWeather(city);
    weatherJson.then(result => {
        if ( result) {
        console.log(refineWeatherJson(result));
    } 
        
    })
})


async function getWeather(location = '') {
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=PHZ8Y8U6SV33HGUPQP4UBV99B&unitGroup=uk`);
       
        if(!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();

    } catch(e) {
        console.error(`Fetch error: ${e}`);
    }
}

 

function refineWeatherJson(weatherJson = {}) {
    return {
        adress: weatherJson.resolvedAddress , 
        temp: weatherJson.currentConditions.temp,
        condition: weatherJson.currentConditions.condition, 
        desc: weatherJson.description,
        icon: weatherJson.currentConditions.icon,
        humidity: weatherJson.currentConditions.humidity,
        days: weatherJson.days
    }
}

