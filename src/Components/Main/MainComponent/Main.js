import './Main.css';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import SearchBar from '../SearchBar/SearchBar';
import clearSky from '../../icons/clearSky01d.png';
import fewCloudsScatteredClouds from '../../icons/fewCloudsScatteredClouds02d.png';
import overcastCloudsBrokenClouds from '../../icons/overcastCloudsBrokenClouds04d.png';
import showerRain from '../../icons/showerRain09d.png';
import rain from '../../icons/rain10d.png';
import thunderstorm from '../../icons/thunderstorm11d.png';
import snow from '../../icons/snow13d.png';
import mist from '../../icons/mist50d.png';

const Main = ({ isCelsius }) => {
  // Getting API response from redux store
  const { weatherFromAPI } = useSelector((state) => state.weather);

  // Image Component

  const Image = () => {
    return (
      <>
        <div>
          {['01d', '01n'].includes(
            weatherFromAPI?.currentWeather.weather[0].icon
          ) ? (
            <img src={clearSky} alt="Clear Sky" />
          ) : ['02d', '02n', '03d', '03n'].includes(
              weatherFromAPI?.currentWeather.weather[0].icon
            ) ? (
            <img
              src={fewCloudsScatteredClouds}
              alt="Few Clouds or Scattered Clouds"
            />
          ) : ['04d', '04n'].includes(
              weatherFromAPI?.currentWeather.weather[0].icon
            ) ? (
            <img
              src={overcastCloudsBrokenClouds}
              alt="Overcast Clouds or Broken Clouds"
            />
          ) : ['09d', '09n'].includes(
              weatherFromAPI?.currentWeather.weather[0].icon
            ) ? (
            <img src={showerRain} alt="Shower Rain" />
          ) : ['10d', '10n'].includes(
              weatherFromAPI?.currentWeather.weather[0].icon
            ) ? (
            <img src={rain} alt="Rain" />
          ) : ['13d', '13n'].includes(
              weatherFromAPI?.currentWeather.weather[0].icon
            ) ? (
            <img src={snow} alt="Snow" />
          ) : ['50d', '50n'].includes(
              weatherFromAPI?.currentWeather.weather[0].icon
            ) ? (
            <img src={thunderstorm} alt="Thunderstorm" />
          ) : (
            <img src={mist} alt="Mist" />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <SearchBar />
      <div className="mainImg">
        <Image />
      </div>
      <div className="mainText">
        {isCelsius === 'metric' ? (
          <div className="tempText">
            <p>
              {Math.trunc(weatherFromAPI?.currentWeather.main.temp)}
              °C
            </p>
          </div>
        ) : (
          <div className="tempText">
            <p>
              {Math.trunc(weatherFromAPI?.currentWeather.main.temp * 1.8 + 32)}
              °F
            </p>
          </div>
        )}

        <div className="countryText">
          <p>
            {weatherFromAPI?.currentWeather.name},
            {weatherFromAPI?.currentWeather.sys.country}
          </p>
        </div>
        <div className="dateText">
          <p>{`${moment()
            .utcOffset(weatherFromAPI?.currentWeather.timezone / 60)
            .format('dddd, HH:mm')}`}</p>
        </div>

        <hr></hr>
        <div className="cloudContainer">
          <div className="cloudIcon">
            <Image />
          </div>
          <div className="cloudInfo">
            <p>{`Clouds - ${weatherFromAPI?.currentWeather.clouds.all}`}%</p>
            <p>{weatherFromAPI?.currentWeather.weather[0].description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
