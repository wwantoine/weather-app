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
  
  getWeather = async (lat, lon) => {
    let apikey = process.env.REACT_APP_APIKEY;
    let cityName = ""
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
      this.getWeather(lat, lon)
    })
  }

  render() {
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">Weather App</h1>
            <h2 className="col-12">Location Name</h2>
            <h3 className="col-12 text-danger">{this.state.weather && this.state.weather.main.temp}°C</h3>
            <h3 className="col-12">Weather Description</h3>
          </div>
        </div>
      </div>
    )
  }
}
