import React, { useState } from "react";

const api = {
  key: process.env.React_App_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? (weather.weather[0].description === "overcast clouds")
          ? 'app overcast-clouds' : 'app'
            ? (weather.weather[0].main === "Haze")
              ? 'app haze' : 'app'
                ? (weather.weather[0].description === "broken clouds")
                  ? 'app broken-clouds' : 'app'
                    ? (weather.weather[0].main === "Clear")
                      ? 'app clear-sky' : 'app'
                        ? (weather.weather[0].main === "Mist")
                          ? 'app mist' : 'app'
                            ? (weather.weather[0].main === "Thunderstorm")
                              ? 'app thunderstorm' : 'app'
                                ? (weather.weather[0].description === "shower rain")
                                  ? 'app shower-rain' : 'app'
                                    ? (weather.weather[0].description === "scattered clouds")
                                      ? 'app scattered-clouds' : 'app'
                                        ? (weather.weather[0].description === "few clouds")
                                          ? 'app few-clouds' : 'app'
                                            ? (weather.weather[0].main === "Rain")
                                              ? 'app rainy' : 'app'
                                                ? (weather.main.temp > 35)
                                                  ? 'app warm' : 'app'
                                                    ? (weather.weather[0].main === "Snow")
                                                      ? 'app' : 'app'
                                                    : 'app'
                                                : 'app'
                                            : 'app'
                                        : 'app'
                                    : 'app'
                                : 'app'
                            : 'app'
                        : 'app'
                    : 'app'
                : 'app'
            : 'app'
        : 'app'
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}° C
              </div>
              <div className="weather">Weather: {weather.weather[0].main}</div>
              <div className="weather">Weather Description: {weather.weather[0].description}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div >
  );
}

export default App;