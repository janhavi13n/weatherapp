import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";

function Dashboard() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("");
  const [showError, setShowError] = useState("");

  const ifClicked = () => {
    if (locations !== "") {
      setShowError("");
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=b0bb98585c51102d8cb63cdbeb983e64&units=metric`
      )
        .then((res) => {
          if (res.ok) {
            console.log(res);
            return res.json();
          } else {
            if (res.status === 404) {
              setShowError("Please enter correct location.");
            }
          }
        })
        .then((object) => {
          setWeather(object);
          console.log(weather);
        })
        .catch((error) => console.log(error));
    } else if (locations === "") {
      setShowError("Please enter location.");
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
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                placeholder="Enter Location"
                className="location_input"
              />
              <motion.button className="location_searcher" onClick={ifClicked}>
                Search  <i className="fa fa-search"></i>
              </motion.button>
            </div>
            {showError !== "" ? (
              <div className="errorMsg">{showError}</div>
            ) : (
              <></>
            )}
            {weather && weather?.sys?.country ? (
              <div className="d-flex1">
                <div className="flex-column1">
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
                <div className="flex-column2">
                  <div className="infoDiv">
                    <label className="labelBold">Humidity: </label>
                    <label className="temp">
                      {weather?.main?.humidity + "%"}
                    </label>
                  </div>
                  <div className="infoDiv">
                    <label className="labelBold">Pressure: </label>
                    <label className="temp">
                      {weather?.main?.pressure + " mbar"}
                    </label>
                  </div>
                  <div className="infoDiv">
                    <label className="labelBold">Wind Speed: </label>
                    <label className="temp">
                      {weather?.wind?.speed + " km/h"}
                    </label>
                  </div>
                  <div className="infoDiv">
                    <label className="labelBold">Current Temparature: </label>
                    <label className="temp">
                      {weather?.main?.temp + " °C"}
                    </label>
                  </div>
                  {weather?.sys?.country.toUpperCase() ==='IN' ? <div className="infoDiv">
                    <label className="labelBold">Time: </label>
                    <label className="temp">
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
