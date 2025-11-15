import './styles.css';


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
const weatherJson =  await getWeather('ndon');

if (weatherJson) {
    console.log(refineWeatherJson(weatherJson));
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

