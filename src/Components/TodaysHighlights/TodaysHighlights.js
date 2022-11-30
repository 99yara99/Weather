import './TodaysHighlights.css';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import sunrise from '../icons/sunrise.png';
import sunset from '../icons/sunset.png';
import humidity from '../icons/humidity.png';
import tempMin from '../icons/tempMin.png';
import tempMax from '../icons/tempMax.png';

const TodaysHighlights = ({ isCelsius }) => {
  // Getting API response from redux store
  const { weatherFromAPI } = useSelector((state) => state.weather);

  //Rendering Component
  return (
    <>
      <div className="uvIndex">
        <p>UV Index</p>
        <p>5</p>
      </div>

      <div className="windStatus">
        <span>Wind Status</span>
        {isCelsius === 'metric' ? (
          <p>{`${weatherFromAPI?.currentWeather.wind.speed} m/s`}</p>
        ) : (
          <p>{`${(weatherFromAPI?.currentWeather.wind.speed * 2.2369).toFixed(
            2
          )} mph`}</p>
        )}
      </div>

      <div className="sunriseSunset">
        <span>Sunrise & Sunset</span>

        <div className="sunriseText">
          <img src={sunrise} alt="Cinque Terre" />
          <p>{`${moment
            .unix(weatherFromAPI?.currentWeather.sys.sunrise)
            .format('HH:mm')}`}</p>
        </div>

        <div className="sunsetText">
          <img src={sunset} alt="Cinque Terre" />
          <p>{`${moment
            .unix(weatherFromAPI?.currentWeather.sys.sunset)
            .format('HH:mm')}`}</p>
        </div>
      </div>

      <div className="humidity">
        <span>Humidity</span>
        <div>
          <img src={humidity} alt="Cinque Terre" />
          <p>{weatherFromAPI?.currentWeather.main.humidity}%</p>
        </div>
      </div>

      <div className="visibility">
        <span>Visibility</span>
        <p>
          {`${Math.trunc(weatherFromAPI?.currentWeather.visibility / 1000)} km`}{' '}
        </p>
      </div>

      <div className="minMaxTemp">
        <span>Min & Max temperature</span>

        <div className="maxText">
          <img src={tempMax} alt="Cinque Terre" width={50} height={50} />
          {isCelsius === 'metric' ? (
            <p>{`${Math.round(
              weatherFromAPI?.currentWeather.main.temp_max
            )}°`}</p>
          ) : (
            <p>{`${
              Math.round(weatherFromAPI?.currentWeather.main.temp_max) * 1.8 +
              32
            }°`}</p>
          )}
        </div>

        <div className="minText">
          <img src={tempMin} alt="Cinque Terre" width={50} height={50} />
          {isCelsius === 'metric' ? (
            <p>{`${Math.trunc(
              weatherFromAPI?.currentWeather.main.temp_min
            )}°`}</p>
          ) : (
            <p>{`${
              Math.trunc(weatherFromAPI?.currentWeather.main.temp_min) * 1.8 +
              32
            }°`}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TodaysHighlights;
