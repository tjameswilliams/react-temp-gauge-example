import React from 'react';

class Weather extends React.Component {
  convertTempToHeight() {
    return this.props.weatherData.currentTemp * .1
  }
  percentageToColor() {
    const hue = 200 + (160 * ( this.props.weatherData.currentTemp / 100 ));
    return `hsl(${hue}, 100%, 50%)`;
  }
  render() {
    return (
      <div className="wrap">
        <div className="thermometer">
          <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 256 512">
            <g>
              <g>
                <g fill="none" stroke="#000" strokeWidth="4">
                  <path d="M80 64h48"></path>
                  <path d="M80 384h48"></path>
                  <path d="M80 224h48"></path>
                  <path d="M80 192h16"></path>
                  <path d="M80 160h16"></path>
                  <path d="M80 128h16"></path>
                  <path d="M80 96h16"></path>
                  <path d="M80 256h16"></path>
                  <path d="M80 288h16"></path>
                  <path d="M80 320h16"></path>
                  <path d="M80 352h16"></path>
                </g>
                <g>
                  <rect
                    width="32"
                    height="416"
                    x="48"
                    y="32"
                    fill="#eeeeec"
                    rx="16"
                    ry="16"
                  ></rect>
                  <rect
                    width="32"
                    height="64"
                    x="48"
                    y="384"
                    fill={this.percentageToColor()}
                    rx="0"
                    ry="0"
                  ></rect>
                  <path
                    fill={this.percentageToColor()}
                    d="M96 448a32 32 0 11-64 0 32 32 0 1164 0z"
                  ></path>
                  <rect
                    width="32"
                    height={this.convertTempToHeight()}
                    x="-80"
                    y="-12"
                    fill={this.percentageToColor()}
                    rx="0"
                    ry="0"
                    transform="scale(-1 -32)"
                  ></rect>
                  <path
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M64 32c-8.864 0-16 7.136-16 16v372.28c-9.564 5.54-16 15.88-16 27.72 0 17.66 14.336 32 32 32s32-14.34 32-32c0-11.84-6.436-22.18-16-27.72V48c0-8.864-7.136-16-16-16z"
                  ></path>
                </g>
                <text
                  x="136.218"
                  y="383.384"
                  fill="#000"
                  fontFamily="Bitstream Vera Sans"
                  fontSize="20"
                  transform="scale(.9984 1.0016)"
                  xmlSpace="preserve"
                >
                  <tspan x="136.218" y="383.384">
                    0°F
                  </tspan>
                </text>
                <text
                  x="136"
                  y="224"
                  fill="#000"
                  fontFamily="Bitstream Vera Sans"
                  fontSize="20"
                  xmlSpace="preserve"
                >
                  <tspan x="136" y="224">
                    50°F
                  </tspan>
                </text>
                <text
                  x="135.326"
                  y="63.83"
                  fill="#000"
                  fontFamily="Bitstream Vera Sans"
                  fontSize="20"
                  xmlSpace="preserve"
                >
                  <tspan x="135.326" y="63.83">
                    100°F
                  </tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>
        <div className="readout">
          <h2>{this.props.weatherData.locale}</h2>
          <h1>{Math.round(this.props.weatherData.currentTemp)}<small><sup>°F</sup></small></h1>
          <h3>{this.props.weatherData.condition}</h3>
          <p>
            <span>high: {Math.round(this.props.weatherData.high)}<small><sup>°F</sup></small></span><br />
            <span>low: {Math.round(this.props.weatherData.low)}<small><sup>°F</sup></small></span>
          </p>
        </div>
      </div>
    )
  }
}

export default Weather;