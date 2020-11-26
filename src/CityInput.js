import React from 'react';

class CityInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if( this.state.value.trim().length ) {
      this.props.updateCity(this.state.value);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.value} 
          onChange={event => this.handleChange(event)} 
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSubmit(event)
            }
          }}
          placeholder="type in a city name" />
        <input type="submit" value="update" />
      </form>
    );
  }
}

export default CityInput;