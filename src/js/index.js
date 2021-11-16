import Search from "./search";
import WeatherInfo from "./weather-info";
import Weather from "./weather-service";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

document.addEventListener('DOMContentLoaded', async ()=>{


     await new Weather().getWeatherByCity('Kiev')
         .then(res=>{
              return res.json();
         }).then(data=>{
              new WeatherInfo().render(data);
         })

     new Search();
})