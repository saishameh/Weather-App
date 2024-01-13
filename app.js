const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');


const getWeather = async(city) => {
    const apiKey = '281c54119c1418b81ffb049c0d0d7740';
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

    const query = `
        ${baseURL}?q=${city}&appid=${apiKey}
    `;
    
    const response = await fetch(query);
    const weatherDate = await response.json();
    return weatherDate;
}

function convertKelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function isDaytime(icon) {
    const lastChar = icon.slice(-1);
    if (lastChar === 'd') {
        return true; 
    } else if (lastChar === 'n') {
        return false; 
    }
}


updateUI = (data) => {
    cityName.textContent = data.name;
    
    const imageName = data.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${convertKelvinToCelsius(data.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${data.weather[0].description}</p>
              <p class="high">${convertKelvinToCelsius(data.main.temp_max)}&deg;C</p>
              <p class="low">${convertKelvinToCelsius(data.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${convertKelvinToCelsius(data.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="col text-center">
              <p>${data.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;

    if (isDaytime(imageName)) {
        timeImage.setAttribute('src', 'img/day.png');
    } else {
        timeImage.setAttribute('src', 'img/night.png');

    }

    cardInfo.classList.remove('d-none');

}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const citySearched = cityValue.value;
    console.log(citySearched);
    searchForm.reset();

    getWeather(citySearched)
        .then((data) => {
            updateUI(data);
        })
        .catch((error) => {
            console.log(error);
        });
});
