import './Main.css';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import brokenClouds from '../icons/scatteredCloudsBrokenClouds.png';
import fewClouds from '../icons/fewClouds.png';

const Main = () => {
  const { weatherFromAPI } = useSelector((state) => state.weather);

  console.log(JSON.parse(JSON.stringify(weatherFromAPI)));

  return (
    <>
      <div className="searchBar">
        <input type="text" placeholder="search for places..." />
      </div>
      <div className="mainImg">
        <img src={brokenClouds} alt="Broken Clouds" />
      </div>
      <div>
        <p>{`${Math.trunc(weatherFromAPI?.currentWeather.main.temp)} ℃`}</p>
        <p>
          {weatherFromAPI?.currentWeather.name},
          {weatherFromAPI?.currentWeather.sys.country}
        </p>
        <p>{`${moment()
          .utcOffset(weatherFromAPI?.currentWeather.timezone / 60)
          .format('dddd, HH:mm')}`}</p>
        <div>
          <img src={fewClouds} alt="Cinque Terre" width={25} height={25} />
        </div>
        <p>{`Clouds - ${weatherFromAPI?.currentWeather.clouds.all}`}%</p>
        <p>{weatherFromAPI?.currentWeather.weather[0].description}</p>
      </div>
    </>
  );
};

export default Main;
