import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Form, Button, FormControl} from "react-bootstrap";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class App extends Component {


  constructor(props) {
    super(props)

    this.state = {
      weather: null,
      cityInput: null,
      isLoading: true
    }
  }


  getWeather = async (cityName, lat, lon) => {
    let apikey = process.env.REACT_APP_APIKEY;
    if(this.state.cityInput !== null){
      cityName=this.state.cityInput;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    // console.log("data", data)
    this.setState({ weather: data, isLoading: false })
    // console.log(lat, lon, url)
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      let crd = pos.coords;
      let lat = crd.latitude
      let lon = crd.longitude
      let cityName = ""
      this.getWeather(cityName, lat, lon)
    })
  }

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading === true) return <ClipLoader
    css={override}
    size={150}
    color={"#123abc"}
    isLoading={this.state.isLoading}
  />
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <Form inline onSubmit={(e)=>{
              e.preventDefault();
              this.getWeather();}}>
              <FormControl type="text" placeholder="Weather in your city" className="mr-sm-2" onChange={(e) => {this.setState({...this.state,cityInput: e.target.value})}} />
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            <h1 className="col-12 display-4 my-2 py-3">{this.state.weather.name}, {this.state.weather.sys.country}</h1>
            <h2 className="col-12 text-danger">{this.state.weather.main.temp}°C</h2>
            <h2 className="col-12"><img id="weather-icon" src={`https://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`} alt="" />{this.state.weather && this.state.weather.weather[0].description}</h2>
            <button className="city-button" onClick={() => {
              this.getWeather("paris", "", "");
              this.setState({cityInput: null})}}>Paris</button>
            <button className="city-button" onClick={() => {
              this.getWeather("london", "", "");
              this.setState({cityInput: null})}}>London</button>
            <button className="city-button" onClick={() => {
              this.getWeather("new york", "", "");
              this.setState({cityInput: null})}}>New York</button>
            <button className="city-button" onClick={() => {
              this.getWeather("tokyo", "", "");
              this.setState({cityInput: null})}}>Tokyo</button>
          </div>
        </div>
      </div>
    )
  }
}
