import './App.css';
import React from 'react';
import Weather from './Weather.js';
import WeatherAdaptor from './OpenWeatherAdaptor.js';
import CityInput from './CityInput.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewState: 'empty',
      cityInput: '',
      requestHistory: [],
      weatherHistory: [{
        "locale": "Mountain View",
        "currentTemp": 46.36,
        "high": 48.99,
        "low": 44.01,
        "condition": "broken clouds"
      }]
    };
  }
  async componentDidMount() {
    await this.getLocalLocation();
  }
  getLocalLocation() {
    return navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        requestHistory: this.state.requestHistory.concat([{
          byWhat: 'geo',
          params: [pos.coords.longitude, pos.coords.latitude]
        }])
      });
      this.getWeather();
    });
  }
  async getWeather() {
    if( this.state.requestHistory.length ) {
      this.setState({
        viewState: 'loading'
      });
      const req = this.state.requestHistory[this.state.requestHistory.length - 1];
      const wa = new WeatherAdaptor();
      const response = await wa.getWeather(req.byWhat, req.params);
      this.setState({
        weatherHistory: this.state.weatherHistory.concat([response])
      });
      if(typeof response.error === 'undefined' ) {
        this.setState({
          viewState: 'ready'
        });
      } else {
        this.setState({
          viewState: 'error'
        });
      }
    }
  }
  renderWeatherDisplay() {
    if( this.state.viewState === 'ready' ) {
      const currentWeather = this.state.weatherHistory[this.state.weatherHistory.length - 1];
      return <Weather weatherData={currentWeather} />;
    } else if ( this.state.viewState === 'error' ) {
      const errorState = this.state.weatherHistory[this.state.weatherHistory.length - 1];
      return (
        <div>
          <p className="error">{errorState.error}</p>
          <button onClick={event => this.goBack()}>go back</button>
        </div>
      )
    }
  }
  goBack() {
    if( this.state.weatherHistory.length > 1 ) {
      let newState = [...this.state.weatherHistory];
      newState.pop();
      this.setState({
        weatherHistory: newState,
        viewState: typeof newState[newState.length - 1].currentTemp !== 'undefined' ? 'ready' : 'empty'
      });
    }
  }
  renderLoadingSpinner() {
    if( this.state.viewState === 'loading' ) {
      return <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stopColor="#fff" stopOpacity="0" offset="0%"/>
            <stop stopColor="#fff" stopOpacity=".631" offset="63.146%"/>
            <stop stopColor="#fff" offset="100%"/>
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="#000" strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite" />
            </path>
            <circle fill="#fff" cx="36" cy="18" r="1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    }
  }
  updateCity(city) {
    this.setState({
      requestHistory: this.state.requestHistory.concat([{
        byWhat: 'city',
        params: [city]
      }])
    });
    setTimeout(() => {
      this.getWeather();
    });
  }
  renderCityInput() {
    if( this.state.viewState === 'empty' || this.state.viewState === 'ready' ) {
      return <CityInput updateCity={(city) => this.updateCity(city)} />
    }
  }
  render() {
    return (
      <div className="App">
        {this.renderLoadingSpinner()}
        {this.renderWeatherDisplay()}
        {this.renderCityInput()}
      </div>
    );
  }
}

export default App;
