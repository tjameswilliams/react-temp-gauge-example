export default class OpenWeatherService {
  constructor() {
    this.appid = '...';
    this.apiDomain = 'https://api.openweathermap.org/data/2.5/';
  }
  async getWeatherForGeo(lon, lat) {
    let endpointUrl = new URL(this.apiDomain);
    endpointUrl.pathname += 'weather';
    endpointUrl.search = new URLSearchParams({
      appid: this.appid,
      lat: lat,
      lon: lon,
      units: "imperial"
    });
    let response = await fetch(endpointUrl.toString());
    let json = await response.json();
    return json;
  }
  async getWeatherForCity(city) {
    let endpointUrl = new URL(this.apiDomain);
    endpointUrl.pathname += 'weather';
    endpointUrl.search = new URLSearchParams({
      appid: this.appid,
      q: city,
      units: "imperial"
    });
    let response = await fetch(endpointUrl.toString());
    let json = await response.json();
    return json;
  }
}