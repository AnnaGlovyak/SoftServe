async function checkIP () {
    const URL = 'http://ip-api.com/json/?fields=status,message,country,query';

    const IP = await fetch(URL)
        .then(response => {
            if (response.status !== 200) {
                throw new Error ('error in fetch ip');
            } else return response.json();
        })
        .then(data => data.query)
        .catch( err => console.log(err));
    
    return IP;
}

async function checkWeather (ip) {
    const KEY = '4354a9a971e145e8a7b143607213010';
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${ip}&days=3`;
    const weatherData = {};

    await fetch(URL)
    .then(response => {
        if (response.status !== 200) {
            throw new Error ('error in fetch weather');
        } else return response.json();
    })
    .then(data => {
        weatherData.city = data.location.name;
        weatherData.temp_c = data.current.temp_c;
        weatherData.condition = data.current.condition.text;
        weatherData.icon = data.current.condition.icon;
        weatherData.forecast = [];
        data.forecast.forecastday.forEach((el) => weatherData.forecast.push(el));
    })
    .catch( err => console.log(err));

    return weatherData;
}


async function setWeather () {

    const IP = await checkIP ();
    const weatherData = await checkWeather (IP);

    const location = document.getElementById('location');
    location.innerText = weatherData.city;

    const temperature = document.getElementById('temperature');
    temperature.innerHTML = `${weatherData.temp_c}<span class="location__temperature-icon">&deg</span>`;

    const image = document.querySelector('.weather__icon');
    const icon = document.createElement('img');
    icon.setAttribute('src', weatherData.icon);
    icon.setAttribute('alt', weatherData.condition);
    image.append(icon)

    const condition = document.getElementById('condition');
    condition.innerText = weatherData.condition;
    console.log(condition);

    ////// forecast for 4 days
    const forecast = document.getElementById('forecast');

    for (let i = 0; i < weatherData.forecast.length; i++) {
        let date = new Date(weatherData.forecast[i].date.split('-').join(','));
        let day = '';

        if (i === 0) {
            day = 'Today';
        } else if (i === 0) {
            day = 'Tomorrow';
        } else {
            day = date.toLocaleString("en-US", { weekday: 'long'});
        }

        forecast.innerHTML += 
        `<div class="forecast__day day">
            <div class="day__name">
                <p class="day__date">
                    ${date.toLocaleString("en-US", { month: 'long', day: 'numeric'})}
                </p>
                <p class="day__number">
                    ${day}
                </p>
            </div>
            <div class="day__weather">
                <div class="day__icon">
                    <img src=${weatherData.forecast[i].day.condition.icon} alt=${weatherData.forecast[i].day.condition.text} border="0">
                </div>
                <p class="day__temperature-day">
                    ${weatherData.forecast[i].day.maxtemp_c}
                </p>
                <p class="day__temperature-night">
                    ${weatherData.forecast[i].day.mintemp_c}
                </p>
            </div>
        </div>`
    }
}
setWeather();