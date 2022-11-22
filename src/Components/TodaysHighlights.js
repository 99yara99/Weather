import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import sunrise from './icons/sunrise.png';
import sunset from './icons/sunset.png';
import humidity from './icons/humidity.png';
import tempMin from './icons/tempMin.png';
import tempMax from './icons/tempMax.png';

const TodaysHighlights = () => {
  const { weatherFromAPI } = useSelector((state) => state.weather);

  return (
    <>
      <div>
        <p>Wind Status</p>
        <p>{`${Math.trunc(weatherFromAPI?.currentWeather.wind.speed)} km/h`}</p>
      </div>

      <div>
        <p>Sunrise & Sunset</p>
        <div>
          <img src={sunrise} alt="Cinque Terre" width={50} height={50} />
        </div>
        <p>{`${moment
          .unix(weatherFromAPI?.currentWeather.sys.sunrise)
          .format('HH:mm')}`}</p>
        <div>
          <img src={sunset} alt="Cinque Terre" width={50} height={50} />
        </div>
        <p>{`${moment
          .unix(weatherFromAPI?.currentWeather.sys.sunset)
          .format('HH:mm')}`}</p>
      </div>

      <div>
        <p>Humidity</p>
        <div>
          <img src={humidity} alt="Cinque Terre" width={50} height={50} />
        </div>
        <p>{weatherFromAPI?.currentWeather.main.humidity}%</p>
      </div>

      <div>
        <p>Visibility</p>
        <p>{`${weatherFromAPI?.currentWeather.visibility / 1000} km`} </p>
      </div>

      <div>
        <p>Min & Max temperature</p>
        <div>
          <img src={tempMax} alt="Cinque Terre" width={50} height={50} />
        </div>
        <p>{`${Math.round(weatherFromAPI?.currentWeather.main.temp_max)}`}</p>
        <div>
          <img src={tempMin} alt="Cinque Terre" width={50} height={50} />
        </div>
        <p>{`${Math.round(weatherFromAPI?.currentWeather.main.temp_min)}`}</p>
      </div>
    </>
  );
};

export default TodaysHighlights;
