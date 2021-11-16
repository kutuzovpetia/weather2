export default class Weather{
    constructor() {
        this._URL = `http://api.openweathermap.org/data/2.5/weather?`;
        this._URL2 = `https://api.openweathermap.org/data/2.5/onecall?`;
    }

    async getWeatherByCity(city){
        return await fetch(`${this._URL}q=${city}&units=metric&appid=4d5a10ac34b06e83873f1244dda3a83d`);
    }

    async getWeatherByCord(lat,log){
        return await fetch(`${this._URL2}lat=${lat}&lon=${log}&exclude=minutely&units=metric&appid=4d5a10ac34b06e83873f1244dda3a83d`);
    }
}