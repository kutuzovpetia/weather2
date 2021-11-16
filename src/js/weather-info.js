import Weather from './weather-service';
import config from "./configChart";
import Chart from 'chart.js/auto';
import moment from "moment-timezone";

class WeatherInfo {

    constructor() {
        this.chart = document.getElementById('myChart').getContext('2d');
        this.weather = new Weather();
        this._URL = 'http://openweathermap.org/img/wn/';
    }

    timeConverter(UNIX_timestamp) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const date = a.getDate();
        const time = `${days[a.getDay()]}, ${months[a.getMonth()]} ${date}`
        return time;
    }

    timeConvertToHour(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var hour = a.getHours();
        return hour;
    }

    createDayList(data){
        let html = ''
        data.daily.forEach(day => {
            const {icon} = day.weather[0]
            html += `<li class="collection-item">
                                <span>${this.timeConverter(day.dt)}</span>
                                <div class="collection-item__info">
                                    <img src="${this._URL}${icon}.png" alt="icon">
                                    <span>${Math.floor(day.temp.max)} / ${Math.floor(day.temp.min)} \t&#176;C</span>
                                </div>
                            </li>`
        })
        return html;
        document.querySelector('.collection').innerHTML = html;
    }


    render(data) {
        const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
        let windDeg = data.wind.deg;
        windDeg = windDeg * 8 / 360;
        windDeg = Math.round(windDeg, 0);
        windDeg = (windDeg + 8) % 8;

        const lon = data.coord.lon;
        const lat = data.coord.lat;

        document.querySelector('.info__weather-head-top').innerHTML = `
            <h3 class="city">${data.name}, ${data.sys.country}</h3>
        `



        document.querySelector('.info__weather-head-temperature').innerHTML = `
            <img src="${this._URL}${data.weather[0].icon}.png" alt="icon"/>
            <span class="tem_s">${Math.floor(data.main.temp)}\t&#176;С</span>
        `
        document.querySelector('.info__weather-head-info').innerHTML = `
            <h6 class="feels_like">Feels like ${Math.floor(data.main.feels_like)}\t&#176;C ${data.weather[0].description}</h6>
            <div class="params">
                <span>
                    <i class="material-icons">near_me</i>
                    ${data.wind.speed} m/s ${directions[windDeg]}
                </span>
                <span>
                    <i class="material-icons">panorama_fish_eye</i>
                    ${data.main.pressure} hPa
                </span>
                <span>
                    <i class="material-icons">water_drop</i>
                    Humidity: ${data.main.humidity}%
                    </span>
                <span>
                    <i class="material-icons">opacity</i>
                    Dew point: 8°C
                </span>
                <span>
                    <i class="material-icons">visibility</i>
                    Visibility: ${data.visibility / 1000}km
                </span>
            </div>
        `

        this.weather.getWeatherByCord(lat, lon)
            .then(res => {
                return res.json();
            }).then(data => {

            const uv = document.createElement('span');
            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.textContent = `light_mode`;
            uv.textContent = "UV: " + data.current.uvi;
            uv.prepend(icon);
            document.querySelector('.params').append(uv);

            const time = moment(data.current.dt*1000);
            const t = document.createElement('div');
            t.classList.add('time');
            t.textContent = `${this.timeConverter(data.current.dt)} ${time.tz(data.timezone).format('h:mm a')}`;
            document.querySelector('.info__weather-head-top').prepend(t);

            let chartStatus = Chart.getChart("myChart");
            if (chartStatus != undefined) {
                chartStatus.destroy();
            }
            this.displayGraph(data);
                document.querySelector('.dayList').innerHTML = `
                    <h6>8-day forecast</h6>
                    <ul class="collection">${this.createDayList(data)}</ul>
                `
            })
    }

    displayGraph(data){

        const hourlyTem = [];
        hourlyTem.unshift(data.current.temp);
        for (let i = 1; i <= 8; i++){
            hourlyTem.push(data.hourly[i].temp)
        }

        const labels = [];
        labels.unshift('now');
        for (let i = 1; i <= 8; i++){

            const time = moment(data.hourly[i].dt*1000);
            labels.push(time.tz(data.timezone).format('ha'))
        }
        new Chart(this.chart, config(hourlyTem, labels));
    }
}

export default WeatherInfo;