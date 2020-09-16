import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {


  constructor(props) {
    super(props)

    this.state = {
      weather: null
    }
  }
  
  
  getWeather = async (cityName, lat, lon) => {
    let apikey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    console.log("data", data)
    this.setState({ weather: data })
    console.log(lat, lon, url)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos =>{
      let crd = pos.coords;
      let lat = crd.latitude
      let lon = crd.longitude
      let cityName = ""
      this.getWeather(cityName, lat, lon)
    })
  }

  render() {
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">Weather App</h1>
            <h2 className="col-12">{this.state.weather && this.state.weather.name}, {this.state.weather && this.state.weather.sys.country}</h2>
            <h3 className="col-12 text-danger">{this.state.weather && this.state.weather.main.temp}°C</h3>
            <h3 className="col-12"><img id="weather-icon" src={`https://openweathermap.org/img/wn/${this.state.weather && this.state.weather.weather[0].icon}@2x.png`} alt=""/>{this.state.weather && this.state.weather.weather[0].description}</h3>
            <a href="#" onClick={()=>this.getWeather("paris","", "")}>Paris</a>
            <a href="#" onClick={()=>this.getWeather("london", "",  "")}>London</a>
            <a href="#" onClick={()=>this.getWeather("New York", "", "")}>New York</a>
          </div>
        </div>
      </div>
    )
  }
}
