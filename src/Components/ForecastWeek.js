import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import rain from './icons/rain.png';
import fewClouds from './icons/fewClouds.png';
import scatteredCloudsBrokenClouds from './icons/scatteredCloudsBrokenClouds.png';

const ForecastWeek = () => {
  const { weatherFromAPI } = useSelector((state) => state.weather);
  //   let listOfForecast = weatherFromAPI?.list.map((elem) => (
  //     <li key = {elem.dt}> {`${moment
  //         .unix(elem.dt)
  //         .format('HH:mm')}`}</li>
  //   ))

  const showRain = () => {
    if (
      weatherFromAPI?.forecastWeather.list[0].weather[0].description ===
        'light rain' ||
      'moderate rain' ||
      'heavy intensity rain' ||
      'very heavy rain' ||
      'extreme rain'
    ) {
      return <img src={rain} alt="Cinque Terre" width={50} height={50} />;
    }
  };

  const showClouds = () => {
    if (
      weatherFromAPI?.forecastWeather.list[1].weather[0].description ===
        'few clouds' ||
      'scattered clouds'
    ) {
      return <img src={fewClouds} alt="Cinque Terre" width={50} height={50} />;
    }
    if (
      weatherFromAPI?.forecastWeather.list[1].weather[0].description ===
        'overcast clouds' ||
      'broken clouds'
    ) {
      return (
        <img
          src={scatteredCloudsBrokenClouds}
          alt="Cinque Terre"
          width={25}
          height={25}
        />
      );
    }
  };
  return (
    <>
      <div>
        <p>{`${moment
          .unix(weatherFromAPI?.forecastWeather.list[0].dt)
          .format('HH:mm')}`}</p>
        <div>{showRain()}</div>
        <p>{`${Math.round(
          weatherFromAPI?.forecastWeather.list[0].main.temp_min
        )}`}</p>
        <p>{`${Math.round(
          weatherFromAPI?.forecastWeather.list[0].main.temp_max
        )}`}</p>
      </div>
      <div>
        <p>{`${moment
          .unix(weatherFromAPI?.forecastWeather.list[1].dt)
          .format('HH:mm')}`}</p>
        <div>{showClouds()}</div>
        <p>{`${Math.round(
          weatherFromAPI?.forecastWeather.list[1].main.temp_min
        )}`}</p>
        <p>{`${Math.round(
          weatherFromAPI?.forecastWeather.list[1].main.temp_max
        )}`}</p>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
};

export default ForecastWeek;
