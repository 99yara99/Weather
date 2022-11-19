import moment from 'moment/moment';
import { useSelector } from 'react-redux';

const TodaysHighlights = () => {
  const { weatherFromAPI } = useSelector((state) => state.weather);

  return (
    <>
      <div>
        <p>Wind Status</p>
        <p>{`${Math.trunc(weatherFromAPI?.wind.speed)} km/h`}</p>
      </div>

      <div>
        <p>Sunrise & Sunset</p>
        <p>{`${moment.unix(weatherFromAPI?.sys.sunrise).format('HH:mm')}`}</p>
        <p>{`${moment.unix(weatherFromAPI?.sys.sunset).format('HH:mm')}`}</p>
      </div>

      <div>
        <p>Humidity</p>
        <p>{weatherFromAPI?.main.humidity}%</p>
      </div>

      <div>
        <p>Visibility</p>
        <p>{`${weatherFromAPI?.visibility / 1000} km/h`} </p>
      </div>

      <div>
        <p>Min & Max temperature</p>
        <p>{`${Math.round(weatherFromAPI?.main.temp_max)}`}</p>
        <p>{`${Math.round(weatherFromAPI?.main.temp_min)}`}</p>
      </div>
    </>
  );
};

export default TodaysHighlights;
