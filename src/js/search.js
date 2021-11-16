import Weather from "./weather-service";
import WeatherInfo from "./weather-info";

export default class Search{
    constructor(){
        this.inputSearch = document.getElementById('search');
        this.btnSearch = document.querySelector('.search__input button[type=submit]');
        this.inputValue = '';
        this.weather = new Weather();
        this.init();
        this.weatherInfo= new WeatherInfo();
    }

    onEvents(){
        this.inputSearch.addEventListener('input', (e)=>{
            this.inputValue = e.target.value;
        })

        this.btnSearch.addEventListener('click', async (e)=>{
            e.preventDefault();

             await this.weather.getWeatherByCity(this.inputValue)
                 .then(res=>{
                     return res.json();
                 }).then(data=>{
                     if(data.cod == '404'){
                         M.toast({html: data.message.toUpperCase()})
                     }else if(data.cod == 200){
                         this.weatherInfo.render(data);
                     }
                 })
        })
    }

    init(){
        this.onEvents();
    }
}