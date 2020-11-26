import OpenWeatherService from './OpenWeatherService.js';

export default class OpenWeatherAdaptor {
  translateOutput(response) {
    if( response.message ) {
      return {
        error: "We are temporarily unable to get weather data, please check back soon!"
      }
    } else {
      return {
        locale: response.name,
        currentTemp: response.main.temp,
        high: response.main.temp_max,
        low: response.main.temp_min,
        condition: response.weather[0].description
      }
    }
  }
  async getWeather(byWhat, args) {
    const ws = new OpenWeatherService();
    let response;
    if( byWhat === 'city' ) {
      response = await ws.getWeatherForCity(...args);
    } else {
      response = await ws.getWeatherForGeo(...args);
    }
    return this.translateOutput(response);
  }
}