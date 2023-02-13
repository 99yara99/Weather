import './TodaysHighlights.css';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import sunriseIcon from '../icons/sunrise.png';
import sunsetIcon from '../icons/sunset.png';
import humidityIcon from '../icons/humidity.png';
import tempMin from '../icons/tempMin.png';
import tempMax from '../icons/tempMax.png';

const TodaysHighlights = ({ isCelsius }) => {
  // Getting API response from redux store
  const { weatherFromAPI } = useSelector((state) => state.weather);

  let speedEU = `${weatherFromAPI?.currentWeather.wind.speed} m/s`;
  let speedUS = `${(weatherFromAPI?.currentWeather.wind.speed * 2.2369).toFixed(
    2
  )} mph`;
  let sunrise = `${moment
    .unix(weatherFromAPI?.currentWeather.sys.sunrise)
    .format('HH:mm')}`;
  let sunset = `${moment
    .unix(weatherFromAPI?.currentWeather.sys.sunset)
    .format('HH:mm')}`;
  let humidity = weatherFromAPI?.currentWeather.main.humidity;
  let visibility = `${Math.trunc(
    weatherFromAPI?.currentWeather.visibility / 1000
  )} km`;
  let tempMaxCel = `${Math.round(
    weatherFromAPI?.currentWeather.main.temp_max
  )}°`;
  let tempMaxFahr = `${
    Math.round(weatherFromAPI?.currentWeather.main.temp_max) * 1.8 + 32
  }°`;
  let tempMinCel = `${Math.trunc(
    weatherFromAPI?.currentWeather.main.temp_min
  )}°`;
  let tempMinFahr = `${
    Math.trunc(weatherFromAPI?.currentWeather.main.temp_min) * 1.8 + 32
  }°`;

  //Rendering Component
  return (
    <>
      <div className="uvIndex">
        <p>UV Index</p>
        <p>5</p>
      </div>

      <div className="windStatus">
        <span>Wind Status</span>
        {isCelsius === 'metric' ? <p>{speedEU}</p> : <p>{speedUS}</p>}
      </div>

      <div className="sunriseSunset">
        <span>Sunrise & Sunset</span>

        <div className="sunriseText">
          <img src={sunriseIcon} alt="Cinque Terre" />
          <p>{sunrise}</p>
        </div>

        <div className="sunsetText">
          <img src={sunsetIcon} alt="Cinque Terre" />
          <p>{sunset}</p>
        </div>
      </div>

      <div className="humidity">
        <span>Humidity</span>
        <div>
          <img src={humidityIcon} alt="Cinque Terre" />
          <p>{humidity}%</p>
        </div>
      </div>

      <div className="visibility">
        <span>Visibility</span>
        <p>{visibility}</p>
      </div>

      <div className="minMaxTemp">
        <span>Min & Max temperature</span>

        <div className="maxText">
          <img src={tempMax} alt="Cinque Terre" width={50} height={50} />
          {isCelsius === 'metric' ? <p>{tempMaxCel}</p> : <p>{tempMaxFahr}</p>}
        </div>

        <div className="minText">
          <img src={tempMin} alt="Cinque Terre" width={50} height={50} />
          {isCelsius === 'metric' ? <p>{tempMinCel}</p> : <p>{tempMinFahr}</p>}
        </div>
      </div>
    </>
  );
};

export default TodaysHighlights;
