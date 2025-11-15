import './styles.css';


async function getWeather(location = {}) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=PHZ8Y8U6SV33HGUPQP4UBV99B`);
    const data = await response.json();
    console.log(data);
    return data;
}
const weatherJson =  await getWeather('sana\'a');

console.log(refineWeatherJson(weatherJson));

async function refineWeatherJson(weatherJson = {}) {
    return {
        adress: weatherJson.resolvedAddress , 
        temp: weatherJson.currentConditions.temp , 
        desc: weatherJson.description
    };
}

