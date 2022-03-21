import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";

function Dashboard() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [showError, setShowError] = useState("");

  const handleSearchClick = () => {
    if (location !== "") {
      setShowError("");
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={appId}}&units=metric`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            if (response.status === 404) {
              setShowError("Please enter correct location.");
              setWeather({});
            }
          }
        })
        .then((obj) => {
          setWeather(obj);
        })
        .catch((error) => console.log(error));
    } else if (location === "") {
      setShowError("Please enter location.");
      setWeather({});
    }
  };
  return (
    <div>
      <div className="app">
        <motion.div
          animate={{ y: 10 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <i className='fa fa-cloud-moon-rain'></i><h1 className="AppName">Weather App</h1>
        </motion.div>
        <div className="appContainer">
          <motion.div
            className="wrapper"
            animate={{ y: 50 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="searchFlex">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Please Enter Location"
                className="location_input"
              />
              <motion.button className="location_searcher" onClick={handleSearchClick}>
                Search  <i className="fa fa-search"></i>
              </motion.button>
            </div>
            {showError !== "" ? (
              <div className="errorMsg">{showError}</div>
            ) : (
              <></>
            )}
            {weather && weather?.sys?.country ? (
              <div className="flexBlock">
                <div className="flexBlockStart">
                  <label className="currTemp">
                    {weather?.main?.temp + " °C"}
                  </label>
                  <label className="locName">
                    {weather?.name + ", " + weather?.sys?.country}
                  </label>
                  <label className="weatherTemp">
                    {weather?.weather && weather?.weather[0].main}
                  </label>
                </div>
                <div className="flexBlockEnd">
                  <div className="infoDiv">
                    <label className="labelBold">Humidity: </label>
                    <label className="infoLabel">
                      {weather?.main?.humidity + "%"}
                    </label>
                  </div>
                  <div className="infoDiv">
                    <label className="labelBold">Pressure: </label>
                    <label className="infoLabel">
                      {weather?.main?.pressure + " mbar"}
                    </label>
                  </div>
                  <div className="infoDiv">
                    <label className="labelBold">Wind Speed: </label>
                    <label className="infoLabel">
                      {weather?.wind?.speed + " km/h"}
                    </label>
                  </div>
                  <div className="infoDiv">
                    <label className="labelBold">Current Temparature: </label>
                    <label className="infoLabel">
                      {weather?.main?.temp + " °C"}
                    </label>
                  </div>
                  {weather?.sys?.country.toUpperCase() ==='IN' ? <div className="infoDiv">
                    <label className="labelBold">Time: </label>
                    <label className="infoLabel">
                      {" " +
                        moment().format("dddd") +
                        ", " +
                        moment().format("LL") +
                        ", " +
                        moment().format("LTS")}
                    </label>
                  </div>:<></>}
                </div>
              </div>
            ) : (
              <></>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
