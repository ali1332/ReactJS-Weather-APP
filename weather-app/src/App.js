import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './App.css';

const API_KEY = "<YOUR KEY>";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cityCord: '49.282730,-123.120735',
      cityName: 'Vancouver',
      cityTemp: '',
      tempIcon: 'clear-day',
      daily:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.formatTime   = this.formatTime.bind(this);
    this.handleData   = this.handleData.bind(this);
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cityCord !== this.state.cityCord) {
      this.fetchWeatherData();
    }
  }  

  formatTime(time) {

    let date = new Date(time*1000);
    let dateOfDay = date.getDate();

    let month = new Array(7);
        month[0]  = "Jan";
        month[1]  = "Feb";
        month[2]  = "Mar";
        month[3]  = "Apr";
        month[4]  = "May";
        month[5]  = "Jun";
        month[6]  = "Jul";
        month[7]  = "Aug";
        month[8]  = "Sep";
        month[9]  = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";      
    
    let m = month[date.getMonth()];  

    let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    
    let n = weekday[date.getDay()];    


    let formattedTime = n +' '+ m +' '+ dateOfDay; 

    return formattedTime;

  }

  handleData(dailyTemperatureArray) {
      dailyTemperatureArray.map((city, index) => {      
        return city.time = this.formatTime(city.time)
      })
      this.setState({ daily: dailyTemperatureArray })
  }

  handleChange(e) {
    this.formatTime();
    this.setState({ cityCord: e.target.value});
  }
  

  fetchWeatherData() {

    axios.get(` https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${this.state.cityCord}?&units=ca&exclude=minutely,hourly,alerts`)    
    .then((response) => {

      this.handleData(response.data.daily.data)
      // this.setState({ daily: response.data.daily.data })
      // console.log(response)
    })
  }  
  render() {

    return (
      <div className="App">
        <select value={this.state.cityCord} onChange={this.handleChange}>
          <option value="49.282730,-123.120735">Vancouver</option>
          <option value="53.544388,-113.490929">Edmonton</option>
          <option value="45.501690,-73.567253">Montreal</option>
          <option value="43.653225,-79.383186">Toronto</option>
          <option value="45.421532,-75.697189">Ottawa</option>
          <option value="44.648766,-63.575237">Halifax</option>
        </select>    

        <ul>
          {this.state.daily.map((city, index) => { 
              return (
                <li key={index}> 
                  <Card 
                    tempH={Math.round(city.temperatureHigh)} 
                    tempL={Math.round(city.temperatureMin)} 
                    summary={city.summary} 
                    icon={city.icon} 
                    time={city.time}  
                  />
                </li>
              )
          })}
        </ul>        

      </div>
    );
  }
}

export default App;