import moment from 'moment/moment';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { loadWeather } from '../redux/slice';

const Main = () => {
  const { weatherFromAPI } = useSelector((state) => state.weather);

  console.log(JSON.parse(JSON.stringify(weatherFromAPI)));

  return (
    <div>
      <p>{`${Math.trunc(weatherFromAPI?.main.temp)} ℃`}</p>
      <p>
        {weatherFromAPI?.name}, {weatherFromAPI?.sys.country}
      </p>
      <p>{`${moment()
        .utcOffset(weatherFromAPI?.timezone / 60)
        .format('dddd, HH:mm')}`}</p>
      <p>{`Clouds - ${weatherFromAPI?.clouds.all}`}%</p>
      <p>{weatherFromAPI?.weather[0].description}</p>
    </div>
  );
};

export default Main;
